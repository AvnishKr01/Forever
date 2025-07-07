import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from './Title';
import ListItem from './ListItem';

const BestItem = () => {

    const {products} = useContext(ShopContext);

    const[bestItem, setBestItem] = useState([]);

    useEffect(()=>{
        const productItem = products.filter((currItm) => (currItm.bestseller));
        setBestItem(productItem.slice(0, 5));
    },[products])

  return (
    <div className='my-10'>
        <div className="text-center py-8 text-3xl">
        <Title text1={'BEST'} text2={'SELLERS'}/>
        <p className='w-3/4 m-auto text-xs sm:text-xs md:text-base text-gray-700'>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt sequi possimus veniam exercitationem rem corrupti illo. </p>
      </div>
      {/* Rendring Products */}

 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {
          bestItem.map((items, Index) => (
            <ListItem
            key={Index}
            id={items._id}
            name={items.name}
            price={items.price}
            image={items.image}
            />
          ))
        }
      </div>

    </div>
  )
}

export default BestItem