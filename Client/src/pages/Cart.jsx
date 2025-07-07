import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from '../Component/Title';
import { assets } from '../assets/assets';
import CartTotal from '../Component/CartTotal';

const Cart = () => {

  const { products, currency, addCart, updateQuantityData, navigate} = useContext(ShopContext);
  const [cartDatas, setCartDatas] = useState([]);

  useEffect(() => {

    if (products.length > 0) {
      let tempData = [];
      for (const items in addCart) {
        for (const item in addCart[items]) {
          if (addCart[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: addCart[items][item],
            })
          }
        }
      }
      setCartDatas(tempData);
    }

  }, [addCart, products])


  return (
    <div className='border-t pt-14'>
      <div className="text-2xl mb-3">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>
      <div className="">
        {
          cartDatas.map((item, Index) => {
            const productItem = products.find((product) => product._id === item._id);
            return (
              <div key={Index} className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
                <div className="flex items-start gap-6">
                  <img src={productItem.image[0]} alt="" className='w-6 sm:w-20' />
                  <div className="">
                    <p className="text-sm sm:text-lg font-medium">{productItem.name}</p>
                    <div className="flex items-center gap-5 mt-2">
                      <p>{currency}{productItem.price}</p>
                      <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                    </div>
                  </div>
                </div>
                <input onChange={(e) => e.target.value === '' || e.target.value === 0 ? null : updateQuantityData(item._id, item.size, Number(e.target.value))} type="number" min={1} defaultValue={item.quantity} className='border max-w-10 sm:max-w-20 sm:px-1 px-2 ' />
                <img onClick={() => updateQuantityData(item._id, item.size, 0)} src={assets.bin_icon} alt="Bin_iocn" className='w-4 mr-4 sm:w-5 cursor-pointer' />
              </div>
            )
          })
        }
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button onClick={() => navigate('/placeholder')} className='bg-black text-white text-sm my-8 py-3 px-8'>PROSSED TO CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart