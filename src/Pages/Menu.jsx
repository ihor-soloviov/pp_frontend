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

const url1 = `http://localhost:5656/api/menu.getCategories?token=${token}`;
const url = `http://localhost:5656/api/menu.getProducts?token=${token}&category_id=41&type=batchtickets`;

const Menu = () => {
  // get categories
  const getdata = () => {
    axios
      .get(url1, {
        headers: {
          'Access-Control-Allow-Origin': 'localhost',
          'Access-Control-Allow-Methods': 'GET, POST, PUT',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      })
      .then((res) => {
        const data = res.data.response;

        const filteredArr = data.filter((obj) =>
          obj.category_name.startsWith('onlineOrder:')
        );
        console.log('cat:', filteredArr);
      })
      .catch((err) => console.error(err));
  };
  const getdata2 = () => {
    axios
      .get(url, {
        headers: {
          'Access-Control-Allow-Origin': 'localhost',
          'Access-Control-Allow-Methods': 'GET, POST, PUT',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      })
      .then((res) => {
        const data = res.data;

        console.log('data:', data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    // getdata();
    // getdata2();
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
