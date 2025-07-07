import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../Context/ShopContext'
import {useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Verify = () => {

    const {token, navigate, setAddCart, BackendUrl} = useContext(ShopContext);
    const [searchParams, setSearchParams] = useSearchParams();

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    const verifyPayment = async () => {
        try {
            if(!token){
                return null;
            }

            const response = await axios.post(`${BackendUrl}/api/order/verifystripe`, {orderId, success}, {headers: {token}})
            if(response.data.success){
                setAddCart({})
                navigate('/order')
            }else{
                navigate('/cart')
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        verifyPayment();
    },[token])
  return (
    <div>Verify</div>
  )
}

export default Verify