import React from 'react'
import ProductCard from '../components/ProductCard/ProductCard';

const MenuProducts = React.memo(({ products }) => {
  return (
    <section className='menu__products'>
      {products.map(product => {
        if (product.spots[0].visible !== '0') {
          return (
            <React.Fragment key={product.product_id}>
              <ProductCard product={product} />
            </React.Fragment>
          )
        } else {
          return null
        }
      })}
    </section>
  )
})
export default MenuProducts
