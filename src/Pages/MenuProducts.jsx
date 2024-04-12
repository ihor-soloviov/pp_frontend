import React from 'react'
import { dropInProducts } from '../utils/animation';
import { m, AnimatePresence } from "framer-motion";
import ProductCard from '../components/ProductCard/ProductCard';

const MenuProducts = ({ products }) => {
  return (
    <AnimatePresence>
      <m.div
        variants={dropInProducts}
        initial='hidden'
        animate='visible'
        exit='exit' className='menu__products'>
        {products.map((product) => {
          if (product.spots[0].visible !== '0') {
            return (
              <React.Fragment key={product.product_id}>
                <ProductCard product={product} />
              </React.Fragment>
            )
          }
        })}
      </m.div>
    </AnimatePresence>
  )
}

export default MenuProducts
