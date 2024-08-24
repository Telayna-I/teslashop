"use server";

import { auth } from "@/auth.config";
import { Address, Size } from "@/interfaces";
import prisma from "@/lib/prisma";

interface ProductToOrder {
	productId: string;
	quantity: number;
	size: Size;
}

export const placeOrder = async (productIds: ProductToOrder[], address: Address) => {
	const session = await auth();
	const userId = session?.user.id;

	//Verificar sesion de usuario

	if (!userId) {
		return {
			ok: false,
			message: "No hay sesion de usuario",
		};
	}

	//Obtener informacion de productos
	// Puedo llevar 2 o mas productos con el mismo id

	const products = await prisma.product.findMany({
		where: {
			id: {
				in: productIds.map((p) => p.productId),
			},
		},
	});

	// Calcular los montos

	const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0);
	console.log(itemsInOrder);

	// Totales
	const { subTotal, tax, total } = productIds.reduce(
		(totals, item) => {
			const productQuantity = item.quantity;
			const product = products.find((p) => p.id === item.productId);

			if (!product) throw new Error(`${item.productId} no existe - 500`);

			const subTotal = product.price * productQuantity;

			totals.subTotal += subTotal;
			totals.tax += subTotal * 0.15;
			totals.total += subTotal * 1.15;

			return totals;
		},
		{ subTotal: 0, tax: 0, total: 0 }
	);

	// Crear la transaccion de base de datos
	try {
		const prismaTx = await prisma.$transaction(async (tx) => {
			// 1. Actualizar el stock de produtos

			const updatedProductsPromises = products.map((product) => {
				const productQuantity = productIds
					.filter((p) => p.productId === product.id)
					.reduce((acc, item) => item.quantity + acc, 0);

				if (productQuantity === 0) {
					throw new Error(`El ${product.id} no tiene cantidad definida`);
				}

				return tx.product.update({
					where: {
						id: product.id,
					},
					data: {
						inStock: {
							decrement: productQuantity,
						},
					},
				});
			});

			const updatedProducts = await Promise.all(updatedProductsPromises);

			//Verificar valores negativos en stock
			updatedProducts.forEach((product) => {
				if (product.inStock < 0) {
					throw new Error(`${product.title} no tiene inventario suficiente`);
				}
			});

			// 2. Crear la orden - Encabezado - Detalle
			const order = await tx.order.create({
				data: {
					userId,
					itemsInOrder,
					subTotal,
					tax,
					total,
					orderItem: {
						createMany: {
							data: productIds.map((p) => ({
								quantity: p.quantity,
								size: p.size,
								productId: p.productId,
								price:
									products.find((product) => product.id === p.productId)?.price ??
									0,
							})),
						},
					},
				},
			});

			// 3. Crear la direccion de la Orden
			const { country, ...restAddress } = address;
			const orderAddress = await tx.orderAddress.create({
				data: {
					...restAddress,
					countryId: country,
					orderId: order.id,
				},
			});

			return {
				order,
				orderAddress,
				updatedProducts,
			};
		});
		return {
			ok: true,
			order: prismaTx.order,
			prismaTx: prismaTx,
		};
	} catch (error: any) {
		return {
			ok: false,
			message: error.message,
		};
	}
};
