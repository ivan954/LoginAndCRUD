import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
	userListReducer,
	userLoginReducer,
	userDeleteReducer,
	userDetailsReducer,
	userUpdateReducer,
	userRegisterReducer
} from './reducers/userReducers'


// redux reducers
const reducer = combineReducers({
	userList: userListReducer,
	userLogin: userLoginReducer,
	userDelete: userDeleteReducer,
	userDetails: userDetailsReducer,
	userUpdate: userUpdateReducer,
	userRegister: userRegisterReducer,
})


// savings to local storage  
const userInfoFromStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null

const initialState = {
	userLogin: { userInfo: userInfoFromStorage },
}


// redux DevTools
const middleware = [thunk]

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
)

export default store
