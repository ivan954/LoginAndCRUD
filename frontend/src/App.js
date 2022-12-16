import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import UsersList from './screens/UsersList'
import Header from './components/Header'
import Footer from './components/Footer'
import LoginScreen from './screens/LoginScreen'
import EditUser from './screens/EditUser'
import CreateUser from './screens/CreateUser'

const App = () => {
	return (
		<Router>
			<Header />
			<main className='py-3'>
				<Container>
					<Routes>
						<Route exact path='/' element={<LoginScreen />}></Route>
						<Route exact path='/userslist' element={<UsersList />}></Route>
						<Route exact path='/edituser/:id' element={<EditUser />}></Route>
						<Route exact path='/createuser' element={<CreateUser />}></Route>
					</Routes>
				</Container>
			</main>
			<Footer />
		</Router>
	)
}

export default App
