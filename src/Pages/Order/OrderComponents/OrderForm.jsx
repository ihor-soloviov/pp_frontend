/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

import orderStore from "../../../store/order-store";
import modalsStore from "../../../store/modal-store";
import shoppingCartStore from "../../../store/shoping-cart-store";
import userStore from "../../../store/user-store";

//Import Functios
import {
  calculateTotalPrice,
  createOrder,
  checkTransactionStatus,
  createTransaction,
  checkCurrentUserPromo,
  getCurrentDate,
  setTemporaryError,
} from "../OrderFunctions/OrderTools";

import { purchase } from "../../../gm4";

import Popup from "../../../components/Popup/Popup";
import Thanks from "../../../components/Thanks/Thanks";
import PopupActions from "../../../components/PopupActions/PopupActions";

import { getOrderData } from "../OrderFunctions/orderData";

import "../Order.scss";
import { OrderContacts } from "./OrderContacts";
import { OrderAddress } from "./OrderAddress";
import { OrderTime } from "./OrderTime";
import { OrderPromo } from "./OrderPromo";
import { OrderPaymentType } from "./OrderPaymentType";
import { OrderComment } from "./OrderComment";
import BtnMain from "../../../components/Buttons/BtnMain";

const OrderForm = observer(({ setIsPromotion, isPromotion }) => {

  //State
  const [formData, setFormData] = useState({
    spot_id: 1,
    name: "",
    number: "",
    selectedAddress: "",
    street: "",
    houseNumber: "",
    deliveryTime: "",
    howToReciveOrder: "",
    entrance: "",
    apartment: "",
    buildingCode: "",
    floor: "",
    selectedTime: getCurrentDate(),
    promoCode: "",
    bonus: "",
    paymentMethod: 1,
    change: "",
    withoutDevices: false,
    personCount: 1,
    comment: "",
    doNotCall: false,
  });

  const [promotionPopup, setPromotionPopup] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState(false);
  const [posterOrder, setPosterOrder] = useState(null);
  const [isOrderCreate, setIsOrderCreate] = useState(false);
  const [error, setError] = useState({ status: false, currentError: "" });

  //Tools
  const location = useLocation();
  const navigate = useNavigate();

  //stores
  const { thanksModal, thanksModalHandler } = modalsStore;
  const { setOrderData, setPaymentData, setPosterResponse } = orderStore;
  const { products, clearCart } = shoppingCartStore;
  const {
    name,
    phone,
    isAuthenticated,
  } = userStore;

  const handleError = newErrorState => setError(newErrorState)

  //перевірка промокоду 

  useEffect(() => {
    if (isAuthenticated) {
      checkCurrentUserPromo();
    }
  }, [isAuthenticated]);

  //перевірка статусу транзації
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const paramValue = searchParams.get("status");

    if (paramValue === "checkout") {
      console.log('checkout')
      checkTransactionStatus(setTransactionStatus, setError);
    }
  }, [location.search]);

  //створення замовлення в постер
  useEffect(() => {
    if (transactionStatus) {
      createOrder(setPosterResponse, setIsOrderCreate, isPromotion);
    }
  }, [transactionStatus]);

  useEffect(() => {
    if (isOrderCreate) {
      const data = JSON.parse(localStorage.getItem("user_order_data"));
      const shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));
      setPosterOrder(JSON.parse(localStorage.getItem("poster_order")));
      purchase(
        JSON.parse(localStorage.getItem("poster_order")).incoming_order_id,
        data.payment.sum,
        shoppingCart
      );

      thanksModalHandler(false);
      setTimeout(() => {
        localStorage.removeItem("posterOrder");
        localStorage.removeItem("poster_order");
        localStorage.removeItem("user_payment_data");
        localStorage.removeItem("user_order_data");
        navigate('/')
      }, 5000);
      clearCart();
    }
  }, [isOrderCreate]);

  useEffect(() => {
    if (posterOrder) {
      console.log("posterOrder", posterOrder);
      thanksModalHandler(true);
    }
  }, [posterOrder]);

  useEffect(() => {
    if (isAuthenticated) {
      handleFormValueChange("name", name);
      handleFormValueChange("number", phone);
      formData.name = name;
      formData.number = phone;
    }
  }, [isAuthenticated, name, phone]);

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

  //Update formdata state
  const handleFormValueChange = useCallback((field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  }, []);

  const onSubmit = useCallback(() => {
    const orderData = getOrderData(formData, products, isPromotion)
    console.log(orderData)

    // Перевірки умов з раннім поверненням
    if (!orderData.phone) {
      return setTemporaryError("Будь ласка, заповніть поле номеру телефону", setError);
    } else if (!formData.howToReciveOrder) {
      return setTemporaryError("Будь ласка, оберіть спосіб отримання замовлення", setError);
    } else if (calculateTotalPrice(products) <= 200) {
      return setTemporaryError("Мінімальна сумма замовлення 200 ₴", setError);
    }

    setOrderData(orderData);

    if (formData.paymentMethod === "Готівка") {
      createOrder(setPosterResponse, setIsOrderCreate, isPromotion);
      console.log("cash");
    } else {
      const totalPrice = calculateTotalPrice(products);
      const amount = isPromotion ? totalPrice * 0.6 : totalPrice;
      createTransaction(amount, setPaymentData);
    }
  }, [formData, products, isPromotion, createTransaction, createOrder, setPaymentData, setError]);


  return (
    <React.Fragment>
      {thanksModal && (
        <Popup
          closeModal={() => {
            thanksModalHandler(false);
          }}
        >
          <Thanks
            orderId={posterOrder.incoming_order_id}
            deliveryTime={posterOrder.delivery_time}
          />
        </Popup>
      )}

      {!!error.status && (
        <PopupActions
          action={error.currentError}
          onClick={() =>
            setError({
              status: false,
              currentError: "",
            })
          }
          error
        />
      )}

      {promotionPopup && (
        <PopupActions
          action={"Ваш промокод застосован"}
          onClick={() => {
            setPromotionPopup(false);
          }}
        />
      )}

      <section className="order-page__form">

        <OrderContacts name={formData.name} number={formData.number} handleFormValueChange={handleFormValueChange} />

        <OrderAddress formData={formData} handleFormValueChange={handleFormValueChange} />

        <OrderTime formData={formData} handleFormValueChange={handleFormValueChange} />

        <OrderPromo
          formData={formData}
          handleFormValueChange={handleFormValueChange}
          handleError={handleError}
          isPromotion={isPromotion}
          setPromotionPopup={setPromotionPopup}
          setIsPromotion={setIsPromotion}
        />

        <OrderPaymentType formData={formData} handleFormValueChange={handleFormValueChange} />

        <OrderComment formData={formData} handleFormValueChange={handleFormValueChange} />

        <BtnMain
          name={"Оформити замовлення"}
          fullWide
          onClick={onSubmit}
        />
      </section>
    </React.Fragment>
  );
});

export default OrderForm;
