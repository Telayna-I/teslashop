import { Title, ProductGrid } from "@/components";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
	params: {
		id: Category;
	};
}

const allowedRoutes = ["men", "women", "kid"];

export default function ({ params }: Props) {
	const { id } = params;
	const products = initialData.products.filter((product) => product.gender === id);

	if (!allowedRoutes.includes(id)) {
		notFound();
	}

	const labels: Record<Category, string> = {
		men: "para hombres",
		women: "para mujeres",
		kid: "para niños",
		unisex: "para todos",
	};
	return (
		<div>
			<Title title={`Articulos ${labels[id]}`} subtitle='Productos' className=' mb-2' />
			<ProductGrid products={products} />
		</div>
	);
}
