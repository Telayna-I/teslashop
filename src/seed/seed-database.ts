import { url } from "inspector";
import prisma from "../lib/prisma";
import { initialData } from "./seed";

async function main() {
	await Promise.all([
		prisma.productImage.deleteMany(),
		prisma.product.deleteMany(),
		prisma.category.deleteMany(),
	]);

	const { categories, products } = initialData;

	const categoriesData = categories.map((name) => ({
		name,
	}));

	await prisma.category.createMany({ data: categoriesData });

	const categoriesDB = await prisma.category.findMany();

	const categoriesMap = categoriesDB.reduce((map, categorie) => {
		map[categorie.name.toLocaleLowerCase()] = categorie.id;

		return map;
	}, {} as Record<string, string>);

	console.log(categoriesMap);

	products.forEach(async (product) => {
		const { type, images, ...rest } = product;

		const dbProduct = await prisma.product.create({
			data: {
				...rest,
				categoryId: categoriesMap[type],
			},
		});

		// Images

		const imagesData = images.map((image) => ({
			url: image,
			productId: dbProduct.id,
		}));

		await prisma.productImage.createMany({ data: imagesData });
	});

	console.log("seed executed");
}

(() => {
	main();
})();
