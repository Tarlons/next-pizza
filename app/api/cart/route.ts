import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { findOrCreateCart } from '@/shared/lib/find-or-create-cart'
import { CreateCartItemValues } from '@/shared/services/dto/cart.dto'
import { updateCartTotalAmount } from '@/shared/lib/update-cart-total-amount'

export async function GET(req: NextRequest) {
	try {
		const token = req.cookies.get('cartToken')?.value

		if (!token) {
			return NextResponse.json({ totalAmount: 0, items: [] })
		}

		const userCart = await prisma.cart.findFirst({
			where: {
				OR: [
					{
						token,
					},
				],
			},
			include: {
				items: {
					orderBy: {
						createdAt: 'desc',
					},
					include: {
						productItem: {
							include: {
								product: true,
							},
						},
						ingredients: true,
					},
				},
			},
		})

		return NextResponse.json(userCart)
	} catch (error) {
		console.log('[CART_GET] Server error', error)
		return NextResponse.json(
			{ message: 'Не удалось получить корзину' },
			{ status: 500 }
		)
	}
}

export async function POST(req: NextRequest) {
	try {
		let token = req.cookies.get('cartToken')?.value

		if (!token) {
			token = crypto.randomUUID()
		}

		const userCart = await findOrCreateCart(token)

		const data = (await req.json()) as CreateCartItemValues

		// Получаем все cartItems с данным productItemId
		const potentialCartItems = await prisma.cartItem.findMany({
			where: {
				cartId: userCart.id,
				productItemId: data.productItemId,
			},
			include: {
				ingredients: true,
			},
		})

		// Проверяем ингредиенты в каждом потенциальном элементе
		let matchingCartItem = null
		for (const item of potentialCartItems) {
			const itemIngredientIds = item.ingredients
				.map(ingredient => ingredient.id)
				.sort()

			// Если ингредиенты отсутствуют, сравниваем как пустые массивы
			const dataIngredientIds = data.ingredients
				? data.ingredients.slice().sort()
				: []

			if (
				JSON.stringify(itemIngredientIds) === JSON.stringify(dataIngredientIds)
			) {
				matchingCartItem = item
				break
			}
		}

		// Если товар был найден, делаем +1
		if (matchingCartItem) {
			await prisma.cartItem.update({
				where: {
					id: matchingCartItem.id,
				},
				data: {
					quantity: matchingCartItem.quantity + 1,
				},
			})
		} else {
			await prisma.cartItem.create({
				data: {
					cartId: userCart.id,
					productItemId: data.productItemId,
					quantity: 1,
					ingredients: { connect: data.ingredients?.map(id => ({ id })) },
				},
			})
		}

		const updatedUserCart = await updateCartTotalAmount(token)

		const resp = NextResponse.json(updatedUserCart)
		resp.cookies.set('cartToken', token)
		return resp
	} catch (error) {
		console.log('[CART_POST] Server error', error)
		return NextResponse.json(
			{ message: 'Не удалось создать корзину' },
			{ status: 500 }
		)
	}
}
