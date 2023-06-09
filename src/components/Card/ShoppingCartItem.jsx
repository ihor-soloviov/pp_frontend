import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeProduct, updateCount } from '../../store/shoppingCartSlice';

const ShoppingCartItem = ({ preview, name, weight, price, count, id }) => {
  const [currentCount, setCurrentCount] = useState(count);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateCount({ id: id, count: currentCount }));
  }, [currentCount]);

  return (
    <li className='shopping-cart__item'>
      <div className='shopping-cart__preview'>
        <img src={preview} alt='' />
      </div>
      <div className='shopping-cart__info'>
        <div className='shopping-cart__row'>
          <h6 className='title__h8'>{name}</h6>
          <div
            className='shopping-cart__remove'
            onClick={() => dispatch(removeProduct({ id: id }))}
          >
            <svg
              width='12'
              height='12'
              viewBox='0 0 12 12'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M6.0006 4.82144L10.1256 0.696442L11.3039 1.87478L7.17893 5.99977L11.3039 10.1248L10.1256 11.3031L6.0006 7.17811L1.8756 11.3031L0.697266 10.1248L4.82227 5.99977L0.697266 1.87478L1.8756 0.696442L6.0006 4.82144Z'
                fill='#49484D'
              />
            </svg>
          </div>
        </div>

        <p className='shopping-cart__weight'>{weight} г</p>
        <div className='shopping-cart__row'>
          <p className='shopping-cart__price'>{price} ₴</p>
          <div className='counter'>
            <div
              className='counter__btn counter__btn--light'
              onClick={() => {
                if (count > 1) {
                  setCurrentCount(count - 1);
                }
              }}
            >
              -
            </div>
            <div className='counter__value'>{currentCount}</div>
            <div
              className='counter__btn counter__btn--light'
              onClick={() => setCurrentCount(count + 1)}
            >
              +
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ShoppingCartItem;
