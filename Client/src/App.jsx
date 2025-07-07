import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home, Collection, About, Product, Contact, Cart, PlaceHolder, Login } from "../src/Component/Index"
import Navbar from './Component/Navbar'
import Footer from './Component/Footer'
import Input from './Component/Input'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Order from './pages/Order'
import Verify from './pages/Verify'



const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer/>
      <Navbar />
      <Input/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<Order/>} />
        <Route path='/placeholder' element={<PlaceHolder />} />
        <Route path='/verify' element={<Verify/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App