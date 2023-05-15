//Import React
import React from 'react';

//Import Styles
import './productCard.scss';

const ProductCard = (props) => {
  return (
    <div className='product'>
      <div className='product__preview'>
        <img src={props.preview} alt={props.name} />
        <button className='product__addToCard'>В кошик</button>
      </div>
      <div className='product__info'>
        <p className='product__weight'>{props.weight} г</p>
        <h4 className='product__name'>{props.name}</h4>
        <p className='product__composition'>{props.composition}</p>
      </div>
      <div className='product__price'>
        <div className='product__total-price'>{props.price} ₴</div>
      </div>
    </div>
  );
};

export default ProductCard;
