import React from 'react'
import { Button } from '@/shared/components/ui/button'
import { Plus } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import { Title } from './title'
import Link from 'next/link'
import { Ingredient } from '@prisma/client'
import styles from '@/assets/modules.module.scss'

interface Props {
	id: number
	name: string
	price: number
	imageUrl: string
	ingredients: Ingredient[]
	className?: string
}

export const ProductCard: React.FC<Props> = ({
	id,
	name,
	price,
	imageUrl,
	ingredients,
	className,
}) => {
	return (
		<div className={cn(styles['product-card'], className)}>
			<Link href={`/product/${id}`}>
				<div className='flex justify-center p-6 rounded-lg'>
					<img
						className='w-[13.4375rem] h-[13.4375rem]'
						src={imageUrl}
						alt={name}
					/>
				</div>

				<Title text={name} size='sm' className={styles['title']} />

				<p className='text-sm text-gray-400'>
					{ingredients.map(ingredient => ingredient.name).join(', ')}
				</p>

				<div className={styles['price-container']}>
					<span className={styles['price']}>
						от <b>{price} ₽</b>
					</span>
					<Button variant='secondary' className={styles['button']}>
						<Plus size={20} className='mr-1' />
						Добавить
					</Button>
				</div>
			</Link>
		</div>
	)
}
