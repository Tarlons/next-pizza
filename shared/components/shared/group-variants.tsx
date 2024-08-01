'use client'

import { cn } from '@/shared/lib/utils'
import React from 'react'

export type Variant = {
	name: string
	value: string
	disabled?: boolean
}

interface Props {
	items: readonly Variant[]
	onClick?: (value: Variant['value']) => void
	value?: Variant['value']
	className?: string
}
export const GroupVariants: React.FC<Props> = ({
	items,
	onClick,
	className,
	value,
}) => {
	return (
		<div
			className={cn(
				'flex justify-between bg-[#F3F3F7] rounded-3x; p1 select-none',
				className
			)}
		>
			{items.map(item => (
				<button
					key={item.value}
					onClick={() => onClick?.(item.value)}
					className={cn(
						'flex items-center justify-center cursor-pointer h-[30px] px-5 flex-1 rounded-3xl transition-all duration-400 text-sm',
						{
							'bg-white shadow': item.value === value,
							'text-gray-500 opacity-50 pointer-events-none': item.disabled,
						}
					)}
				>
					{item.name}
				</button>
			))}
		</div>
	)
}
