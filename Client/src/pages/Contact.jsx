import React from 'react'
import Title from '../Component/Title'
import { assets } from '../assets/assets'
import NewsBox from '../Component/NewsBox'

const Contact = () => {
  return (
    <div>
       <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'CONTACT'} text2={'US'} />
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
      <img src={assets.contact_img} alt="Contact_img" className='w-full md:max-w-[450px]'/>
      <div className="flex flex-col justify-center items-start gap-6">
        <p className='font-semibold text-xl text-gray-600' >Our Store</p>
        <p className=' text-gray-500'>19821 Shophub Station <br/> Delhi 350, New Delhi, INDIA</p>
        <p className='text-gray-500'>Phone: (+91) 93764-65462 <br /> Email: avnish011kumar@gmail.com</p>
        <p className='text-gray-500 font-semibold text-xl'> Carrier At ShopHub</p>
        <p className='text-gray-500'>Learm more about our teams and job opening.</p>
        <button className='border border-black px-6 py-3 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore More</button>
      </div>
    </div>
    <NewsBox/>
    </div>
  )
}

export default Contact