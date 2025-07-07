import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from './Title';

const CartTotal = () => {

    const {totalCartAmount, currency, delivery_fee} = useContext(ShopContext);
  return (
    <div className='w-full'>
        <div className="text-2xl">
            <Title text1={'CART'} text2={'TOTALS'}/>
        </div>
        <div className="flex flex-col gap-2 text-sm mt-2">
            <div className="flex justify-between">
                <p>SubTotal</p>
                <p>{currency} {totalCartAmount()}.00</p>
            </div>
            <hr />
            <div className="flex justify-between">
                <p>Shipping Fees</p>
                <p>{currency} {delivery_fee}.00</p>
            </div>
            <hr />
            <div className="flex justify-between">
                <p>Total Amount</p>
                <p>{currency} {totalCartAmount() === 0 ? 0 : totalCartAmount() + delivery_fee}.00</p>
            </div>
        </div>
    </div>
  )
}

export default CartTotal