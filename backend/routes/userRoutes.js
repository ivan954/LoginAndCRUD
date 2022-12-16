import express from 'express'
const router = express.Router()

import {
	authUser,
	getUsers,
	getUserById,
	createUser,
	deleteUser,
	updateUser
} from '../controllers/userController.js'

router.route('/').get(getUsers)
router.route('/createuser').post(createUser)
router.route('/:id').get(getUserById)
router.post('/login', authUser)
router.route('/:id').delete(deleteUser)
router.route('/:id').put(updateUser)

export default router
