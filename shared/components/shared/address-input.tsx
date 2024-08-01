'use client'

import React from 'react'
import { AddressSuggestions } from 'react-dadata'
import 'react-dadata/dist/react-dadata.css'

interface Props {
	onChange?: (value?: string) => void
}

export const AdressInput: React.FC<Props> = ({ onChange }) => {
	return (
		<AddressSuggestions
			token='1c7bd7e09c656e0c4cb7adeb452389a84030e92d'
			onChange={data => onChange?.(data?.value)}
		/>
	)
}
