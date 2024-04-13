import React, { useEffect } from 'react'
import ProductCard from '../components/ProductCard/ProductCard';
import { useLocation } from 'react-router-dom';

const MenuProducts = React.memo(({ products }) => {
  const location = useLocation()



  return (
    <div className='menu__products'>
      {products.map((product) => {
        if (product.spots[0].visible !== '0') {
          return (
            <React.Fragment key={product.product_id}>
              <ProductCard product={product} />
            </React.Fragment>
          )
        }
      })}
    </div>
  )
})
export default MenuProducts
