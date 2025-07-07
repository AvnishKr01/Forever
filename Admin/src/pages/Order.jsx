import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Order = ({ token }) => {

  const [listOrder, setListOrder] = useState([])

  const allOrders = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(`${backendUrl}/api/order/allorder`, {}, { headers: { token } })
      // console.log(response.data);
      setListOrder(response.data.orders.reverse())
    } catch (error) {
      toast.error(error.message);
    }
  }

  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(`${backendUrl}/api/order/status`, {orderId, status:e.target.value} , {headers:{token}})
      if(response.data.success){
        await allOrders();
      }
    } catch (error) {
      console.log(error);
      // toast.error(response.data.message);
    }
  }
  // console.log(listOrder);
  
  useEffect(() => {
    allOrders();
  }, [token])

  return (
    <div>
      <h3>Order Page</h3>
      <div className="">
        {
          listOrder.map((order, index) =>( 
            <div className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700" key={index}>
              <img className='w-12 ' src={assets.parcel_icon} alt="parcel_icon" />
              <div className="">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return <p className='py-0.5' key={index}>{item.name} X {item.qunatity} <span>{item.size}</span></p>
                  } else {
                    return <p className='py-0.5' key={index}>{item.name} X {item.qunatity} <span>{item.size}</span>,</p>

                  }
                })}
              </div>
              <p className='mt-3 mb-2 font-medium' >{order.address.firstName + " " + order.address.lastName}</p>
              <div className="">
                <p>{order.address.street + ","}</p>
                <p>{order.address.city + "," + order.address.state + "," + order.address.country + "," + order.address.zipcode + ","}</p>
                <p>{order.address.phone + ","}</p>
              </div>
              <div className="">
                <p className='text-sm sm:text-[15px]' >Items: {order.items.length}</p>
                <p className='mt-3' >Payment Method: {order.paymentMethod}</p>
                <p>Items: {order.payment ? 'Done' : 'Pending'}</p>
                <p>Items: {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <p className='text-sm sm:text-[15px]' >{currency} {order.amount}</p>
              <select 
              onChange={(e) => statusHandler(e, order._id)} 
              value={order.status}
               className='p-2 font-semibold'>
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Order