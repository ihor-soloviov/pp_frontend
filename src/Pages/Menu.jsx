//Import React
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import menuStore from '../store/menu-store';
import { LazyMotion, domAnimation, m } from 'framer-motion';
//Import Components
import ProductCard from '../components/ProductCard/ProductCard';
import { Categories } from '../components/Categories/Categories';

//Impost styles
import './menu.scss';
import { Loading } from '../components/Loading/Loading';
import { dropInProducts } from '../utils/animation';

const Menu = observer(() => {
  const [products, setProducts] = useState(null);

  const { setProductsByCategoryId } = menuStore;

  useEffect(() => {
    if (products?.length) {
      setProductsByCategoryId(products);
    }
  }, [products, setProductsByCategoryId]);

  return (
    <React.Fragment>
      <div className='categories' id='menu'>
        <h1 className='title__h1'>Куштуй тільки найсмачніше</h1>
        <Categories setProducts={setProducts} />
      </div>

      {products ? (
        <LazyMotion features={domAnimation}>
          <div className='menu__products'>
            {products.map((product) => {
              if (product.spots[0].visible !== '0') {
                return (
                  <m.div
                    variants={dropInProducts}
                    initial='hidden'
                    animate='visible'
                    exit='exit' key={product.product_id}>
                    <ProductCard product={product} />
                  </m.div>
                )
              }
            })}
          </div>
        </LazyMotion>
      ) : (
        <Loading />
      )}
    </React.Fragment>
  );
});

export default Menu;
