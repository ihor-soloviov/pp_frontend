/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

import orderStore from "../../store/order-store";
import modalsStore from "../../store/modal-store";
import shoppingCartStore from "../../store/shoping-cart-store";
import userStore from "../../store/user-store";

//Import Functios
import {
  dateFormatter,
  calculateTotalPrice,
  filterTimeArray,
  createOrder,
  checkTransactionStatus,
  createTransaction,
  checkCurrentUserPromo,
  getCurrentDate,
} from "./OrderTools";

import { purchase } from "../../gm4";
import { timeArray } from "./time";

//Import components
import InputText from "../../components/Inputs/InputText";
import InputNumber from "../../components/Inputs/InputNumber";
import InputSelector from "../../components/Inputs/InputSelector";
import RadioButton from "../../components/RadioButton/RadioButton";
import BtnMain from "../../components/Buttons/BtnMain";
import InputTextArea from "../../components/Inputs/InputTextArea";
import Checkbox from "../../components/Inputs/Checkbox";

import Popup from "../../components/Popup/Popup";
import Thanks from "../../components/Thanks/Thanks";
import PopupActions from "../../components/PopupActions/PopupActions";

import "./Order.scss";

const OrderForm = observer(() => {
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
  const [isPromotion, setIsPromotion] = useState(false);
  const [promotionPopup, setPromotionPopup] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState(false);
  const [posterOrder, setPosterOrder] = useState(null);
  const [selectAddresses, setSelectAddresses] = useState([
    {
      label: "Немає",
      value: null,
      id: 0,
    },
  ]);
  const [error, setError] = useState({ status: false, currentError: "" });
  const [isOrderCreate, setIsOrderCreate] = useState(false);

  //stores
  const { setOrderData, setPaymentData, setPosterResponse } = orderStore;
  const { products, clearCart } = shoppingCartStore;
  const {
    name,
    phone,
    adresses,
    isAuthenticated,
    promocode40,
  } = userStore;

  const { thanksModal, thanksModalHandler } = modalsStore;

  const shoppingCartMap = products.map((item) => {
    return { product_id: item.id, count: item.count };
  });

  const shoppingCartMapPromo = products.map((item) => {
    return { id: "2", involved_products: [{ id: item.id, count: item.count }] };
  });

  const time = filterTimeArray(timeArray);

  const orderData = {
    spot_id: 1,
    first_name: formData.name,
    phone: formData.number,
    products: shoppingCartMap,
    client_address: {
      address1: `${formData.selectedAddress !== "Виберіть адресу"
        ? formData.selectedAddress
        : ` Вулиця: ${formData.street} ,  Вулиця: ${formData.street},
                Дім: ${formData.houseNumber}`
        }`,
      address2: `
                Парадная: ${formData.entrance},
                Квартира: ${formData.apartment},
                Код: ${formData.buildingCode},
                Поверх: ${formData.floor},`,
    },
    service_mode: formData.howToReciveOrder === "Самовивіз" ? 2 : 3,
    delivery_time: `${formData.deliveryTime === "На зараз"
      ? getCurrentDate()
      : dateFormatter(formData.selectedTime)
      }`,
    payment: {
      type: formData.paymentMethod === "Готівка" ? 0 : 1,
      sum: isPromotion ? 0 : calculateTotalPrice(products),
      currency: "UAH",
    },
    promotion: isPromotion ? shoppingCartMapPromo : "",
    comment: `
            Кол - во
            персон: ${formData.personCount},
            ${formData.comment &&
      ` ${formData.comment}
            `
      }, ${formData.withoutDevices && "Без приборов"},${formData.doNotCall && "Не перезванивать"
      }, ${formData.howToReciveOrder === 2 && "САМОВЫВОЗ"} ${isPromotion && "СКИДКА 40%"
      }`,
  };

  //Tools
  const location = useLocation();
  const navigate = useNavigate();

  //Effects

  //addresses shit

  useEffect(() => {
    if (!adresses) {
      return;
    }

    const selected = [
      {
        label: "Виберіть адресу",
        value: null,
        id: 0,
      },
    ];

    const adressMap = adresses.map((data, index) => {
      return {
        id: index + 1,
        label: data.addressName,
        value: `Вулиця: ${data.streetName}, ${data.homeNumber}, ${data.entranceNumber ? `парадна: ${data.entranceNumber}` : ""
          } ${data.entranceCode ? `код: ${data.entranceCode} ` : ""} ${data.floar ? `поверх: ${data.floar} ` : ""
          } ${data.entranceNumber ? `квартира: ${data.entranceNumber} ` : ""} ${data.comment ? `коментар: ${data.comment} ` : ""
          } `,
      };
    });

    setSelectAddresses([...selected, ...adressMap]);
  }, []);

  //перевірка промокоду 

  useEffect(() => {
    checkCurrentUserPromo();
  }, [checkCurrentUserPromo, isAuthenticated]);

  //перевірка статусу транзації
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const paramValue = searchParams.get("status");

    if (paramValue === "checkout") {
      checkTransactionStatus(setTransactionStatus, setError, navigate);
    }
  }, [checkTransactionStatus, location.search]);


  //створення замовлення в постер
  useEffect(() => {
    if (transactionStatus) {
      createOrder(setPosterResponse, setIsOrderCreate, isPromotion);
    }
  }, [createOrder, transactionStatus]);

  useEffect(() => {
    if (isOrderCreate) {
      const data = JSON.parse(localStorage.getItem("user_order_data"));
      const shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));
      setPosterOrder(JSON.parse(localStorage.getItem("poster_order")));
      console.log(
        "order data",
        JSON.parse(localStorage.getItem("poster_order"))
      );
      purchase(
        JSON.parse(localStorage.getItem("poster_order")).incoming_order_id,
        data.payment.sum,
        shoppingCart
      );
      setTimeout(() => {
        localStorage.removeItem("posterOrder");
        localStorage.removeItem("poster_order");
        localStorage.removeItem("user_payment_data");
        localStorage.removeItem("user_order_data");
        clearCart();
        thanksModalHandler(false);
      }, 5000);
    }
  }, [clearCart, isOrderCreate, thanksModalHandler]);

  useEffect(() => {
    if (posterOrder !== null) {
      console.log("posterOrder", posterOrder);
      thanksModalHandler(true);
    }
  }, [posterOrder, thanksModalHandler]);

  useEffect(() => {
    if (isAuthenticated) {
      handleFormValueChange("name", name);
      handleFormValueChange("number", phone);
      formData.name = name;
      formData.number = phone;
    }
  }, [isAuthenticated, name, phone]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  //Update formdata state
  const handleFormValueChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const onSubmit = useCallback(() => {
    if (orderData.phone === "") {
      setError({
        status: true,
        currentError: "Будь ласка, заповніть поле номеру телефону",
      });
    } else if (formData.howToReciveOrder === "") {
      setError({
        status: true,
        currentError: "Будь ласка, оберіть спосіб отримання замовлення",
      });
    } else if (calculateTotalPrice(products) <= 200) {
      setError({
        status: true,
        currentError: "Мінімальна сумма замовлення 200 ₴",
      });
      setTimeout(() => {
        setError({
          status: false,
          currentError: "",
        });
      }, 3000);
    } else {
      setOrderData(orderData);

      if (orderData.payment.type === 1) {
        const amount = isPromotion ? calculateTotalPrice(products) * (60 / 100) : calculateTotalPrice(products);
        createTransaction(amount, setPaymentData);
      }
      if (orderData.payment.type === 0) {
        createOrder();
        console.log("cash");
      }
    }
  }, [orderData, formData, products, isPromotion, createTransaction, createOrder, setPaymentData, setError]);


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

      {error.status === true && (
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
        <section className="order-page__section">
          <h3>Контакти</h3>
          <div className="order-page__section-inputs">
            <InputText
              name={"Ваше ім’я"}
              placeholder={"Ваше ім’я"}
              inputValue={formData.name}
              value={formData.name}
              onChange={(value) => handleFormValueChange("name", value)}
            />
            <InputNumber
              value={formData.number}
              inputValue={formData.number}
              onChange={(value) => handleFormValueChange("number", value)}
            />
          </div>
        </section>
        <section className="order-page__section">
          <h3>Спосіб отримання замовлення</h3>
          <section className="order-page__section-inputs">
            <InputSelector
              name={"Збережені адреси"}
              data={selectAddresses}
              placeholder={"Оберіть адресу"}
              value={formData.selectedAddress}
              onChange={(value) => handleFormValueChange("selectedAddress", value)}
            />
          </section>
          <section className="order-page__section-inputs order-page__section-inputs-row">
            <InputText
              name={"Вулиця"}
              placeholder={"Вулиця"}
              value={formData.street}
              onChange={(value) => handleFormValueChange("street", value)}
            />
            <InputText
              name={"№ Будинку"}
              placeholder={"№ Будинку"}
              value={formData.houseNumber}
              onChange={(value) => handleFormValueChange("houseNumber", value)}
            />
          </section>
          <section className="order-page__section-inputs">
            <RadioButton
              data={[
                { id: 1, value: "До дверей", label: "До дверей" },
                {
                  id: 2,
                  value: "Приватний будинок",
                  label: "Приватний будинок",
                },
                { id: 4, value: "Вийду до машини", label: "Вийду до машини" },
                {
                  id: 3,
                  value: "Самовивіз",
                  label: "Самовивіз",
                  info: "(Одеса, вул. Лейтенанта Шмідта 25)",
                },
              ]}
              selectedOption={formData.howToReciveOrder}
              onOptionChange={(event) =>
                handleFormValueChange("howToReciveOrder", event.target.value)
              }
            />
          </section>
          {formData.howToReciveOrder === "До дверей" && (
            <section className="order-page__section-inputs order-page__section-inputs-row">
              <InputText
                name={"Квартира"}
                placeholder={"№ Квартири"}
                value={formData.apartment}
                onChange={(value) => handleFormValueChange("apartment", value)}
              />

              <InputText
                name={"Парадна"}
                placeholder={"№ Парадної"}
                value={formData.entrance}
                onChange={(value) => handleFormValueChange("entrance", value)}
              />
              <InputText
                name={"Код"}
                placeholder={"Код"}
                value={formData.buildingCode}
                onChange={(value) => handleFormValueChange("buildingCode", value)}
              />
              <InputText
                name={"Поверх"}
                placeholder={"Поверх"}
                value={formData.floor}
                onChange={(value) => handleFormValueChange("floor", value)}
              />
            </section>
          )}
        </section>
        <section className="order-page__section">
          <h3>Час отримання</h3>
          <section className="order-page__section-inputs">
            <RadioButton
              data={[
                { id: 1, value: "На зараз", label: "На зараз" },
                {
                  id: 2,
                  value: "Вказати точний час",
                  label: "Вказати точний час",
                },
              ]}
              selectedOption={formData.deliveryTime}
              onOptionChange={(event) =>
                handleFormValueChange("deliveryTime", event.target.value)
              }
              column
            />
            {formData.deliveryTime === "Вказати точний час" && (
              <InputSelector
                name={"Час"}
                placeholder={"Час"}
                data={time}
                value={formData.selectedTime}
                onChange={(value) => handleFormValueChange("selectedTime", value)}
              />
            )}
          </section>
        </section>
        <section className="order-page__section">
          <h3>Додати промокод</h3>
          <section className="order-page__section-inputs order-page__section-inputs-row">
            <InputSelector
              name={"Промокод"}
              placeholder={"Промокод"}
              data={
                promocode40
                  ? [
                    {
                      id: 0,
                      label: "40%",
                      value: "40%",
                    },
                  ]
                  : []
              }
              value={formData.paymentMethod}
              onChange={(value) => handleFormValueChange("promoCode", value)}
            />
            {promocode40 && (
              <BtnMain
                name={"Застосувати"}
                onClick={() => {
                  if (calculateTotalPrice(products) * (60 / 100) <= 200) {
                    setError({
                      status: true,
                      currentError: "Мінімальна сумма замовлення 200 ₴",
                    });
                    setTimeout(() => {
                      setError({
                        status: false,
                        currentError: "",
                      });
                    }, 2000);
                  } else {
                    setPromotionPopup(true)
                    setTimeout(() => {
                      setPromotionPopup(false)
                    }, 2500);
                    setIsPromotion(true);
                  }
                }}
                disabled={!isPromotion ? false : true}
              />
            )}
            <div className={`order-page__have-promocode`}>
              <span>У ВАС Є ПРОМОКОД НА ЗНИЖКУ 40%</span>
              <div className="order-page__arrow">
                <svg
                  width="17"
                  height="20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.16645 11.7814L12.7425 8.20535L13.6851 9.14802L8.49979 14.3334L3.31445 9.14802L4.25712 8.20535L7.83312 11.7814V3.66669H9.16645V11.7814Z"
                    fill="#12130F"
                  />
                </svg>
              </div>
            </div>
          </section>

        </section>
        <section className="order-page__section">
          <h3>Спосіб оплати</h3>
          <div className="order-page__section-inputs">
            <InputText
              name={"Використати бонуси"}
              placeholder={"0"}
              disabled
              value={formData.bonus}
              onChange={(value) => handleFormValueChange("bonus", value)}
            />
          </div>
          <div className="order-page__section-inputs order-page__section-inputs-row">
            <InputSelector
              name={"Оплата"}
              placeholder={"Онлайн"}
              data={[
                { id: 0, label: "Онлайн", value: "Онлайн" },
                { id: 1, label: "Готівка", value: "Готівка" },
              ]}
              value={formData.paymentMethod}
              onChange={(value) => handleFormValueChange("paymentMethod", value)}
            />
            <InputText
              name={"Сдача с"}
              placeholder={"500"}
              value={formData.change}
              onChange={(value) => handleFormValueChange("change", value)}
            />
          </div>
        </section>
        <section className="order-page__section">
          <h3>Додатково</h3>
          <section className="order-page__section-inputs order-page__section-inputs-row">
            <div className="order-page__block">
              <span>Кількість персон:</span>
              <Checkbox
                isChecked={formData.withoutDevices}
                onCheckboxChange={() =>
                  handleFormValueChange("withoutDevices", !formData.withoutDevices)
                }
                label={"Без приборів"}
              />
            </div>
            <div className="order-page__block">
              <span>Кількість персон:</span>
              <div className="counter">
                <div
                  className="counter__btn"
                  onClick={() => {
                    if (formData.personCount > 1) {
                      handleFormValueChange("personCount", formData.personCount - 1);
                    }
                  }}
                >
                  -
                </div>
                <div className="counter__value">{formData.personCount}</div>
                <div
                  className="counter__btn"
                  onClick={() =>
                    handleFormValueChange("personCount", formData.personCount + 1)
                  }
                >
                  +
                </div>
              </div>
            </div>
          </section>
          <section className="order-page__section-inputs">
            <InputTextArea
              name={"Коментар до замовлення"}
              placeholder={"Можете тут написати будь-що:)"}
              value={formData.comment}
              onChange={(value) => handleFormValueChange("comment", value)}
            />
          </section>
          <section className="order-page__section-inputs">
            <div className="order-page__block">
              <Checkbox
                isChecked={formData.doNotCall}
                onCheckboxChange={() =>
                  handleFormValueChange("doNotCall", !formData.doNotCall)
                }
                label={"Не передзвонювати мені"}
              />
            </div>
          </section>
        </section>

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
