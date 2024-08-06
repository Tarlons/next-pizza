import React from 'react'

import { cn } from '@/shared/lib/utils'
import { ArrowUpDown } from 'lucide-react'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/shared/components/ui/popover'

interface Props {
	className?: string
}

export const SortPopup: React.FC<Props> = ({ className }) => {
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
					<b className='text-primary'>популярное</b>
				</div>
			</PopoverTrigger>
			<PopoverContent className='w-[15rem]'>
				<ul>
					<li className='hover:bg-secondary hover:text-primary p-[0.5rem] px-[1rem] cursor-pointer rounded-md'>
						Сначала популярное
					</li>
					<li className='hover:bg-secondary hover:text-primary p-[0.5rem] px-[1rem] cursor-pointer rounded-md'>
						Сначала недорогие
					</li>
					<li className='hover:bg-secondary hover:text-primary p-[0.5rem] px-[1rem] cursor-pointer rounded-md'>
						Сначала дорогие
					</li>
				</ul>
			</PopoverContent>
		</Popover>
	)
}
