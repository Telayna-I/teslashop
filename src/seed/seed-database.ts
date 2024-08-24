import prisma from "../lib/prisma";
import { initialData } from "./seed";
import { countries } from "./seed-countries";

async function main() {
	await Promise.all([
		prisma.orderAddress.deleteMany(),
		prisma.orderItem.deleteMany(),
		prisma.order.deleteMany(),

		prisma.userAddress.deleteMany(),
		prisma.user.deleteMany(),
		prisma.country.deleteMany(),

		prisma.productImage.deleteMany(),
		prisma.category.deleteMany(),
		prisma.product.deleteMany(),
	]);

	const { categories, products, users } = initialData;

	await prisma.user.createMany({ data: users });

	await prisma.country.createMany({ data: countries });

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
