/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, FormControl, InputGroup } from 'react-bootstrap'
import { listUsers } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom'
import User from './User'

const UsersList = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const userList = useSelector((state) => state.userList)
	const { loading, error } = userList
	const userDelete = useSelector((state) => state.userDelete)
	const { success: successDelete } = userDelete
	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const [searchTerm, setSearchTerm] = useState('')

	useEffect(() => {
		if (!userInfo) {
			navigate('/')
		} else {
			dispatch(listUsers())
		}
	}, [dispatch, successDelete, userInfo, navigate])

	return (
		<>
			<Row>
				<Col sm={3}>
					<h1>Users List</h1>
				</Col>
				<Col sm={9}>
					<InputGroup className='mb-3'>
						<FormControl
							onChange={(e) => {
								setSearchTerm(e.target.value)
							}}
							type='text'
							placeholder='Search...'
							className='w-100 text-center border border-dark'
						/>
					</InputGroup>
				</Col>
			</Row>
			<br />

			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<User searchTerm={searchTerm} />
			)}
		</>
	)
}

export default UsersList
