import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import {Link} from 'react-router-dom';

const ListItem = ({id, image, name, price}) => {

    const { currency } = useContext(ShopContext);
    return (
       <>
       <Link key={id} to={`/product/${id}`} className='text-gray-700 cursor-pointer'>
       <div className="overflow-hidden">
        <img src={image[0]} alt="Item_img" className='hover:scale-110 transition ease-in-out'/>
       </div>
       <p className='pt-3 pb-1 text-sm'>{name}</p>
       <p className='text-sm font-medium'>{currency}{price}</p>
       </Link>
       </>
    )
}

export default ListItem