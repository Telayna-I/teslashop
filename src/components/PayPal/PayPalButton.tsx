"use client";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {
	CreateOrderActions,
	CreateOrderData,
	OnApproveActions,
	OnApproveData,
} from "@paypal/paypal-js";
import { paypalCheckPayment, setTransactionId } from "@/actions";

interface Props {
	orderId: string;
	amount: number;
}

export const PayPalButton = ({ orderId, amount }: Props) => {
	const [{ isPending }] = usePayPalScriptReducer();

	const roundedAmount = Math.round(amount * 100) / 100;

	if (isPending) {
		return (
			<div className='animate-pulse'>
				<div className='h-11 m-2 bg-gray-400 rounded' />
				<div className='h-11 m-2 bg-gray-400 rounded' />
			</div>
		);
	}

	const createOrder = async (
		data: CreateOrderData,
		actions: CreateOrderActions
	): Promise<string> => {
		const transactionId = await actions.order.create({
			purchase_units: [
				{
					invoice_id: orderId,
					amount: {
						value: `${roundedAmount}`,
						currency_code: "USD",
					},
				},
			],
			intent: "CAPTURE",
		});

		const { ok } = await setTransactionId(orderId, transactionId);

		if (!ok) {
			throw new Error("No se pudo actualizar la orden");
		}
		return transactionId;
	};

	const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
		console.log("onApprove");
		const details = await actions.order?.capture();
		if (!details) {
			return;
		}

		await paypalCheckPayment(details.id);
	};

	return (
		<div className=' relative z-0'>
			<PayPalButtons createOrder={createOrder} onApprove={onApprove} />;
		</div>
	);
};