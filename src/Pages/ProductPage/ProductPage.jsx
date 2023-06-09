//Import React
import React, { useEffect, useState } from 'react';

//Import components
import Container from '../../components/Container/Container';

//Import styles
import './ProductPage.scss';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import ArrowBtn from '../../components/ArrowBtn/ArrowBtn';
const proxy_url = `http://localhost:5656/`;
const token = '436783:670964579c5655f22513de1218a29b4d';
const ProductPage = () => {
  const { id } = useParams();

  const [count, setCount] = useState(1);

  const [product, setProduct] = useState(null);
  const [recommendationsProducts, setRecommendationsProducts] = useState(null);

  useEffect(() => {
    axios
      .get(`${proxy_url}api/menu.getProduct?token=${token}&product_id=${id}`)
      .then((res) => {
        console.log(res.data.response);
        setProduct(res.data.response);
        axios
          .get(
            `${proxy_url}/api/menu.getProducts?token=${token}&category_id=${res.data.response.menu_category_id}&type=batchtickets`
          )
          .then((res) => setRecommendationsProducts(res.data.response));
      });
  }, [id]);

  if (product !== null) {
    return (
      <div>
        <div className='product-page'>
          <Container>
            <div className='product-page__content'>
              <div className='product-page__preview'>
                <img src={proxy_url + product.photo_origin} alt='' />
              </div>
              <div className='product-page__info'>
                <p className='product-page__weight text text__color--secondary'>
                  {product.cost} г
                </p>
                <h1 className='product-page__title text__color--secondary'>
                  {product.product_name}
                </h1>
                {product.group_modifications && (
                  <p className='product-page__desc text__color--secondary'>
                    {product.group_modifications.map((el, index) => {
                      if (product.group_modifications.length === index + 1) {
                        return `${el.name}`;
                      } else {
                        return `${el.name}, `;
                      }
                    })}
                  </p>
                )}

                <p className='product-page__price text-price text__color--secondary'>
                  {parseInt(product.price[1].slice(0, -2))} ₴
                </p>

                <div className='product-page__order'>
                  <button
                    className='btn btn-main'
                    onClick={() => console.log('go to cart')}
                  >
                    Додати в кошик (
                    {parseInt(product.price[1].slice(0, -2)) * count} ₴)
                  </button>
                  <div className='counter'>
                    <div
                      className='counter__btn counter__btn--transperent'
                      onClick={() => {
                        if (count > 1) {
                          setCount(count - 1);
                        }
                      }}
                    >
                      -
                    </div>
                    <div className='counter__value text__color--secondary'>
                      {count}
                    </div>
                    <div
                      className='counter__btn counter__btn--transperent'
                      onClick={() => setCount(count + 1)}
                    >
                      +
                    </div>
                  </div>
                </div>

                {product.group_modifications && (
                  <>
                    <h6 className='product-page__compile-title title__h6 text__color--secondary'>
                      Склад
                    </h6>
                    <ul className='product-page__compile'>
                      {product.group_modifications.map((el) => {
                        return (
                          <li className='product-page__compile-item'>
                            {el.name}
                          </li>
                        );
                      })}
                    </ul>
                  </>
                )}
              </div>
            </div>
            <div className='product-page__recommendations'>
              <div className='product-page__recommendations-head'>
                <h3 className='title__h3'>Рекомендуємо спробувати</h3>
                <div className='product-page__recommendations-arrows'>
                  <ArrowBtn direction={'left'} />
                  <ArrowBtn direction={'right'} />
                </div>
              </div>

              {recommendationsProducts !== null && (
                <div className='product-page__recommendations-track'>
                  <div className='product-page__recommendations-list'>
                    {recommendationsProducts.map((product) => {
                      return (
                        <ProductCard
                          preview={proxy_url + product.photo}
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
                </div>
              )}
            </div>
          </Container>
        </div>
      </div>
    );
  }
};

export default ProductPage;
