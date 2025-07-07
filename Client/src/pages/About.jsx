import React from 'react'
import { assets } from '../assets/assets'
import Title from '../Component/Title'
import NewsBox from '../Component/NewsBox'

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text2={'US'} text1={'ABOUT'}/>
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img src={assets.about_img} alt="About_img" className='w-full md:max-w-[450px]'/>
      <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
      <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim quia ut sit omnis ea at reprehenderit asperiores blanditiis accusamus vitae illum expedita, inventore libero consequatur reiciendis repellendus officia sequi optio!</p>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia nisi excepturi facilis, molestias saepe totam. Doloribus assumenda earum ratione laborum inventore atque eveniet rerum voluptate recusandae iste. Reprehenderit, eligendi quia.</p>
      <b className='text-gray-800'>Our Mission</b>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est consectetur quasi deserunt ab quae labore, laboriosam tempore eveniet ipsam quo harum placeat maxime sequi nulla, officiis ullam ut vel ipsum.</p>
      </div>
      </div>
      <div className="text-2xl py-4">
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>
      <div className="mb-20 flex flex-col md:flex-row text-sm gap-5">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className='text-gray-800'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque, sint velit, iure quod, sunt aliquam asperiores dolore molestias illo ullam repudiandae minima laborum est recusandae qui ipsa fugiat soluta ducimus.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className='text-gray-800'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque, sint velit, iure quod, sunt aliquam asperiores dolore molestias illo ullam repudiandae minima laborum est recusandae qui ipsa fugiat soluta ducimus.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Support:</b>
          <p className='text-gray-800'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque, sint velit, iure quod, sunt aliquam asperiores dolore molestias illo ullam repudiandae minima laborum est recusandae qui ipsa fugiat soluta ducimus.</p>
        </div>
      </div>
      <NewsBox/>
    </div>
  )
}

export default About