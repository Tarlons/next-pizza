'use client'

import React from 'react'

import { cn } from '@/shared/lib/utils'
import { ArrowUpDown } from 'lucide-react'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/shared/components/ui/popover'
import { useFilters } from '@/shared/hooks/use-filters'

interface Props {
	className?: string
}

export const SortPopup: React.FC<Props> = ({ className }) => {
	const { sortBy, setSortBy } = useFilters()

	const handleSortChange = (value: string) => {
		setSortBy(value)
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<div
					className={cn(
						'inline-flex items-center gap-[0.25rem] bg-gray-50 px-[1.25rem] h-[3.25rem] rounded-2xl cursor-pointer',
						className
					)}
				>
					<ArrowUpDown className='w-[1rem] h-[1rem]' />
					<b>Сортировка:</b>
					<b className='text-primary'>
						{sortBy
							? sortBy === 'asc'
								? 'по возрастанию'
								: 'по убыванию'
							: 'популярное'}
					</b>
				</div>
			</PopoverTrigger>
			<PopoverContent className='w-[15rem]'>
				<ul>
					<li
						className={cn(
							'hover:bg-secondary hover:text-primary p-[0.5rem] px-[1rem] cursor-pointer rounded-md',
							sortBy === 'asc' && 'bg-secondary text-primary'
						)}
						onClick={() => handleSortChange('asc')}
					>
						Сначала недорогие
					</li>
					<li
						className={cn(
							'hover:bg-secondary hover:text-primary p-[0.5rem] px-[1rem] cursor-pointer rounded-md',
							sortBy === 'desc' && 'bg-secondary text-primary'
						)}
						onClick={() => handleSortChange('desc')}
					>
						Сначала дорогие
					</li>
				</ul>
			</PopoverContent>
		</Popover>
	)
}
