import AsyncHandler from 'express-async-handler'
import users from '../data/users.js'
import bcrypt from 'bcryptjs'

//@route GET /api/users/login
//@access public
const authUser = AsyncHandler(async (req, res) => {
	const { email, password } = req.body

	const user = users.find((user) => user.email === email)

	const matchPassword = async (entheredPassword, password) => {
		return await bcrypt.compare(entheredPassword, password)
	}

	if (user && (await matchPassword(password, user.password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		})
	} else {
		res.status(401)
		throw new Error('Invalid email or password')
	}
})

//@desc Get all user
//@route GET /api/users
//@access private/Admin
const getUsers = AsyncHandler(async (req, res) => {
	//throw new Error('Some new error')                  <------ to show the error massege on the screen
	res.json(users)
})

//@desc Get user by ID
//@route GET /api/users/:id
//@access private/Admin
const getUserById = AsyncHandler(async (req, res) => {
	const user = users.find((user) => user._id === req.params.id)
	if (user) {
		res.json(user)
	} else {
		res.status(404)
		throw new Error('User not found')
	}
})

//@desc delete user
//@route DELETE /api/users/:id
//@access private/Admin
const deleteUser = AsyncHandler(async (req, res) => {
	const user = users.findIndex((user) => user._id === req.params.id)

	if (user) {
		users.splice(user, 1)
		res.json({ message: 'User removed' })
	} else {
		res.status(404)
		throw new Error('User not found')
	}
})
//@desc Update user
//@route PUT /api/users/:id
//@access private/Admin
const updateUser = AsyncHandler(async (req, res) => {
	const userExists = users.find((user) => user._id === req.params.id)

	if (userExists) {
		userExists._id = userExists._id
		userExists.name = req.body.name || userExists.name
		userExists.email = req.body.email || userExists.email
		userExists.password =
			bcrypt.hashSync(req.body.password, 10) || userExists.email
		userExists.isAdmin = req.body.isAdmin

		res.json({
			_id: userExists._id,
			name: userExists.name,
			email: userExists.email,
			isAdmin: userExists.isAdmin,
		})
	} else {
		res.status(404)
		throw new Error('User not found')
	}
})

//@desc Register  a new user
//@route POST /api/users/users
//@access private/Admin
const createUser = AsyncHandler(async (req, res) => {
	const { name, email, password, _id } = req.body

	const userEmaileExists = users.find((user) => user.email === email)
	const userIdExists = users.find((user) => user._id === _id)

	if (userIdExists) {
		res.status(400)
		throw new Error('User already exists on this ID')
	}
	if (userEmaileExists) {
		res.status(400)
		throw new Error('User already exists on this email')
	}

	const newPassword = bcrypt.hashSync(password, 10)

	const user = users.push({
		_id: _id,
		name,
		email,
		password: newPassword,
		isAdmin: false,
	})

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		})
	} else {
		res.status(400)
		throw new Error('Invalid user data')
	}
})
export { authUser, getUsers, getUserById, createUser, deleteUser, updateUser }
