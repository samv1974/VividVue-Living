import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/signin'
import SignOut from './pages/signOut'
import Profile from './pages/profile'
import About from './pages/about'


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/sign-in' element={<Signin/>}/>
      <Route path='/sign-out' element={<SignOut/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/about' element={<About/>}/>
      </Routes>
    </BrowserRouter>
  )
}
 