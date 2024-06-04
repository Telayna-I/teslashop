import type { Size } from "@/interfaces";
import clsx from "clsx";

interface Props {
	selectedSize: Size;
	avaiableSizes: Size[];
}

export const SizeSelector = ({ selectedSize, avaiableSizes }: Props) => {
	return (
		<div className='my-5'>
			<h3 className='font-bold my-4'>Tallas disponibles</h3>

			<div className='flex '>
				{avaiableSizes.map((size) => (
					<button
						key={size}
						className={clsx("mx-2 hover:underline text-sm font-semibold", {
							underline: size === selectedSize,
						})}>
						{size}
					</button>
				))}
			</div>
		</div>
	);
};
