import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
   <>
    <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mb-0 mt-20 p-10 pb-2 text-sm '>
        <div className="cursor-pointer">
            <img src={assets.logo} alt="Logo" className='w-32 mb-5'/>
            <p className='w-full md:2/3 text-gray-600'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus voluptate inventore.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim totam obcaecati aspernatur modi tempore error, hic facere labore eaque deleniti. Iure quis dolorem voluptas eveniet animi dignissimos, vel sapiente nihil?
            </p>
        </div>

        <div className=" cursor-pointer">
            <p className='text-xl font-medium mb-5 capitalize'>Company</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
            </ul>
        </div>
        <div className="cursor-pointer">
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+91-9376465462</li>
            <li>Avnish011kumar@gamil.com</li>
            </ul>
        </div>
        <div className="cursor-pointer">
            <hr />
            <p className='py-1 text-sm text-center text-gray-700'> Copy@right 2025 FOREVER E-COMMERCE</p>
        </div>
    </div>
   </>
  )
}

export default Footer