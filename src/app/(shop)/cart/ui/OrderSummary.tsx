"use client";
import { useCartStore } from "@/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { currencyFormater } from "../../../../utils/currencyFormat";

export const OrderSummary = () => {
	const { subTotal, tax, total } = useCartStore((state) => state.getSummaryInformation());
	const items = useCartStore((state) => state.getSummaryInformation());
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		setLoaded(true);
	}, []);

	if (!loaded) {
		return <p>Loading...</p>;
		// o espere o un skeleton
	}
	return (
		<div className='bg-white rounded-xl shadow-xl p-7 h-fit'>
			<h2 className='text-2xl mb-2'>Resumen de orden</h2>
			<div className='grid grid-cols-2'>
				<span>No. Productos</span>
				<span className='text-right'>{items.itemsInCart} articulos</span>

				<span>Subtotal</span>
				<span className='text-right'>{currencyFormater(subTotal)}</span>

				<span>Impuestos (15%)</span>
				<span className='text-right'>{currencyFormater(tax)}</span>

				<span className='text-2xl mt-5'>Total</span>
				<span className='text-right mt-5 text-2xl'>{currencyFormater(total)}</span>
			</div>

			<div className='mt-5 mb-2 w-full'>
				<Link href={"/checkout/address"} className='flex btn-primary justify-center'>
					Checkout
				</Link>
			</div>
		</div>
	);
};
