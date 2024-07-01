export const revalidate = 604800;

import { getProductBySlug } from "@/actions";
import {
	MobileProductSlideshow,
	ProductSlideshow,
	QuantitySelector,
	SizeSelector,
} from "@/components";
import { StockLabel } from "@/components/product/stock-label/StockLabel";
import { titleFont } from "@/config/fonts";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

interface Props {
	params: {
		slug: string;
	};
}

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	// read route params
	const slug = params.slug;

	// fetch data
	const product = await getProductBySlug(slug);

	// optionally access and extend (rather than replace) parent metadata
	// const previousImages = (await parent).openGraph?.images || [];

	return {
		title: product?.title,
		description: product?.description,
		openGraph: {
			title: product?.title,
			description: product?.description,
			images: [`/products/${product?.images[1]}`],
		},
	};
}

export default async function ProductBySlugPage({ params }: Props) {
	const { slug } = params;

	const product = await getProductBySlug(slug);

	if (!product) {
		notFound();
	}

	return (
		<div className='mt-5 mb-20 grid md:grid-cols-3 gap-3'>
			{/* SlideShow */}
			<div className='col-span-1 md:col-span-2'>
				{/* DeskTop SlideShow */}
				<ProductSlideshow
					title={product.title}
					images={product.images}
					className='hidden md:block'
				/>

				{/* Mobile SlideShow */}
				<MobileProductSlideshow
					title={product.title}
					images={product.images}
					className='block md:hidden'
				/>
			</div>

			{/* Detalles */}
			<div className='col-span-1 px-5 '>
				<StockLabel slug={product.slug} />
				<h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
					{product.title}
				</h1>

				<p className='text-lg mb-5'>${product.price}</p>
				{/* Sector de tallas */}
				<div className='flex flex-col'>
					<SizeSelector avaiableSizes={product.sizes} selectedSize={product.sizes[0]} />
				</div>
				{/* Selector de cantidad */}
				<QuantitySelector quantity={1} />
				{/* Boton */}
				<button className='btn-primary my-5'>Agregar al carrito</button>
				{/* Descripcion */}
				<h3 className='font-bold text-sm'>Descripcion</h3>
				<p className='font-light'>{product.description}</p>
			</div>
		</div>
	);
}
