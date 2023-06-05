//Import React
import React, { useEffect, useState } from 'react';
//Impost styles
import './menu.scss';

//Import Components
import ProductCard from '../components/ProductCard/ProductCard';

//Import plug
import axios from 'axios';
import Container from '../components/Container/Container';
const token = '436783:670964579c5655f22513de1218a29b4d';

const proxy_url = `https://pelmeni-proxy.work-set.eu`;
// eslint-disable-next-line
const poster_url = 'https://polar-pelmeni-odessa.joinposter.com';

const Menu = () => {
  const [currentCatId, setCurrentCatId] = useState('41');
  const [catigories, setCatigories] = useState([]);
  const [products, setProducts] = useState([]);

  const getCategories = () => {
    axios
      .get(`${proxy_url}/api/menu.getCategories?token=${token}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',

          'Access-Control-Allow-Methods': 'GET, POST, PUT',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log('start');
        console.log(res);
        const data = res.data.response;

        const filteredCat = data.filter((obj) =>
          obj.category_name.startsWith('onlineOrder:')
        );
        const mapCat = filteredCat.map((el) => {
          return {
            category_name: el.category_name.replace(/onlineOrder: /, ''),
            category_id: el.category_id,
          };
        });

        setCatigories(mapCat);
      })
      .catch((err) => console.error(err));
  };
  const getPruducts = (id) => {
    axios
      .get(
        `${proxy_url}/api/menu.getProducts?token=${token}&category_id=${id}&type=batchtickets`,
        {
          headers: {
            'Access-Control-Allow-Origin': 'localhost',
            'Access-Control-Allow-Methods': 'GET, POST, PUT',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        }
      )
      .then((res) => {
        const data = res.data.response;

        setProducts(data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getPruducts(currentCatId);
  }, [currentCatId]);

  return (
    <Container>
      <div className='categories'>
        <div className='categories__list'>
          {catigories.map((cat) => {
            return (
              <button
                key={cat.category_id}
                className={`categories__btn ${
                  currentCatId === cat.category_id
                    ? 'categories__btn-active'
                    : ''
                }`}
                onClick={() => setCurrentCatId(cat.category_id)}
              >
                {cat.category_name}
              </button>
            );
          })}
        </div>
      </div>
      <div className='menu__products'>
        {products.map((product) => {
          return (
            <ProductCard
              preview={poster_url + product.photo}
              name={product.product_name}
              price={parseInt(product.price[1].slice(0, -2))}
              ingredients={product.ingredients}
              weight={product.out}
              key={product.product_id}
              id={product.product_id}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default Menu;
