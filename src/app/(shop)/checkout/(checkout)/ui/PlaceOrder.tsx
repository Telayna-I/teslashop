"use client";

import { useAddressStore } from "@/store";
import { useEffect, useState } from "react";
import { useCartStore } from "../../../../../store/cart/cart-store";
import { currencyFormater } from "@/utils";
import clsx from "clsx";
import { placeOrder } from "@/actions";
import { useRouter } from "next/navigation";

export const PlaceOrder = () => {
	const router = useRouter();
	const [loaded, setLoaded] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [isPlacingOrder, setIsPlacingOrder] = useState(false);

	const address = useAddressStore((state) => state.address);
	const { itemsInCart, subTotal, tax, total } = useCartStore((state) =>
		state.getSummaryInformation()
	);
	const cart = useCartStore((state) => state.cart);
	const clearCart = useCartStore((state) => state.clearCart);

	useEffect(() => {
		setLoaded(true);
	}, []);

	const onPlaceOrder = async () => {
		setIsPlacingOrder(true);

		const productsToOrder = cart.map((product) => ({
			productId: product.id,
			quantity: product.quantity,
			size: product.size,
		}));

		const resp = await placeOrder(productsToOrder, address);
		if (!resp.ok) {
			setIsPlacingOrder(false);
			setErrorMessage(resp.message);
			return;
		}

		clearCart();
		router.replace("/orders/" + resp.order!.id);
	};

	if (!loaded) {
		return <p>Loading...</p>;
	}

	return (
		<div className='bg-white rounded-xl shadow-xl p-7 '>
			<h2 className='text-2xl mb-2 font-bold'>Direccion de entrega</h2>
			<div className='mb-10'>
				<p className='text-xl'>
					{address.firstName} {address.lastName}
				</p>
				<p>{address.address}</p>
				<p>{address.address2}</p>
				<p>{address.postalCode}</p>
				<p>
					{address.city}, {address.country}
				</p>

				<p>{address.phone}</p>
			</div>

			<div className='w-full h-0.5 rounded bg-gray-200 mb-10' />

			<h2 className='text-2xl mb-2'>Resumen de orden</h2>
			<div className='grid grid-cols-2'>
				<span>No. Productos</span>
				<span className='text-right'>{itemsInCart} articulos</span>

				<span>Subtotal</span>
				<span className='text-right'>{currencyFormater(subTotal)}</span>

				<span>Impuestos (15%)</span>
				<span className='text-right'>{currencyFormater(tax)}</span>

				<span className='text-2xl mt-5'>Total</span>
				<span className='text-right mt-5 text-2xl'>{currencyFormater(total)}</span>
			</div>

			<p className='text-red-500'>{errorMessage}</p>

			<div className='mt-5 mb-2 w-full'>
				<button
					onClick={onPlaceOrder}
					// href={"/orders/123"}
					className={clsx({
						"btn-primary": !isPlacingOrder,
						"btn-disabled": isPlacingOrder,
					})}>
					Colocar Orden
				</button>
			</div>
		</div>
	);
};
