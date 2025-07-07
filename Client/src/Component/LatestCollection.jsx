import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../Context/ShopContext';
import Title from './Title';
import { useState } from 'react';
import ListItem from './ListItem';

const LatestCollection = () => {

    const {products} = useContext(ShopContext);


    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(()=> {
      setLatestProducts(products.slice(0, 10));
    },[products])
    

  return (
    <div className='my-10'>
      <div className="text-center py-8 text-3xl">
        <Title text1={'LATEST'} text2={'COLLECTIONS'}/>
        <p className='w-3/4 m-auto text-xs sm:text-xs md:text-base text-gray-700'>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt sequi possimus veniam exercitationem rem corrupti illo. </p>
      </div>

      {/* Rendring Products */}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {
          latestProducts.map((item, Index) => (
            <ListItem 
            key={Index}
            id={item._id}
            image={item.image}
            price={item.price}
            name={item.name}
            />
            
          ))
        }
      </div>
    </div>
  )
}

export default LatestCollection