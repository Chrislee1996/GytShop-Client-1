// import React, { Component, Fragment } from 'react'
import React, { useState, Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

// import AuthenticatedRoute from './components/shared/AuthenticatedRoute'
import AutoDismissAlert from './components/shared/AutoDismissAlert/AutoDismissAlert'
import Header from './components/shared/Header'
import RequireAuth from './components/shared/RequireAuth'
import Home from './components/Home'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'
import IndexProducts from './components/products/IndexProduct'
import CreateProduct from './components/products/CreateProduct'
import ShowProduct from './components/products/ShowProduct'
import ClothingProducts from './components/categories/ClothingProducts'
import CollectiblesProducts from './components/categories/CollectiblesProducts'
import ElectronicsProducts from './components/categories/ElectronicsProducts'
import MineProducts from './components/products/MineProducts'
import MyCart from './components/cart/MyCart'
import Checkout from './components/cart/Checkout'

const App = () => {

  const [user, setUser] = useState(null)
  const [msgAlerts, setMsgAlerts] = useState([])

  console.log('user in app', user)
  console.log('message alerts', msgAlerts)
  const clearUser = () => {
    console.log('clear user ran')
    setUser(null)	
  }

	const deleteAlert = (id) => {
		setMsgAlerts((prevState) => {
			return (prevState.filter((msg) => msg.id !== id) )
		})
	}

	const msgAlert = ({ heading, message, variant }) => {
		const id = uuid()
		setMsgAlerts(() => {
			return (
				[{ heading, message, variant, id }]
      )
		})
	}

		return (
			<Fragment>
				<Header user={user} />
				<Routes>
					<Route path='/' element={<Home msgAlert={msgAlert} user={user} />} />
					<Route
						path='/sign-up'
						element={<SignUp msgAlert={msgAlert} setUser={setUser} />}
					/>
					<Route
						path='/sign-in'
						element={<SignIn msgAlert={msgAlert} setUser={setUser} />}
					/>
					<Route
						path='/sign-out'
						element={
						<RequireAuth user={user}>
							<SignOut msgAlert={msgAlert} clearUser={clearUser} user={user} />
						</RequireAuth>
						}
					/>
					<Route
						path='/change-password'
						element={
						<RequireAuth user={user}>
							<ChangePassword msgAlert={msgAlert} user={user} />
						</RequireAuth>}
					/>
					<Route
						path='/products'
						element={<IndexProducts msgAlert={msgAlert} user={user} />}
					/>
					<Route
						path='/products/clothing'
						element={<ClothingProducts msgAlert={msgAlert} user={user} />}
					/>
					<Route
						path='/products/collectibles'
						element={<CollectiblesProducts msgAlert={msgAlert} user={user} />}
					/>
					<Route
						path='/products/electronics'
						element={<ElectronicsProducts msgAlert={msgAlert} user={user} />}
					/>
					<Route
						path='/orders/:userId'
						element={<MyCart msgAlert={msgAlert} user={user} />}
					/>
					<Route
						path='/product/orderId'
						element={<Checkout msgAlert={msgAlert} user={user} />}
					/>
					<Route
						path='/products/:productId'
						element={<ShowProduct msgAlert={msgAlert} user={user} />}
					/>
					<Route
						path='/addProduct'
						element={
						<RequireAuth user={user}>
							<CreateProduct msgAlert={msgAlert} user={user} />
						</RequireAuth>}
					/>
					<Route
						path='/products/mine'
						element={
							<RequireAuth user={user}>
								<MineProducts msgAlert={msgAlert} user={user}/>
							</RequireAuth>
						}
					/>
					<Route
						path='/products/:productId'
						element={<ShowProduct msgAlert={msgAlert} user={user} />}
					/>
					</Routes>
				{msgAlerts.map((msgAlert) => (
					<AutoDismissAlert
						key={msgAlert.id}
						heading={msgAlert.heading}
						variant={msgAlert.variant}
						message={msgAlert.message}
						id={msgAlert.id}
						deleteAlert={deleteAlert}
					/>
				))}
			</Fragment>
		)
}

export default App
