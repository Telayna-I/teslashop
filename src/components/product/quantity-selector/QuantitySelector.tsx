"use client";
import { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
	quantity: number;
}

export const QuantitySelector = ({ quantity = 1 }: Props) => {
	const [count, setCount] = useState(quantity);

	const onQuantityChanged = (value: number) => {
		if (count + value < 1) return;

		setCount(count + value);
	};

	return (
		<div className='flex'>
			<button className='' onClick={() => onQuantityChanged(-1)}>
				<IoRemoveCircleOutline size={25} />
			</button>
			<span className='w-20 mx-3 px-5 bg-gray-200 text-center rounded '>{count}</span>
			<button className='' onClick={() => onQuantityChanged(+1)}>
				<IoAddCircleOutline size={25} />
			</button>
		</div>
	);
};
