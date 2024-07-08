"use client";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
interface Props {
	quantity: number;
	onQuantityChanged: (value: number) => void;
}

export const QuantitySelector = ({ quantity = 1, onQuantityChanged }: Props) => {
	const onValueChanged = (value: number) => {
		if (quantity + value < 1) return;

		onQuantityChanged(quantity + value);
	};

	return (
		<div className='flex'>
			<button className='' onClick={() => onValueChanged(-1)}>
				<IoRemoveCircleOutline size={25} />
			</button>
			<span className='w-20 mx-3 px-5 bg-gray-200 text-center rounded '>{quantity}</span>
			<button className='' onClick={() => onValueChanged(+1)}>
				<IoAddCircleOutline size={25} />
			</button>
		</div>
	);
};
