import React, { useContext, useState } from 'react'
import Title from '../Component/Title'
import CartTotal from '../Component/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../Context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const PlaceHolder = () => {

  const { navigate, token, setAddCart, addCart, delivery_fee, BackendUrl, products, getCartCount } = useContext(ShopContext);

  const [method, setMethod] = useState('');
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    zipcode: "",
    state: "",
    country: "",
    phone: ""
  })

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async(response) => {
        // console.log(response);
        try {
            const {data} = await axios.post(`${BackendUrl}/api/order/verifyrazorpay`, response, {headers: {token}})
            if(data.success){
              navigate('/order')
              setAddCart({})
            }
        } catch (error) {
          console.log(error);
          toast.error(error.message)
        }
      }
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItem = []

      for (const items in addCart) {
        for (const item in addCart[items]) {
          if (addCart[items][item] > 0) {
            let itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = addCart[items][item]
              orderItem.push(itemInfo)
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItem,
        amount: getCartCount() + delivery_fee
      }

      switch (method) {
        case 'cod':
          const response = await axios.post(`${BackendUrl}/api/order/place`, orderData, { headers: { token } })
          //  console.log(response.data);

          if (response.data.success) {
            toast.success(response.data.message)
            setAddCart({})
            navigate('/order')
          } else {
            toast.error(response.data.message)
          }
          break;

        case 'stripe':
          const responseStripe = await axios.post(`${BackendUrl}/api/order/stripe`, orderData, { headers: { token } })
          //  console.log(responseStripe.data);

          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data
            window.location.replace(session_url)
          } else {
            toast.error(responseStripe.data.message)
          }

          break;

        case 'razorpay':
          const responseRazorpay = await axios.post(`${BackendUrl}/api/order/razorpay`, orderData, { headers: { token } })
           if(responseRazorpay.data.success){
            initPay(responseRazorpay.data.order)
           }
          break;

        default:
          break;
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={submitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-4 min-h-[80vh] boder-t'>

      { /*---------------Left Sides-----------  */}

      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-2">
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className="flex gap-3">
          <input type="text" placeholder='First Name' onChange={handleInput} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input type="text" placeholder='Last Name' onChange={handleInput} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <input type="Email" placeholder='abcd@gmail.com' onChange={handleInput} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        <input type="text" placeholder='Street' onChange={handleInput} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        <div className="flex gap-3">
          <input type="text" placeholder='City' onChange={handleInput} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input type="text" placeholder='State' onChange={handleInput} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <div className="flex gap-3">
          <input type="number" placeholder='Pincode' onChange={handleInput} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input type="text" placeholder='Country' onChange={handleInput} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <input type="phone" placeholder='Phone' onChange={handleInput} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
      </div>

      {/* Right side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={'PAYMENT'} text2={'METHODS'} />
        </div>

        {/* PAYMENT METHOD */}

        <div className="flex gap-3 flex-col lg:flex-row">

          <div onClick={() => setMethod('stripe')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
            <img src={assets.stripe_logo} alt="Strip_logo" className='h-5 mx-4' />
          </div>
          <div onClick={() => setMethod('razorpay')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
            <img src={assets.razorpay_logo} alt="razorpay_logo" className='h-5 mx-4' />
          </div>
          <div onClick={() => setMethod('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400 ' : ''}`}></p>
            <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
          </div>
        </div>

        <div className="w-full text-end mt-8">
          <button type='submit' className='bg-black text-white py-3 px-12 text-sm'>PLACE ORDER</button>
        </div>

      </div>
    </form>
  )
}

export default PlaceHolder