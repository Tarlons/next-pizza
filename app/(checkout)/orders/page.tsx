import { Container } from '@/shared/components/shared/container'

import { Title } from '@/shared/components/shared/title'

export default async function OrdersPage() {
	return (
		<Container className='my-5'>
			<Title
				text='Оформление заказа'
				size='xl'
				className='font-extrabold mb-8'
			/>

			<div className='flex flex-col gap-10 flex-1 mb-20 w-[70%]'></div>
		</Container>
	)
}
