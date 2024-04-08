import React from 'react'
import discount from "../../assets/discount.png"
import "./DiscountModal.scss"
import { observer } from 'mobx-react-lite';
import modalsStore from '../../store/modal-store';

export const DiscountModal = observer(() => {
  const { authModalHandler, isDiscountHandler } = modalsStore;

  return (
    <div className='discount-modal'>
      <img src={discount} className='discount-img' alt="40% discount icon" />
      <h2>Зареєструйся на сайті та отримай знижку на перше замовлення </h2>
      <button className='discount-btn'
        onClick={() => {
          isDiscountHandler(false);
          authModalHandler(true);
        }}
      >
        Зареєструватись
      </button>
    </div>
  )
})

