//Import React
import React, { useEffect, useState } from 'react';

//Import components
import Container from '../../components/Container/Container';
import Loader from '../../components/Loader/Loader';
//Import styles
import './ProductPage.scss';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import ArrowBtn from '../../components/ArrowBtn/ArrowBtn';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../store/shoppingCartSlice';
import { setActions } from '../../store/popupActionsSlice';
import { url } from '../../api';
const proxy_url = `https://polar-pelmeni-odessa.joinposter.com`;
const token = '436783:670964579c5655f22513de1218a29b4d';
const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [count, setCount] = useState(1);
  const [inCart, setInCart] = useState(false);

  const [product, setProduct] = useState(null);
  const [productIngredients, setProductIngredients] = useState(null);
  const [recommendationsProducts, setRecommendationsProducts] = useState(null);

  useEffect(() => {
    if (product) {
      const str = product.product_production_description;
      const arr = str.split(', ');
      setProductIngredients(arr);
    }
  }, [product]);

  useEffect(() => {
    const data = {
      productId: id,
    };

    const dataJSON = JSON.stringify(data);
    axios
      .post(`${url}/api/product`, dataJSON, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log('pp', res);
        setProduct(res.data.response);
        const menu_category_id = JSON.stringify({
          categoryId: res.data.response.menu_category_id,
        });
        axios
          .post(`${url}/api/products`, menu_category_id, {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
            },
          })
          .then((res) => {
            const resData = res.data.response;
            const dataMap = resData.map((item) => {
              return {
                photo: item.photo_origin,
                product_name: item.product_name,
                price: item.price,
                out: item.out,
                product_id: item.product_id,
                ingredients: item.product_production_description,
              };
            });
            setRecommendationsProducts(dataMap);
          });
      })
      .catch((err) => console.error(err));
  }, [id]);
  const cart = useSelector((state) => state.shoppingCart.products);

  useEffect(() => {
    if (cart) {
      if (cart.some((el) => el.id == id)) {
        setInCart(true);
      } else {
        setInCart(false);
      }
    }
  }, [cart, id]);

  if (product !== null && product !== false) {
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
                  {inCart === true ? (
                    <button
                      className='btn btn-main'
                      onClick={() => {}}
                      disabled
                    >
                      <svg
                        width='16'
                        height='16'
                        viewBox='0 0 16 16'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                        style={{ marginRight: 6 }}
                      >
                        <path
                          d='M6.66715 10.1138L12.7954 3.9856L13.7382 4.9284L6.66715 11.9994L2.4245 7.75685L3.36731 6.81405L6.66715 10.1138Z'
                          fill='#92939A'
                        />
                      </svg>
                      Додано до кошику
                    </button>
                  ) : (
                    <button
                      className='btn btn-main'
                      onClick={() => {
                        dispatch(
                          addProduct({
                            name: product.product_name,
                            price: parseInt(product.price[1].slice(0, -2)),
                            count: count,
                            preview: proxy_url + product.photo_origin,
                            weight: product.cost,
                            id: id,
                          })
                        );
                        dispatch(setActions({ action: 'addToCard' }));
                        setTimeout(() => {
                          dispatch(setActions({ action: '' }));
                        }, 2000);
                      }}
                    >
                      Додати в кошик (
                      {parseInt(product.price[1].slice(0, -2)) * count} ₴)
                    </button>
                  )}

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

                {product.product_production_description && (
                  <>
                    <h6 className='product-page__compile-title title__h6 text__color--secondary'>
                      Склад
                    </h6>
                    <ul className='product-page__compile'>
                      {productIngredients &&
                        productIngredients.map((el) => {
                          return (
                            <li className='product-page__compile-item'>{el}</li>
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
                          preview={
                            `https://polar-pelmeni-odessa.joinposter.com` +
                            product.photo
                          }
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
  } else {
    return (
      <div className='loader__wrapper'>
        <Loader />
      </div>
    );
  }
};

export default ProductPage;
