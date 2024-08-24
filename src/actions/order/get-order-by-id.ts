"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrderById = async (id: string) => {
	const session = await auth();

	if (!session?.user) {
		return {
			ok: false,
			message: "Debe de estar autenticado",
		};
	}

	try {
		const order = await prisma.order.findUnique({
			where: { id },
			include: {
				orderAddress: true,
				orderItem: {
					select: {
						price: true,
						quantity: true,
						size: true,

						product: {
							select: {
								title: true,
								slug: true,

								ProductImage: {
									select: {
										url: true,
									},
									take: 1,
								},
							},
						},
					},
				},
			},
		});
		if (!order) {
			throw `${id} no existe`;
		}

		if (session.user.role === "user") {
			if (session.user.id !== order.userId) {
				throw "La orden no corresponde a este usuario";
			}
		}
		return {
			ok: true,
			order,
		};
	} catch (error: any) {
		console.log(error);
		return {
			ok: false,
			message: "La orden no existe",
		};
	}
};
