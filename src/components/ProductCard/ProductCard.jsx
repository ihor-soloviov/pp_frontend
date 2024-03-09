//Import React
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { url } from '../../api';

import classNames from 'classnames';
import { addToCartHandler } from '../../utils/menu';
import { sendFavsToServer } from '../../utils/favorites';

import { observer } from 'mobx-react-lite';
import userStore from '../../store/user-store';
import popupActionsStore from '../../store/popup-action-store';
import { AnimatePresence, motion } from 'framer-motion';
import Popup from '../Popup/Popup';
import ModificatorsPopup from '../../Pages/ProductPage/ModificatorsPopup';

import './productCard.scss';
import { dropInProducts } from '../../utils/animation';

const ProductCard = observer(({ product }) => {
  const { token, favoritProducts, removeFromFavorit, addToFavorit } = userStore;
  const { out, ingredients, price, product_id, product_name, group_modifications } = product;

  const { setActions } = popupActionsStore;

  const [count, setCount] = useState(1);
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const [selectedModificators, setSelectedModificators] = useState([]);

  const addProductToCart = () => {
    const productWithMods = { ...product, mods: selectedModificators };
    console.log(productWithMods);
    addToCartHandler(productWithMods, count);
    setIsPopupOpened(false);
    setSelectedModificators([]);
  };

  const handleModPopup = () => setIsPopupOpened((prev) => !prev);

  const isItemFavourite = () => {
    if (favoritProducts) {
      return favoritProducts.some((el) => el.product_id === product_id);
    }
  };

  const handleFavorite = () => {
    if (isItemFavourite()) {
      removeFromFavorit(product_id);
    } else {
      setActions('addToFavorit');
      setTimeout(() => {
        setActions('');
      }, 2000);

      addToFavorit({
        product_name,
        price,
        out,
        product_id,
        ingredients,
      });

      sendFavsToServer(token, favoritProducts);
    }
  };

  return (
    <React.Fragment>
      <AnimatePresence>
        {isPopupOpened && group_modifications && (
          <Popup closeModal={handleModPopup}>
            <ModificatorsPopup
              groups={group_modifications}
              setSelectedModificators={setSelectedModificators}
              addProductToCart={addProductToCart}
            />
          </Popup>
        )}
      </AnimatePresence>
      <motion.div
        variants={dropInProducts}
        initial='hidden'
        animate='visible'
        exit='exit'
        className='product'
      >
        <div className='product__cta'>
          <div
            className={classNames('product__like', {
              'product__like-active': isItemFavourite(),
            })}
            onClick={() => handleFavorite()}
          >
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
          <Link to={`/product/${product_id}`}>
            <img src={`${url}/api/sendImage/${product_id}`} alt={product_name} />
          </Link>
          <button
            className='product__addToCard'
            onClick={() =>
              group_modifications?.length ? setIsPopupOpened(true) : addProductToCart()
            }
          >
            В кошик
          </button>
        </div>
        <div className='product__info'>
          <p className='product__weight'>{out} г</p>
          <h4 className='product__name'>{product_name}</h4>
          {ingredients.length !== 0 && (
            <p className='product__composition'>{ingredients.join(', ')}</p>
          )}
        </div>
        <div className='product__order'>
          <div className='product__price'>
            <div className='product__total-price'>{price * count} ₴</div>
          </div>
          <div className='counter'>
            <div
              className='counter__btn minus'
              onClick={() => {
                if (count > 1) {
                  setCount(count - 1);
                }
              }}
            >
              -
            </div>
            <div className='counter__value '>{count}</div>
            <div className='counter__btn plus' onClick={() => setCount(count + 1)}>
              +
            </div>
          </div>
        </div>
      </motion.div>
    </React.Fragment>
  );
});

export default ProductCard;
