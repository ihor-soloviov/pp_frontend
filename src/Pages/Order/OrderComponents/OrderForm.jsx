/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { purchase } from '../../../gm4';

import { observer } from 'mobx-react-lite';
import orderStore from '../../../store/order-store';
import shoppingCartStore from '../../../store/shoping-cart-store';
import userStore from '../../../store/user-store';

//Import Functios
import { useCheckTransactionStatus } from '../../../utils/useCheckLiqpay';
import {
  createOrder,
  createTransaction,
  checkCurrentUserPromo,
  setTemporaryError,
  validateOrderData,
  calculateFinalAmount,
  createOrderData,
} from '../OrderFunctions/OrderTools';

import BtnMain from '../../../components/Buttons/BtnMain';
import { DotsLoader } from '../../../components/Loader/DotsLoader';

import { OrderContacts } from './OrderContacts';
import { OrderAddress } from './OrderAddress';
import { OrderTime } from './OrderTime';
import { OrderPaymentType } from './OrderPaymentType';
import { OrderComment } from './OrderComment';

import '../Order.scss';
import { fetchIsAnyOpenSpot } from '../../../utils/spotStatusApi';
import { shouldShowTimePopup } from '../../../utils/getWorkTime';
import { checkAndSelectOppositeSpot } from '../../../utils/distance';

const OrderForm = observer(
  ({
    isPromotion,
    setPosterOrder,
    handleError,
    setShowTimeModal,
    setShowLightModal,
    setStatusResponseApp,
  }) => {
    const [transactionStatus, setTransactionStatus] = useState(false);
    const [isOrderCreate, setIsOrderCreate] = useState(false);
    const [isButtonLoading, setIsButtonLoading] = useState(false);
    const [payment, setPayment] = useState({ label: 'Онлайн', value: 'Онлайн' });

    //stores
    const { setPaymentData, setPosterResponse, setOrderData } = orderStore;
    const { cartItems, clearCart, totalPrice, handleFormValueChange, orderFormData } =
      shoppingCartStore;
    const { name, phone, isAuthenticated } = userStore;

    console.log('orderFormData', { ...orderFormData });

    //Hooks
    const location = useLocation();
    const navigate = useNavigate();
    useCheckTransactionStatus(location.search, setTransactionStatus);

    //handlers
    const handleTemporaryError = (message) => setTemporaryError(message, handleError);

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
        setIsButtonLoading(false);
        clearCart();
      }
    }, [isOrderCreate]);

    const onSubmit = useCallback(async () => {
      const errorMessage = validateOrderData(orderFormData, cartItems, totalPrice, isPromotion);
      if (errorMessage) {
        handleTemporaryError(errorMessage);
        return;
      }
      setIsButtonLoading(true);

      //  Проверяем, есть ли работающие споты
      try {
        const { isAnySpotOpen } = await fetchIsAnyOpenSpot();
        if (!isAnySpotOpen) {
          setIsButtonLoading(false);
          navigate('/');
          setStatusResponseApp(isAnySpotOpen);
          return;
        }

        //  Проверяем рабочее время

        if (shouldShowTimePopup()) {
          setIsButtonLoading(false);
          navigate('/');
          setShowTimeModal(true);

          return;
        }

        const finalSpotId = await checkAndSelectOppositeSpot(orderFormData.spot_id);
        console.log('finalSpotId', finalSpotId);
        console.log('howToReciveOrder', orderFormData.howToReciveOrder);
        //  Проверяем если тип доставки самовывоз, и выбраный спот не рбаотает, то выдаем попап и выходим
        if (
          finalSpotId !== orderFormData.spot_id &&
          orderFormData.howToReciveOrder.includes('Самовивіз')
        ) {
          handleTemporaryError('Нажаль, обраний заклад тимчасово не працює');
          setIsButtonLoading(false);
          return;
        }

        const amount = calculateFinalAmount(cartItems, isPromotion, orderFormData.howToReciveOrder);

        // Если все проверки пройдены и этот заказ- не самовывоз, то выставлаем финальный spot_id в зависимости от статуса спотов
        const orderData = createOrderData(
          { ...orderFormData, spot_id: finalSpotId },
          cartItems,
          isPromotion,
        );

        setOrderData(orderData);

        if (orderFormData.paymentMethod === 'Готівка') {
          createOrder(setPosterResponse, setIsOrderCreate, isPromotion);
          return;
        }

        createTransaction(amount, setPaymentData);
      } catch (error) {
        console.error('Failed to fetch spot status:', error);
        handleTemporaryError('Помилка серверу, спробуйте ще раз');
        setIsButtonLoading(false);
      }
    }, [
      orderFormData,
      cartItems,
      isPromotion,
      createTransaction,
      createOrder,
      setPaymentData,
      handleError,
    ]);

    return (
      <React.Fragment>
        <section className='order-page__form'>
          <OrderContacts name={orderFormData.name} number={orderFormData.number} />

          <OrderAddress setPayment={setPayment} handleError={handleError} />

          <OrderTime />
          {/*
            <OrderPromo
              handleError={handleError}
              isPromotion={isPromotion}
              setPromotionPopup={setPromotionPopup}
              setIsPromotion={setIsPromotion}
            />
    */}

          <OrderPaymentType setPayment={setPayment} payment={payment} />

          <OrderComment />

          <BtnMain disabled={isButtonLoading} fullWide onClick={onSubmit}>
            {isButtonLoading ? <DotsLoader /> : 'Оформити замовлення'}
          </BtnMain>
        </section>
      </React.Fragment>
    );
  },
);

export default OrderForm;
