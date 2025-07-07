import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../Component/Title';
import ListItem from '../Component/ListItem';

const Collection = () => {

  const { products, search, showSearch } = useContext(ShopContext);
  const [allProduct, setAllProduct] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');

  const Toggle = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setCategory(prev => [...prev, e.target.value])
    }
  }
  const ToggleSub = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  const Filter = () => {
    let itemCopy = products.slice();
    if(showSearch && search){
      itemCopy = itemCopy.filter(items => items.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (category.length > 0) {
      itemCopy = itemCopy.filter(items => category.includes(items.category));
    }
    if (subCategory.length > 0) {
      itemCopy = itemCopy.filter(item => subCategory.includes(item.subCategory));
    }
    setAllProduct(itemCopy);
  }

  const sortItem = () => {
    let fpCopy = allProduct.slice();

    switch (sortType) {
      case 'low-high':
        setAllProduct(fpCopy.sort((a, b) => (a.price - b.price)));
        break;

      case 'high-low':
        setAllProduct(fpCopy.sort((a, b) => (b.price - a.price)));
        break;

      default:
          Filter();
        break;
    }
  }

  useEffect(() => {
    Filter();

  }, [category, subCategory, search, showSearch, products])

  useEffect(() => {
    sortItem();

  }, [sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 boder-t'>

      {/* Filter Option */}
      <div className="min-w-60">
        <p onClick={() => setShowFilter(!showFilter)} className='flex items-center my-2 text-xl cursor-pointer gap-2'>FILTER
          <img src={assets.dropdown_icon} alt="Dropdown_icon" className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ""}`} />
        </p>

        {/* Category Options */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? " " : "hidden"} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGOIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Men'} onChange={Toggle} />Men
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Women'} onChange={Toggle} />Women
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Kids'} onChange={Toggle} />Kids
            </p>
          </div>
        </div>

        {/* SubCategories filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? " " : "hidden"} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Topwear'} onChange={ToggleSub} />Topwear
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Bottomwear'} onChange={ToggleSub} />Bottomwear
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Winterwear'} onChange={ToggleSub} />Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* Right Sides */}

      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title
            text1={'ALL'}
            text2={'COLLECTIONS'}
          />
          <select onChange={(e)=> setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relavent">Relevant</option>
            <option value="low-high">Low-High</option>
            <option value="high-low">High-Low</option>
          </select>
        </div>

        {/* All product find the help of map */}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {
            allProduct.map((item, Index) => (
              <ListItem
                key={Index}
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image}
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Collection