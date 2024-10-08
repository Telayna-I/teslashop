"use client";

import { ProductImage } from "@/components";
import { useCartStore } from "@/store";
import { currencyFormater } from "@/utils";

import React, { useEffect, useState } from "react";

export const ProductsInCart = () => {
	const [loaded, setLoaded] = useState(false);
	const productsInCart = useCartStore((state) => state.cart);

	useEffect(() => {
		setLoaded(true);
	}, []);

	if (!loaded) {
		return <p>Loading...</p>;
	}
	return (
		<>
			{productsInCart.map((product) => (
				<div key={`${product.slug} - ${product.size}`} className='flex mb-5'>
					<ProductImage
						src={product.image}
						width={100}
						height={100}
						style={{ width: "100px", height: "100px" }}
						alt={product.title}
						className='mr-5 rounded'
					/>
					<div>
						<span className=''>
							{product.size} - {product.title} x ({product.quantity})
						</span>

						<p className='font-extrabold'>
							{currencyFormater(product.price * product.quantity)}
						</p>
					</div>
				</div>
			))}
		</>
	);
};
