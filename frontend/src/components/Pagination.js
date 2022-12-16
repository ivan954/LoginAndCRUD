import React from 'react'
import { Button } from 'react-bootstrap'

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
	const pageNumbers = []

	for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
		pageNumbers.push(i)
	}

	return (
		<nav>
			<ul className='pagination justify-content-center'>
				{pageNumbers.map((number) => (
					<li key={number} className='page-item '>
						<Button onClick={() => paginate(number)} className='page-link'>
							{number}
						</Button>
					</li>
				))}
			</ul>
		</nav>
	)
}

export default Pagination
