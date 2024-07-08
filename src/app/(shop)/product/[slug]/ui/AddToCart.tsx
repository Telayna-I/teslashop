"use client";

import { useState } from "react";
import { QuantitySelector, SizeSelector } from "@/components";
import { useCartStore } from "@/store";
import { CartProduct, Product, Size } from "@/interfaces";

interface Props {
	product: Product;
}

export const AddToCart = ({ product }: Props) => {
	const addProductToCart = useCartStore((state) => state.addProductToCart);

	const [size, setSize] = useState<Size | undefined>();
	const [quantity, setQuantity] = useState<number>(1);
	const [posted, setPosted] = useState<boolean>(false);

	const add = async () => {
		setPosted(true);
		if (!size) return;

		const cartProduct: CartProduct = {
			id: product.id,
			slug: product.slug,
			title: product.title,
			price: product.price,
			quantity,
			size,
			image: product.images[0],
		};

		console.log(cartProduct);

		addProductToCart(cartProduct);
		setPosted(false);
		setQuantity(1);
		setSize(undefined);
	};

	return (
		<>
			{posted && !size && (
				<span className='mt-2 text-red-500'>Debe seleccionar una talla*</span>
			)}
			<div className='flex flex-col'>
				<SizeSelector
					avaiableSizes={product.sizes}
					selectedSize={size}
					onSizeChanged={setSize}
				/>
			</div>
			{/* Selector de cantidad */}
			<QuantitySelector quantity={quantity} onQuantityChanged={setQuantity} />
			{/* Boton */}
			<button onClick={add} className='btn-primary my-5'>
				Agregar al carrito
			</button>
		</>
	);
};
