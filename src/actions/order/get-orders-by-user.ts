"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrdersByUser = async () => {
	const session = await auth();

	if (!session?.user) {
		console.log("debe estare autenticado");
		return {
			ok: false,
			message: "Debe de estar autenticado",
		};
	}

	const orders = await prisma.order.findMany({
		where: { userId: session!.user.id },
		include: {
			orderAddress: {
				select: {
					firstName: true,
					lastName: true,
				},
			},
		},
	});

	return {
		ok: true,
		orders,
	};
};
