import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { register } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import { useNavigate, Link } from 'react-router-dom'

const CreateUser = () => {
	const [name, setName] = useState('')
	const [id, setId] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [message, setMessage] = useState(null)

	const dispatch = useDispatch()
	const navigate = useNavigate()

	//checking if the user created
	const userRegister = useSelector((state) => state.userRegister)
	const { loading, error } = userRegister

	// check password matches
	const submitHandler = (e) => {
		e.preventDefault()
		if (password !== confirmPassword) {
			setMessage('Passwords do not match')
		} else {
			dispatch(register(id, name, email, password))
			alert('User Created !')
			navigate('/userslist')
		}
	}

	return (
		<>
			<Link to='/userslist' className='btn btn-dark my-3'>
				go back
			</Link>
			<FormContainer>
				<h1>Sign Up</h1>
				{message && <Message variant='danger'>{message}</Message>}
				{error && <Message variant='danger'>{error}</Message>}
				{loading && <Loader />}
				<Form onSubmit={submitHandler}>
					<Form.Group controlId='id'>
						<Form.Label>id</Form.Label>
						<Form.Control
							type='id'
							placeholder='Enter id'
							value={id ?? ''}
							required
							onChange={(e) => setId(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId='name'>
						<Form.Label>Name</Form.Label>
						<Form.Control
							type='name'
							placeholder='Enter name'
							value={name ?? ''}
							required
							onChange={(e) => setName(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId='email'>
						<Form.Label>Email Address</Form.Label>
						<Form.Control
							type='email'
							placeholder='Enter email'
							value={email ?? ''}
							required
							onChange={(e) => setEmail(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId='password'>
						<Form.Label>password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Enter password'
							value={password ?? ''}
							required
							minLength={6}
							onChange={(e) => setPassword(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId='confirmPassword'>
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Confirm password'
							value={confirmPassword ?? ''}
							required
							onChange={(e) => setConfirmPassword(e.target.value)}
						></Form.Control>
					</Form.Group>
					<br />
					<Button type='submit' variant='primary'>
						Register
					</Button>
				</Form>
			</FormContainer>
		</>
	)
}

export default CreateUser
