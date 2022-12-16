import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'
import { getUserDetails, updateUser } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import { useNavigate, useParams } from 'react-router-dom'
import { USER_UPDATE_RESET } from '../constants/userConstants'

const EditUser = () => {
	const [name, setName] = useState('')
	const [password, setPassword] = useState('')
	const [email, setEmail] = useState('')
	const [isAdmin, setIsAdmin] = useState(false)

	const dispatch = useDispatch()

	const userDetails = useSelector((state) => state.userDetails)
	const { loading, error, user } = userDetails

	const userUpdate = useSelector((state) => state.userUpdate)
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = userUpdate

	const navigate = useNavigate()

	const params = useParams()

	useEffect(() => {
		if (successUpdate) {
			navigate('/userslist')
			dispatch({ type: USER_UPDATE_RESET })
		} else {
			if ( !user || user._id !== params.id) {
				dispatch(getUserDetails(params.id))
			} else { 
				setName(user.name)
				setEmail(user.email)
				setPassword(user.password)
				setIsAdmin(user.isAdmin)
			}
		}
	}, [dispatch, params.id, successUpdate, user, navigate])

	const submitHandler = (e) => {
		e.preventDefault()

		dispatch(updateUser({ _id: params.id, name, email, isAdmin, password }))
	}

	return (
		<>
			<Link to='/userslist' className='btn btn-dark my-3'>
				go back
			</Link>
			<FormContainer>
				{loadingUpdate && <Loader />}
				{errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant='danger'>{error}</Message>
				) : (
					<Form onSubmit={submitHandler}>
						<Form.Group controlId='name'>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type='name'
								placeholder='Enter name'
								value={name ?? ''}
								onChange={(e) => setName(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='email'>
							<Form.Label>Email Address</Form.Label>
							<Form.Control
								type='email'
								placeholder='Enter email'
								value={email ?? ''}
								onChange={(e) => setEmail(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='password'>
							<Form.Label>password</Form.Label>
							<Form.Control
								type='password'
								placeholder='Enter New Password'
								onChange={(e) => setPassword(e.target.value)}
							></Form.Control>
						</Form.Group>
						<br />
						<Form.Group controlId='isAdmin'>
							<Form.Check
								type='checkbox'
								label='Is Admin'
								checked={isAdmin ?? false}
								onChange={(e) => setIsAdmin(e.target.checked)}
							></Form.Check>
						</Form.Group>
						<br />
						<Button type='submit' variant='primary'>
							Update
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	)
}

export default EditUser
