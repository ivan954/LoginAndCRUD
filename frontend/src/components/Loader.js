import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
	return (
		<Spinner
			animation='border'
			style={{
				width: '150px',
				height: '150px',
				margin: 'auto',
				display: 'block',
			}}
		>
			<span className='sr-only sr-only-focusable'>Loading...</span>
		</Spinner>
	)
}

export default Loader
