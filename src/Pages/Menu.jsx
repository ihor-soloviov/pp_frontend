//Import React
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import menuStore from '../store/menu-store';
//Import Components
import { Categories } from '../components/Categories/Categories';

//Impost styles
import './menu.scss';
import { Loading } from '../components/Loading/Loading';
import { LazyMotion, domAnimation } from 'framer-motion';
import MenuProducts from './MenuProducts';

const Menu = observer(() => {
  const [products, setProducts] = useState(null);

  const { setProductsByCategoryId } = menuStore;

  useEffect(() => {
    console.log(products)
    if (products?.length) {
      setProductsByCategoryId(products);
    }
  }, [products, setProductsByCategoryId]);

  return (
    <React.Fragment>
      <div className='categories' id='menu'>
        <h1 className='title__h1'>Куштуй тільки найсмачніше</h1>
        <LazyMotion features={domAnimation}>
          <Categories setProducts={setProducts} />
        </LazyMotion>
      </div>

      {products
        ? <LazyMotion features={domAnimation}><MenuProducts products={products} /></LazyMotion>
        : <Loading />
      }
    </React.Fragment>
  );
});

export default Menu;
