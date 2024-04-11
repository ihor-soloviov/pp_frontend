//Import React
import React, { useCallback, useState } from 'react';
import { observer } from 'mobx-react-lite';
import shoppingCartStore from '../../store/shoping-cart-store';
import PopupActions from '../PopupActions/PopupActions';
import { Cart } from './Cart/Cart';
import { AnimatePresence } from 'framer-motion';

//Import Styles
import './card.scss';

const CartMain = observer(() => {
  const { itemCount } = shoppingCartStore;

  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(false);

  const popupError = useCallback((err) => {
    if (err) {
      return <PopupActions action={'Мінімальна сумма замовлення 200 ₴'} error />;
    } else {
      return null;
    }
  }, []);

  return (
    <React.Fragment>
      {popupError(error)}
      <button className='card' onClick={() => setIsOpen(!isOpen)}>
        <div className={`card__ico`}>
          <svg
            width='16'
            height='16'
            viewBox='0 0 16 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g clipPath='url(#clip0_353_13525)'>
              <path
                d='M2.66707 10.6667V2.66669H1.33374V1.33336H3.33374C3.51055 1.33336 3.68012 1.4036 3.80514 1.52862C3.93017 1.65365 4.00041 1.82321 4.00041 2.00003V10H12.2924L13.6257 4.66669H5.33374V3.33336H14.4804C14.5817 3.33336 14.6817 3.35647 14.7728 3.40092C14.8639 3.44537 14.9436 3.50999 15.006 3.58988C15.0683 3.66977 15.1116 3.76283 15.1326 3.86197C15.1536 3.96111 15.1517 4.06373 15.1271 4.16203L13.4604 10.8287C13.4243 10.9729 13.341 11.1008 13.2239 11.1923C13.1067 11.2837 12.9624 11.3334 12.8137 11.3334H3.33374C3.15693 11.3334 2.98736 11.2631 2.86234 11.1381C2.73731 11.0131 2.66707 10.8435 2.66707 10.6667ZM4.00041 15.3334C3.64679 15.3334 3.30765 15.1929 3.0576 14.9428C2.80755 14.6928 2.66707 14.3536 2.66707 14C2.66707 13.6464 2.80755 13.3073 3.0576 13.0572C3.30765 12.8072 3.64679 12.6667 4.00041 12.6667C4.35403 12.6667 4.69317 12.8072 4.94322 13.0572C5.19326 13.3073 5.33374 13.6464 5.33374 14C5.33374 14.3536 5.19326 14.6928 4.94322 14.9428C4.69317 15.1929 4.35403 15.3334 4.00041 15.3334ZM12.0004 15.3334C11.6468 15.3334 11.3076 15.1929 11.0576 14.9428C10.8075 14.6928 10.6671 14.3536 10.6671 14C10.6671 13.6464 10.8075 13.3073 11.0576 13.0572C11.3076 12.8072 11.6468 12.6667 12.0004 12.6667C12.354 12.6667 12.6932 12.8072 12.9432 13.0572C13.1933 13.3073 13.3337 13.6464 13.3337 14C13.3337 14.3536 13.1933 14.6928 12.9432 14.9428C12.6932 15.1929 12.354 15.3334 12.0004 15.3334Z'
                fill='black'
              />
            </g>
            <defs>
              <clipPath id='clip0_353_13525'>
                <rect width='16' height='16' fill='white' />
              </clipPath>
            </defs>
          </svg>
          {itemCount !== 0 && (
            <div className='card__length'>
              <span className='card_count'>{itemCount}</span>
            </div>
          )}
        </div>
        <span className='card__text'>Кошик</span>
      </button>
      <AnimatePresence>
        {isOpen && <Cart isOpen={isOpen} setIsOpen={setIsOpen} setError={setError} />}
      </AnimatePresence>
    </React.Fragment>
  );
});

export default CartMain;
