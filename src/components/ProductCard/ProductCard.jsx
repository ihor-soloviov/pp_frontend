//Import React
import React, { useState } from 'react';

//Import Styles
import './productCard.scss';

const ProductCard = (props) => {
  const [count, setCount] = useState(1);

  return (
    <div className='product'>
      <div className='product__preview'>
        <img src={props.preview} alt={props.name} />
        <button className='product__addToCard'>В кошик</button>
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
          <div className='counter__btn' onClick={() => setCount(count + 1)}>+</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
