import { prisma } from '@/prisma/prisma-client'

export interface GetSearchParams {
	query?: string
	sortBy?: string // 'price_asc' или 'price_desc'
	sizes?: string
	pizzaTypes?: string
	ingredients?: string
	priceFrom?: string
	priceTo?: string
}

const DEFAULT_MIN_PRICE = 0
const DEFAULT_MAX_PRICE = 1000

export const findPizzas = async (params: GetSearchParams) => {
	const sizes = params.sizes?.split(',').map(Number)
	const pizzaTypes = params.pizzaTypes?.split(',').map(Number)
	const ingredientsIdArr = params.ingredients?.split(',').map(Number)

	const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE
	const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE

	const sortOrder = params.sortBy === 'price_desc' ? 'desc' : 'asc'

	const categories = await prisma.category.findMany({
		include: {
			products: {
				orderBy: {
					id: 'desc', // Основная сортировка по ID
				},
				where: {
					ingredients: ingredientsIdArr
						? {
								some: {
									id: {
										in: ingredientsIdArr,
									},
								},
						  }
						: undefined,
					items: {
						some: {
							size: {
								in: sizes,
							},
							pizzaType: {
								in: pizzaTypes,
							},
							price: {
								gte: minPrice, // >=
								lte: maxPrice, // <=
							},
						},
					},
				},
				include: {
					ingredients: true,
					items: {
						where: {
							price: {
								gte: minPrice,
								lte: maxPrice,
							},
						},
						orderBy: {
							price: sortOrder, // Сортировка по цене
						},
					},
				},
			},
		},
	})

	// Сортируем продукты в категориях по цене
	const sortedCategories = categories.map(category => {
		const sortedProducts = category.products.map(product => {
			const sortedItems = product.items.sort((a, b) => {
				return sortOrder === 'asc' ? a.price - b.price : b.price - a.price
			})
			return { ...product, items: sortedItems }
		})
		return { ...category, products: sortedProducts }
	})

	return sortedCategories
}
