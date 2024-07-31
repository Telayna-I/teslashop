"use server";

import prisma from "@/lib/prisma";
import { Address } from "../../interfaces/address.interface";

export const setUserAddress = async (address: Address, userId: string) => {
	try {
		const newAddress = await createOrReplaceAddress(address, userId);
		return { ok: true, address: newAddress };
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			message: "No se pudo grabar la direccion",
		};
	}
};

const createOrReplaceAddress = async (address: Address, userId: string) => {
	try {
		const storedAddres = await prisma.userAddress.findUnique({ where: { userId } });

		const addressToSave = {
			userId,
			address: address.address,
			address2: address.address2,
			countryId: address.country,
			city: address.city,
			firstName: address.firstName,
			lastName: address.lastName,
			phone: address.phone,
			postalCode: address.postalCode,
		};

		if (!storedAddres) {
			const newAddress = await prisma.userAddress.create({
				data: addressToSave,
			});

			return newAddress;
		}

		const updatedAddress = await prisma.userAddress.update({
			where: {
				userId,
			},
			data: addressToSave,
		});

		return updatedAddress;
	} catch (error) {
		console.log(error);
		throw new Error("No se pudo grabar la direccion");
	}
};