import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import Update from './components/Update'
import Create from './components/Create'

function App() {

  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Register/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/home' element={<Home/>}></Route>
    <Route path='/create' element={<Create/>}></Route>
    <Route path='/edit/:id' element={<Update/>}></Route>
   </Routes>
   </BrowserRouter>
  )
}

export default App
