//Import React
import React, { useEffect } from 'react';
//Impost styles
import './menu.scss';

//Import Components
import ProductCard from '../components/ProductCard/ProductCard';

//Import plug
import plug from '../assets/plug.jpg';
import axios from 'axios';
import Container from '../components/Container/Container';
const token = '436783:670964579c5655f22513de1218a29b4d';
const url1 = `http://localhost:5656/api/menu.getCategories?token=${token}&fiscal=0`;
const url = `http://localhost:5656/api/menu.getProducts?token=${token}&category_id=30&type=batchtickets`;

const Menu = () => {
  const getdata = () => {
    axios
      .get(url, {
        headers: {
          'Access-Control-Allow-Origin': 'localhost',
          'Access-Control-Allow-Methods': 'GET, POST, PUT',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      })
      .then((res) => {
        console.log('prod:', res.data);
      })
      .catch((err) => console.error(err));
  };
  const getdata1 = () => {
    axios
      .get(url1, {
        headers: {
          'Access-Control-Allow-Origin': 'localhost',
          'Access-Control-Allow-Methods': 'GET, POST, PUT',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    getdata1();
    getdata();
  }, []);

  return (
    <Container>
      <div className='menu__products'>
        <ProductCard
          preview={plug}
          name={'Французькі пельмені'}
          price={'235'}
          weight={'200'}
          composition={'Рікотта, трюфель, волоський горіх, оливкова олія. '}
        />
        <ProductCard
          preview={plug}
          name={'Французькі пельмені'}
          price={'235'}
          weight={'200'}
          composition={'Рікотта, трюфель, волоський горіх, оливкова олія. '}
        />
        <ProductCard
          preview={plug}
          name={'Французькі пельмені'}
          price={'235'}
          weight={'200'}
          composition={'Рікотта, трюфель, волоський горіх, оливкова олія. '}
        />
        <ProductCard
          preview={plug}
          name={'Французькі пельмені'}
          price={'235'}
          weight={'200'}
          composition={'Рікотта, трюфель, волоський горіх, оливкова олія. '}
        />
        <ProductCard
          preview={plug}
          name={'Французькі пельмені'}
          price={'235'}
          weight={'200'}
          composition={'Рікотта, трюфель, волоський горіх, оливкова олія. '}
        />
        <ProductCard
          preview={plug}
          name={'Французькі пельмені'}
          price={'235'}
          weight={'200'}
          composition={'Рікотта, трюфель, волоський горіх, оливкова олія. '}
        />
        <ProductCard
          preview={plug}
          name={'Французькі пельмені'}
          price={'235'}
          weight={'200'}
          composition={'Рікотта, трюфель, волоський горіх, оливкова олія. '}
        />
        <ProductCard
          preview={plug}
          name={'Французькі пельмені'}
          price={'235'}
          weight={'200'}
          composition={'Рікотта, трюфель, волоський горіх, оливкова олія. '}
        />{' '}
        <ProductCard
          preview={plug}
          name={'Французькі пельмені'}
          price={'235'}
          weight={'200'}
          composition={'Рікотта, трюфель, волоський горіх, оливкова олія. '}
        />
      </div>
    </Container>
  );
};

export default Menu;
