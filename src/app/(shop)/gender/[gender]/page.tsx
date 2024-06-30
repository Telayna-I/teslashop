export const revalidate = 60;

import { getPaginatedProductsWithImages } from "@/actions";
import { Title, ProductGrid, Pagination } from "@/components";
import { Gender } from "@prisma/client";

import { notFound, redirect, useSearchParams } from "next/navigation";

interface Props {
	params: {
		gender: string;
	};
	searchParams: {
		page?: string;
	};
}

const allowedRoutes = ["men", "women", "kid"];

export default async function GenderByPage({ params, searchParams }: Props) {
	const { gender } = params;

	const page = searchParams.page ? parseInt(searchParams.page) : 1;

	const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({
		page,
		gender: gender as Gender,
	});

	if (products.length === 0) {
		redirect(`/gender/${gender}`);
	}

	if (!allowedRoutes.includes(gender)) {
		notFound();
	}

	const labels: Record<string, string> = {
		men: "para hombres",
		women: "para mujeres",
		kid: "para niños",
		unisex: "para todos",
	};
	return (
		<div>
			<Title title={`Articulos ${labels[gender]}`} subtitle='Productos' className=' mb-2' />
			<ProductGrid products={products} />
			<Pagination totalPages={totalPages} />
		</div>
	);
}
