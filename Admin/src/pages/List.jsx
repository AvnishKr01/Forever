import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react'
import { backendUrl, currency,  } from '../App';
import { toast } from 'react-toastify';
import { MdDeleteOutline } from "react-icons/md";

const List = ({token}) => {

  const [list, setList] = useState([]);

  const fecthList = async () => {

    try {
      const response = await axios.get(`${backendUrl}/api/product/list`, {headers: {token}});
      console.log(response);
      // setList(response.data.product);
      
      if (response.data.success) {
        setList(response.data.product);
        // console.log(list);
        
      }
      else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(`${backendUrl}/api/product/remove`, {id}, {headers:{token}})
      if(response.data.success){
        toast.success(response.data.message);
        await fecthList();
      }
      else{
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fecthList()
  }, [])

  return (
    <>
      <p className='mb-2'>All Product List</p>
      <div className="flex flex-col gap-2">

        {/* {List Tabel Title} */}

        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border border-gray-300 bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Categroy</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/* {Product List} */}
        {
          list.map((currItem, Index) => {
            return(
            <div className="grid grid-col-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border border-gray-200 text-md" key={Index}>
              <img className='w-12' src={currItem.image[0]} alt="image" />
              <p>{currItem.name}</p>
              <p>{currItem.category}</p>
              <p>{currency} {currItem.price}</p>
              <p onClick={()=> removeProduct(currItem._id)}className='text-right md:flex items-center justify-center cursor-pointer text-lg'><MdDeleteOutline className='w-6 h-8' /></p>
            </div>)
          })
        }
      </div>
    </>
  )
}

export default List