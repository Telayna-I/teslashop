import { notFound } from "next/navigation";

interface Props {
	params: {
		id: string;
	};
}

const allowedRoutes = ["men", "women", "kids"];

export default function ({ params }: Props) {
	const { id } = params;

	if (!allowedRoutes.includes(id)) {
		notFound();
	}
	return (
		<div>
			<h1>Category Page</h1>
		</div>
	);
}
