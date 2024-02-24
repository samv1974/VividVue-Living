import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import SignOut from './pages/SignUp'
import Profile from './pages/profile'
import About from './pages/About'
import Header from './Components/Header'
import Register from './pages/register'
import PrivateRoute from './Components/PrivateRoute'

export default function App() {
  return (
    <BrowserRouter>
      <Header/>

      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/sign-in' element={<Signin/>}/>
      <Route path='/sign-up' element={<SignOut/>}/>
      <Route path='/about' element={<About/>}/>

      <Route element={<PrivateRoute/>}>
      <Route path='/profile' element={<Profile/>}/>
      </Route>
      <Route path='/register' element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  )
}
 