/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useCheckTransactionStatus } from '../../../utils/useCheckLiqpay';
import { observer } from 'mobx-react-lite';

import orderStore from '../../../store/order-store';
import shoppingCartStore from '../../../store/shoping-cart-store';
import userStore from '../../../store/user-store';

//Import Functios
import {
  createOrder,
  createTransaction,
  checkCurrentUserPromo,
  setTemporaryError,
  validateOrderData,
  calculateFinalAmount,
  createOrderData,
} from '../OrderFunctions/OrderTools';

import { purchase } from '../../../gm4';
import PopupActions from '../../../components/PopupActions/PopupActions';

import '../Order.scss';
import { OrderContacts } from './OrderContacts';
import { OrderAddress } from './OrderAddress';
import { OrderTime } from './OrderTime';
import { OrderPromo } from './OrderPromo';
import { OrderPaymentType } from './OrderPaymentType';
import { OrderComment } from './OrderComment';
import BtnMain from '../../../components/Buttons/BtnMain';

const OrderForm = observer(({ setIsPromotion, isPromotion, setPosterOrder, posterOrder }) => {
  //States
  const [promotionPopup, setPromotionPopup] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState(false);

  const [isOrderCreate, setIsOrderCreate] = useState(false);
  const [error, setError] = useState({ status: false, currentError: '' });

  //handlers
  const handleError = (newErrorState) => setError(newErrorState);
  const handleTemporaryError = (message) => setTemporaryError(message, setError);

  //stores
  const { setOrderData, setPaymentData, setPosterResponse } = orderStore;
  const { cartItems, clearCart, totalPrice, deliveryPrice, handleFormValueChange, orderFormData } = shoppingCartStore;
  const { name, phone, isAuthenticated } = userStore;

  //Hooks
  const location = useLocation();

  useCheckTransactionStatus(location.search, setTransactionStatus);

  //функції які потребують авторизованності
  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    handleFormValueChange('name', name);
    handleFormValueChange('number', phone);
    checkCurrentUserPromo();
  }, [isAuthenticated]);

  //створення замовлення в постер
  useEffect(() => {
    if (transactionStatus) {
      createOrder(setPosterResponse, setIsOrderCreate, isPromotion);
    }
  }, [transactionStatus]);

  useEffect(() => {
    if (isOrderCreate) {
      const data = JSON.parse(localStorage.getItem('user_order_data'));
      const shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
      setPosterOrder(JSON.parse(localStorage.getItem('poster_order')));
      purchase(
        JSON.parse(localStorage.getItem('poster_order')).incoming_order_id,
        data.payment.sum,
        shoppingCart,
      );

      clearCart();
    }
  }, [isOrderCreate]);


  const onSubmit = useCallback(() => {
    const errorMessage = validateOrderData(orderFormData, cartItems, totalPrice, deliveryPrice);
    if (errorMessage) {
      handleTemporaryError(errorMessage);
      return;
    }

    const amount = calculateFinalAmount(cartItems, isPromotion, orderFormData.howToReciveOrder);
    const orderData = createOrderData(orderFormData, cartItems, isPromotion);
    setOrderData(orderData);

    if (orderFormData.paymentMethod === 'Готівка') {
      createOrder(setPosterResponse, setIsOrderCreate, isPromotion);
      return;
    }

    createTransaction(amount, setPaymentData);
  }, [orderFormData, cartItems, isPromotion, createTransaction, createOrder, setPaymentData, setError]);

  return (
    <React.Fragment>
      {!!error.status && (
        <PopupActions
          action={error.currentError}
          onClick={() =>
            setError({
              status: false,
              currentError: '',
            })
          }
          error
        />
      )}

      {promotionPopup && (
        <PopupActions
          action={'Ваш промокод застосован'}
          onClick={() => {
            setPromotionPopup(false);
          }}
        />
      )}

      <section className='order-page__form'>
        <OrderContacts
          name={orderFormData.name}
          number={orderFormData.number}
        />

        <OrderAddress />

        <OrderTime />

        <OrderPromo
          handleError={handleError}
          isPromotion={isPromotion}
          setPromotionPopup={setPromotionPopup}
          setIsPromotion={setIsPromotion}
        />

        <OrderPaymentType />

        <OrderComment />

        <BtnMain fullWide onClick={onSubmit}>
          Оформити замовлення
        </BtnMain>
      </section>
    </React.Fragment>
  );
});

export default OrderForm;
