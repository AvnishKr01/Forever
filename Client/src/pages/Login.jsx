import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';


const Login = () => {

  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, BackendUrl } = useContext(ShopContext);

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmithandler = async (e) => {
    e.preventDefault();
    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(`${BackendUrl}/api/user/register`, { name, email, password })
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success(response.data.message)
        } else {
          toast.error("Sign Up Failed try again!");
        }
      }
      else {
        const response = await axios.post(`${BackendUrl}/api/user/login`, { email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token);
          toast.success(response.data.message);
        } else {
          toast.error("Login Failed try again!");
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <form onSubmit={onSubmithandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>


      {
        currentState === 'Login' ?
          <div className="">
            <input type="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className='w-full border px-3 py-2 my-2 border-gray-400 rounded-sm' placeholder='Enter Your Email' required />
            <input type="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className='w-full border px-3 py-2 my-2 border-gray-400 rounded-sm' placeholder='Enter Your Password' required />
            <p className='cursor-pointer text-sm text-gray-700'>Forget Your Password?</p>
            <button className='border px-3 py-2 text-white bg-black rounded-sm  w-full mt-6'>LOGIN</button>
            <div className="flex flex-col justify-center items-center gap-3 text-md mt-10 cursor-pointer">
              <span className='border border-black px-3 py-2 text-black bg-white rounded-sm  w-full text-center'> {
                currentState === "Login" ? <p className='cursor-pointer ' onClick={() => setCurrentState('Sign Up')}>Create Account</p> : ''
              }</span>
              {/* <span className='border border-red-400 px-3 py-2 text-white bg-red-500 rounded-sm  w-full text-center'>Login In Google</span>
              <span className='border border-blue-400 px-3 py-2 text-white bg-blue-500 rounded-sm  w-full text-center'>Login In Facebook</span>
              <span className='border border-green-400 px-3 py-2 text-white bg-green-500 rounded-sm  w-full text-center'>Login In Gmail</span> */}
            </div>
          </div>
          :
          <div className="">
            <input type="text" name="name " value={name} onChange={(e) => setName(e.target.value)} className='w-full border px-3 py-2 my-2 border-gray-400 rounded-sm' placeholder='Enter Your Name' required />
            <input type="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className='w-full border px-3 py-2 my-2 border-gray-400 rounded-sm' placeholder='Enter Your Email' required />
            <input type="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className='w-full border px-3 py-2 my-2 border-gray-400 rounded-sm' placeholder='Enter Your Password' required />
            {/* <input type="Password" name="name " className='w-full border px-3 py-2 my-2 border-gray-400 rounded-sm' placeholder='Confirm Your Password' required  /> */}
            <button className='border px-3 py-2 text-white bg-black rounded-sm  w-full mt-5'>SIGN UP</button>
            <div className="flex flex-col justify-center items-center gap-3 text-md mt-10 cursor-pointer">
              <span className='border border-black px-3 py-2 text-black bg-white rounded-sm  w-full text-center'> {
                currentState === "Login" ? '' : <p className='cursor-pointer' onClick={() => setCurrentState('Login')}>Login Page</p>
              }</span>
              {/* <span className='border border-red-400 px-3 py-2 text-white bg-red-500 rounded-sm  w-full text-center '>Login In Google</span>
              <span className='border border-blue-400 px-3 py-2 text-white bg-blue-500 rounded-sm  w-full text-center'>  In Facebook</span>
              <span className='border border-green-400 px-3 py-2 text-white bg-green-500 rounded-sm  w-full text-center'>Login In Gmail</span> */}
            </div>
          </div>
      }



    </form>
  )
}

export default Login