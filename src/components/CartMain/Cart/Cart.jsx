import React from 'react';
import { useNavigate } from 'react-router-dom';
import ShoppingCartItem from '../ShoppingCartItem';
import { begin_checkout } from '../../../gm4';
import shoppingCartStore from '../../../store/shoping-cart-store';
import BtnMain from '../../Buttons/BtnMain';
import { useEffect } from 'react';
import { dropInCart } from '../../../utils/animation';
import { motion } from 'framer-motion';
import { observer } from 'mobx-react-lite';

export const Cart = observer(({ isOpen, setIsOpen, setError }) => {
  const { cartItems, totalPrice, deliveryPrice, itemCount } = shoppingCartStore;
  const navigate = useNavigate();

  const makeAnOrderClick = () => {
    if (totalPrice < 200) {
      setError(true);
      setTimeout(() => setError(false), 3000);
    } else {
      begin_checkout(cartItems);
      navigate('/order');
      setIsOpen(!isOpen);
    }
  };

  useEffect(() => {
    const handleCloseModal = (event) => {
      if (!event.target.closest('.shopping-cart')) {
        setIsOpen(false);
      }
    };

    const handleKeyPress = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleCloseModal);
      document.addEventListener('keydown', handleKeyPress);
    }

    return () => {
      document.removeEventListener('mousedown', handleCloseModal);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isOpen, setIsOpen]);
  return (
    <motion.div
      key={cartItems.cartItemId}
      variants={dropInCart}
      initial='hidden'
      animate='visible'
      exit='exit'
      className='shopping-cart'
    >
      <div className='shopping-cart__close' onClick={() => setIsOpen(!isOpen)}>
        <svg
          width='14'
          height='14'
          viewBox='0 0 14 14'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M7.00072 5.58599L11.9507 0.635986L13.3647 2.04999L8.41472 6.99999L13.3647 11.95L11.9507 13.364L7.00072 8.41399L2.05072 13.364L0.636719 11.95L5.58672 6.99999L0.636719 2.04999L2.05072 0.635986L7.00072 5.58599Z'
            fill='#12130F'
          />
        </svg>
      </div>
      {itemCount === 0 ? (
        <React.Fragment>
          <div className='shopping-cart__content shopping-cart__content--empty'>
            <div className='shopping-cart__logo'>
              <svg
                width='150'
                height='150'
                viewBox='0 0 150 150'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <circle cx='75' cy='75' r='75' fill='#DF643A' />
                <path
                  d='M104.417 49.7177C103.7 48.0744 102.369 46.7544 100.713 46.0423C99.8503 45.6723 98.9013 45.4646 97.9036 45.4646C96.9059 45.4646 95.9564 45.6723 95.0947 46.0423C93.5267 46.7157 92.257 47.9383 91.5175 49.4609C89.7975 48.17 87.9197 47.0765 85.9157 46.2159C82.611 44.7957 78.9753 44 75.152 44C71.3282 44 67.6919 44.7957 64.389 46.2136C62.2983 47.1118 60.3471 48.2673 58.5668 49.6323C57.8411 48.0288 56.5318 46.7413 54.9048 46.0423C54.043 45.6723 53.0935 45.4646 52.0958 45.4646C51.0981 45.4646 50.1492 45.6723 49.2869 46.0423C47.6299 46.7544 46.2995 48.0744 45.5823 49.7177C45.2094 50.5732 45 51.5146 45 52.5051C45 53.4949 45.2088 54.4364 45.5823 55.2919C46.2995 56.9357 47.6299 58.2557 49.2869 58.9672C49.7103 59.1494 50.1561 59.2905 50.6173 59.389C50.4727 59.689 50.3293 59.9895 50.1956 60.2952C48.7642 63.5744 47.9621 67.182 47.9621 70.9757V106C48.6971 105.524 49.436 105.055 50.1956 104.616C57.5433 100.389 66.0654 97.9543 75.1538 97.9543C78.9753 97.9543 82.6127 97.158 85.9157 95.7395C92.2639 93.013 97.362 87.9551 100.11 81.6568C101.542 78.3782 102.343 74.7712 102.343 70.978C102.343 67.1843 101.54 63.5766 100.11 60.2975C99.9662 59.9667 99.8112 59.6417 99.654 59.3179C100.018 59.2251 100.373 59.1129 100.713 58.9672C102.369 58.2557 103.7 56.9357 104.417 55.2919C104.791 54.4364 105 53.4949 105 52.5051C105 51.5146 104.79 50.5732 104.417 49.7177Z'
                  fill='white'
                />
                <path
                  d='M104.417 49.7177C103.7 48.0744 102.369 46.7544 100.713 46.0423C99.8503 45.6723 98.9013 45.4646 97.9036 45.4646C96.9059 45.4646 95.9564 45.6723 95.0947 46.0423C93.5267 46.7157 92.257 47.9383 91.5175 49.4609C89.7975 48.17 87.9197 47.0766 85.9157 46.2159C82.611 44.7957 78.9753 44 75.152 44C71.3282 44 67.6919 44.7958 64.389 46.2136C62.2983 47.1118 60.3471 48.2673 58.5668 49.6323C57.8411 48.0288 56.5318 46.7413 54.9048 46.0423C54.043 45.6723 53.0935 45.4646 52.0958 45.4646C51.0981 45.4646 50.1492 45.6723 49.2869 46.0423C47.6299 46.7544 46.2995 48.0744 45.5823 49.7177C45.2094 50.5732 45 51.5146 45 52.5051C45 53.4949 45.2088 54.4364 45.5823 55.2919C46.2995 56.9357 47.6299 58.2557 49.2869 58.9672C49.7103 59.1494 50.1561 59.2905 50.6173 59.389C50.4727 59.689 50.3293 59.9895 50.1956 60.2952C48.7642 63.5744 47.9621 67.182 47.9621 70.9757V106C48.6971 105.524 49.436 105.055 50.1956 104.616C57.5433 100.389 66.0654 97.9543 75.1538 97.9543C78.9753 97.9543 82.6127 97.158 85.9157 95.7395C92.2639 93.013 97.362 87.9551 100.11 81.6568C101.542 78.3782 102.343 74.7712 102.343 70.978C102.343 67.1843 101.54 63.5766 100.11 60.2975C99.9662 59.9667 99.8112 59.6417 99.654 59.3179C100.018 59.2251 100.373 59.1129 100.713 58.9672C102.369 58.2557 103.7 56.9357 104.417 55.2919C104.791 54.4364 105 53.4949 105 52.5051C105 51.5146 104.79 50.5732 104.417 49.7177Z'
                  stroke='#12130F'
                  strokeWidth='3'
                  strokeMiterlimit='10'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M61.158 65.5436C61.158 64.1616 60.0289 63.0414 58.6359 63.0414C57.2424 63.0414 56.1133 64.1616 56.1133 65.5436C56.1133 66.9257 57.2424 68.0459 58.6359 68.0459C60.0289 68.0459 61.158 66.9257 61.158 65.5436Z'
                  fill='#12130F'
                />
                <path
                  d='M94.4237 65.5436C94.4237 64.1616 93.2946 63.0414 91.9016 63.0414C90.508 63.0414 89.3789 64.1616 89.3789 65.5436C89.3789 66.9257 90.508 68.0459 91.9016 68.0459C93.2946 68.0459 94.4237 66.9257 94.4237 65.5436Z'
                  fill='#12130F'
                />
                <path
                  d='M73.9113 81.7154C74.641 82.617 76.0243 82.617 76.7541 81.7154L79.0937 78.8239L80.4758 77.1151C81.4328 75.9317 80.5837 74.1752 79.0541 74.1752H75.3329H71.6112C70.0816 74.1752 69.2325 75.9317 70.1895 77.1151L71.5716 78.8239L73.9113 81.7154Z'
                  fill='#12130F'
                />
                <path d='M74.7617 86.2998H75.7577V80.0659H74.7617V86.2998Z' fill='#12130F' />
                <path
                  d='M72.3765 85.0177C72.9405 85.4088 73.4322 85.6239 73.8934 85.7463C74.3536 85.867 74.7856 85.9012 75.2624 85.9063C75.7391 85.8989 76.1706 85.8647 76.6301 85.7446C77.0902 85.6222 77.5825 85.4077 78.1482 85.0177C78.2377 85.7139 77.886 86.4191 77.3209 86.899C76.7512 87.3839 75.9761 87.6162 75.2624 87.6133C74.5486 87.6139 73.7747 87.3817 73.205 86.8973C72.6404 86.4168 72.2893 85.7127 72.3765 85.0177Z'
                  fill='#12130F'
                />
              </svg>
            </div>
            <h5 className='title__h5'>Нажаль, кошик порожній</h5>
            <p className='text'>Додайте щось смачненьке</p>
          </div>
        </React.Fragment>
      ) : (
        <div className='shopping-cart__content'>
          <div className='shopping-cart__row'>
            <h5 className='title__h5'>Кошик</h5>
            <p className='shopping-cart__products-count'>{itemCount} товарів</p>
          </div>

          <div className='shopping-cart__list-wrapper'>
            <ul className='shopping-cart__list'>
              {cartItems.map((item) => {
                return <ShoppingCartItem key={item.cartItemId} id={item.cartItemId} />;
              })}
            </ul>
          </div>

          <div className='shopping-cart__total'>
            <div className='shopping-cart__total-row'>
              <p className='shopping-cart__text'>Сума замовлення:</p>
              <p className='shopping-cart__text'>{totalPrice} ₴</p>
            </div>
            <div className='shopping-cart__total-row'>
              <p className='shopping-cart__text'>Доставка:</p>
              <p className='shopping-cart__text'>{deliveryPrice} ₴</p>
            </div>
            <div className='shopping-cart__total-row'>
              <p className='shopping-cart__text-final'>Всього до сплати:</p>
              <p className='shopping-cart__text-final'>{totalPrice + deliveryPrice} ₴</p>
            </div>
          </div>
          <BtnMain fullWide onClick={makeAnOrderClick}>
            Замовити
          </BtnMain>
        </div>
      )}
    </motion.div>
  );
});
