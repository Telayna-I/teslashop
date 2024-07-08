import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
	cart: CartProduct[];

	getTotalItems: () => number;

	removeProduct: (product: CartProduct) => void;

	addProductToCart: (product: CartProduct) => void;

	updateProductQuantity: (product: CartProduct, quantity: number) => void;

	getSummaryInformation: () => {
		subTotal: number;
		tax: number;
		total: number;
	};
}

export const useCartStore = create<State>()(
	persist(
		(set, get) => ({
			cart: [],

			getTotalItems: () => {
				const { cart } = get();
				return cart.reduce((total, item) => total + item.quantity, 0);
			},

			getSummaryInformation: () => {
				const { cart } = get();

				const subTotal = cart.reduce(
					(subTotal, item) => subTotal + item.quantity * item.price,
					0
				);

				const tax = subTotal * 0.15;

				const total = subTotal + tax;

				return {
					subTotal,
					tax,
					total,
				};
			},

			addProductToCart: (product: CartProduct) => {
				const { cart } = get();

				// 1. Revisar si el producto existe en el carrito con la talla seleccionada
				const productInCart = cart.some(
					(item) => item.id === product.id && item.size === product.size
				);

				if (!productInCart) {
					set({ cart: [...cart, product] });
					return;
				}

				// 2. Se que el producto existe por talla... tengo que incrementar
				const updatedCartProducts = cart.map((item) => {
					if (item.id === product.id && item.size === product.size) {
						return { ...item, quantity: item.quantity + product.quantity };
					}

					return item;
				});

				set({ cart: updatedCartProducts });
			},

			updateProductQuantity: (product: CartProduct, quantity: number) => {
				const { cart } = get();

				const updatedCartProducts = cart.map((item) => {
					if (item.id === product.id && item.size === product.size) {
						return { ...item, quantity: quantity };
					}

					return item;
				});

				set({ cart: updatedCartProducts });
			},

			removeProduct: (product: CartProduct) => {
				const { cart } = get();

				const updatedCart = cart.filter(
					(item) => item.id !== product.id || item.size !== product.size
				);

				set({ cart: updatedCart });
			},
		}),
		{ name: "shopping-cart" }
	)
);
