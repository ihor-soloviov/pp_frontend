//Import React
import React, { useState } from 'react';

//Import Styles
import './productCard.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../store/shoppingCartSlice';

const ProductCard = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [count, setCount] = useState(1);
  const [liked, setLiked] = useState(false);

  return (
    <div className='product'>
      <div className='product__cta'>
        <div className={`product__like ${liked && 'product__like-active'}`} onClick={() => setLiked(!liked)}>
          <svg
            width='16'
            height='16'
            viewBox='0 0 16 16'
            fill='transparent'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M8.5097 3.13486L7.99967 3.68282L7.48964 3.13486C6.08123 1.62171 3.79773 1.62171 2.38932 3.13486C0.980904 4.648 0.980904 7.10129 2.38932 8.61444L6.97961 13.5461C7.54297 14.1513 8.45637 14.1513 9.01974 13.5461L13.61 8.61444C15.0184 7.10129 15.0184 4.648 13.61 3.13486C12.2016 1.62171 9.91812 1.62171 8.5097 3.13486Z'
              stroke='white'
              strokeWidth='1.5'
              strokeLinejoin='round'
            />
          </svg>
        </div>
      </div>
      <div className='product__preview'>
        <img
          src={props.preview}
          alt={props.name}
          onClick={() => navigate(`/product/${props.id}`)}
        />
        <button
          className='product__addToCard'
          onClick={() => {
            dispatch(
              addProduct({
                name: props.name,
                price: props.price,
                count: count,
                preview: props.preview,
                weight: props.weight,
              })
            );
          }}
        >
          В кошик
        </button>
      </div>
      <div className='product__info'>
        <p className='product__weight'>{props.weight} г</p>
        <h4 className='product__name'>{props.name}</h4>
        <p className='product__composition'>
          {props.ingredients.map((ing, index) => {
            if (props.ingredients.length === index + 1) {
              return `${ing.ingredient_name}`;
            } else {
              return `${ing.ingredient_name}, `;
            }
          })}
        </p>
      </div>
      <div className='product__order'>
        <div className='product__price'>
          <div className='product__total-price'>{props.price * count} ₴</div>
        </div>
        <div className='counter'>
          <div
            className='counter__btn'
            onClick={() => {
              if (count > 1) {
                setCount(count - 1);
              }
            }}
          >
            -
          </div>
          <div className='counter__value'>{count}</div>
          <div className='counter__btn' onClick={() => setCount(count + 1)}>
            +
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
