import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from './Title';
import ListItem from './ListItem';

const RelatedProduct = ({category, subCategory}) => {

    const {products } = useContext(ShopContext);
    const [related, setRelated] = useState([]);

    useEffect(() => {

        if(products.length > 0){
            let produtcCopy = products.slice();

            produtcCopy = produtcCopy.filter((items)=>(category === items.category));
            produtcCopy = produtcCopy.filter((items)=>(subCategory === items.subCategory));
            // console.log(produtcCopy.slice(0,5)); 
            setRelated(produtcCopy.slice(0,5))
        }

    },[products])


  return (
    <div className='my-24'>
        <div className="text-center text-3xl py-2">
            <Title text1={'RELATED'} text2={'PRODUCTS'}/>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
            {
                related.map((item, Index) => (
                    <ListItem 
                    key={Index}
                    image={item.image}
                    name={item.name}
                    price={item.price}
                    id={item._id}
                    />
                ))
            }
        </div>
    </div>
  )
}

export default RelatedProduct