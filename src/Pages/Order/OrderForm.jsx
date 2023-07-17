import React, { useEffect, useState } from "react";
import axios from "axios";

import "./Order.scss";

//Import Functios
import {
  dateFormatter,
  calculateTotalPrice,
  filterTimeArray,
  modifyDateString,
} from "./OrderTools";

//Import components
import InputText from "../../components/Inputs/InputText";
import InputNumber from "../../components/Inputs/InputNumber";
import InputSelector from "../../components/Inputs/InputSelector";
import RadioButton from "../../components/RadioButton/RadioButton";
import BtnMain from "../../components/Buttons/BtnMain";
import InputTextArea from "../../components/Inputs/InputTextArea";
import Checkbox from "../../components/Inputs/Checkbox";
import { useDispatch, useSelector } from "react-redux";

import { thanksModalUpdateState } from "../../store/modalsSlice";
import Popup from "../../components/Popup/Popup";
import Thanks from "../../components/Thanks/Thanks";
import { useLocation, useNavigate } from "react-router-dom";
import PopupActions from "../../components/PopupActions/PopupActions";
import {
  setOrderData,
  setPaymentData,
  setPosterResponsea,
} from "../../store/orderSlice";
import { userPromocode, userPromocodeNotUse } from "../../store/userSlice";
import { cartPromocode, clearCart } from "../../store/shoppingCartSlice";

import { url } from "../../api";
import { purchase } from "../../gm4";

//Time

const timeArray = [
  {
    id: 1,
    label: "12:00 - 12:30",
    value: "12:00 - 12:30",
  },
  {
    id: 2,
    label: "12:30 - 13:00",
    value: "12:30 - 13:00",
  },
  {
    id: 3,
    label: "13:00 - 13:30",
    value: "13:00 - 13:30",
  },
  {
    id: 4,
    label: "13:30 - 14:00",
    value: "13:30 - 14:00",
  },
  {
    id: 5,
    label: "14:00 - 14:30",
    value: "14:00 - 14:30",
  },
  {
    id: 6,
    label: "14:30 - 15:00",
    value: "14:30 - 15:00",
  },
  {
    id: 7,
    label: "15:00 - 15:30",
    value: "15:00 - 15:30",
  },
  {
    id: 8,
    label: "15:30 - 16:00",
    value: "15:30 - 16:00",
  },
  {
    id: 9,
    label: "16:00 - 16:30",
    value: "16:00 - 16:30",
  },
  {
    id: 10,
    label: "16:30 - 17:00",
    value: "16:30 - 17:00",
  },
  {
    id: 11,
    label: "17:00 - 17:30",
    value: "17:00 - 17:30",
  },
  {
    id: 12,
    label: "17:30 - 18:00",
    value: "17:30 - 18:00",
  },
  {
    id: 13,
    label: "18:00 - 18:30",
    value: "18:00 - 18:30",
  },
  {
    id: 14,
    label: "18:30 - 19:00",
    value: "18:30 - 19:00",
  },
  {
    id: 15,
    label: "19:00 - 19:30",
    value: "19:00 - 19:30",
  },
  {
    id: 16,
    label: "19:30 - 20:00",
    value: "19:30 - 20:00",
  },
  {
    id: 17,
    label: "22:00 - 22:30",
    value: "22:00 - 22:30",
  },
  {
    id: 16,
    label: "23:00 - 23:30",
    value: "23:00 - 23:30",
  },
];

const getCurrentDate = () => {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes() + 5).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formattedDate;
};

const OrderForm = () => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };
  //State
  const [isPromotion, setIsPromotion] = useState(false);
  const [promotionPopup, setPromotionPopup] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState(false);
  const [posterOrder, setPosterOrder] = useState(null);
  const [adresses, setAdresses] = useState([
    {
      label: "Немає",
      value: null,
      id: 0,
    },
  ]);
  const [error, setError] = useState({ status: false, currentError: "" });

  const [isOrderCreate, setIsOrderCreate] = useState(false);

  //Tools
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Redux
  const shoppingCart = useSelector((state) => state.shoppingCart.products);
  const shoppingCartMap = shoppingCart.map((item) => {
    return { product_id: item.id, count: item.count };
  });

  const shoppingCartMapPromo = shoppingCart.map((item) => {
    return { id: "2", involved_products: [{ id: item.id, count: item.count }] };
  });
  const modals = useSelector((state) => state.modals);
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);

  useEffect(() => {
    if (user.adresses !== null) {
      const selected = [
        {
          label: "Виберіть адресу",
          value: null,
          id: 0,
        },
      ];
      const adressMap = user.adresses.map((data, index) => {
        return {
          id: index + 1,
          label: data.addressName,
          value: `Вулица: ${data.streetName}, ${data.homeNumber}, ${
            data.entranceNumber ? `парадна: ${data.entranceNumber}` : ""
          } ${data.entranceCode ? `код: ${data.entranceCode} ` : ""} ${
            data.floar ? `этаж: ${data.floar} ` : ""
          } ${data.entranceNumber ? `квартира: ${data.entranceNumber} ` : ""} ${
            data.comment ? `коментарий: ${data.comment} ` : ""
          } `,
        };
      });

      setAdresses([...selected, ...adressMap]);
    }
  }, [user]);

  const time = filterTimeArray(timeArray);
  // Bad idea need make time function

  //Order
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
  const orderData = {
    spot_id: 1,
    first_name: formData.name,
    phone: formData.number,
    products: shoppingCartMap,
    client_address: {
      address1: `${
        formData.selectedAddress !== "Виберіть адресу"
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
    delivery_time: `${
      formData.deliveryTime === "На зараз"
        ? getCurrentDate()
        : dateFormatter(formData.selectedTime)
    }`,
    payment: {
      type: formData.paymentMethod === "Готівка" ? 0 : 1,
      sum: isPromotion ? 0 : calculateTotalPrice(shoppingCart),
      currency: "UAH",
    },
    promotion: isPromotion ? shoppingCartMapPromo : "",
    comment: `
            Кол - во
            персон: ${formData.personCount},
            ${
              formData.comment &&
              ` ${formData.comment}
            `
            }, ${formData.withoutDevices && "Без приборов"},${
      formData.doNotCall && "Не перезванивать"
    }, ${formData.howToReciveOrder === 2 && "САМОВЫВОЗ"} ${
      isPromotion && "СКИДКА 40%"
    }`,
  };
  //Update fomdata state
  const handleChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const usagePromotion = () => {
    axios
      .post(url + "/api/promocode", { token: user.token }, { headers: headers })
      .then((res) => {
        const data = res.data;

        console.log("usagePromotion:", data);
      })
      .catch((err) => console.error(err));
  };

  const checkCurrentUserPromo = () => {
    axios
      .post(
        `${url}/api/auth`,
        { token: user.token },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        const data = response.data;

        if (response.status === 200) {
          console.log("checkCurrentUserPromo", data.promocode40);
          if (data.promocode40 === true) {
            dispatch(userPromocodeNotUse());
          } else {
            dispatch(userPromocode());
          }
        }
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    checkCurrentUserPromo();
  }, [user.isAuthenticated]);
  const createTransaction = (amount) => {
    const data = { amount: amount };
    axios
      .post(url + "/api/pay", data, { headers: headers })
      .then((res) => {
        const data = res.data;
        const payment_url = `https://liqpay.ua/api/3/checkout?data=${data.data}&signature=${data.signature}`;

        dispatch(setPaymentData({ paymentData: data }));

        console.log("createTransaction:", data, payment_url);

        window.location.replace(payment_url);
      })
      .catch((err) => console.error(err));
  };

  const checkTransactionStatus = () => {
    const user_payment_data = JSON.parse(
      localStorage.getItem("user_payment_data")
    );

    const data = { order_id: user_payment_data.order_id };
    axios
      .post(url + "/api/getStatus", data, { headers: headers })
      .then((res) => {
        const data = res.data;
        console.log("checkTransactionStatus:", data);

        if (data === "success") {
          setTransactionStatus(true);
        } else if (data === "unpaid") {
          dispatch(userPromocodeNotUse());
          setError({
            status: true,
            currentError: "Оплата не вдала",
          });

          localStorage.removeItem("posterOrder");
          localStorage.removeItem("user_payment_data");
          localStorage.removeItem("user_order_data");
          setTimeout(() => {
            navigate("/order");
          }, 2000);
        }
      })
      .catch((err) => console.error(err));
  };

  const createOrder = () => {
    const user_payment_data = JSON.parse(
      localStorage.getItem("user_payment_data")
    );
    const data = JSON.parse(localStorage.getItem("user_order_data"));
    const orderId = user_payment_data ? user_payment_data.order_id : null;

    axios
      .post(
        url + "/api/createOrder",
        { order_id: orderId, data },
        { headers: headers }
      )
      .then((res) => {
        const data = res.data;
        if (!data.error) {
          console.log("createOrder:", data);
          dispatch(setPosterResponsea({ posterOrder: data.response }));
          setIsOrderCreate(true);

          if (isPromotion || data.promotion !== "") {
            usagePromotion();
          }
        }
      })
      .catch((err) => console.error(err));
  };

  const onSubmit = () => {
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
    } else if (calculateTotalPrice(shoppingCart) <= 200) {
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
      dispatch(setOrderData({ orderData: orderData }));

      if (orderData.payment.type === 1) {
        createTransaction(
          isPromotion
            ? calculateTotalPrice(shoppingCart) * (60 / 100)
            : calculateTotalPrice(shoppingCart)
        );
      }
      if (orderData.payment.type === 0) {
        createOrder();
        console.log("cash");
      }
    }
  };
  useEffect(() => {
    if (isPromotion) {
      setPromotionPopup(true);
      setTimeout(() => {
        setPromotionPopup(false);
      }, 3000);
    }
  }, [isPromotion]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const paramValue = searchParams.get("status");

    if (paramValue === "checkout") {
      checkTransactionStatus();
    }
  }, []);

  useEffect(() => {
    if (transactionStatus) {
      createOrder();
    }
  }, [transactionStatus]);

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
        dispatch(clearCart());
        dispatch(thanksModalUpdateState({ isOpen: false }));
        // navigate('/');
      }, 5000);
    }
  }, [isOrderCreate]);

  useEffect(() => {
    if (posterOrder !== null) {
      console.log("posterOrder", posterOrder);
      dispatch(thanksModalUpdateState({ isOpen: true }));
    }
  }, [posterOrder]);

  useEffect(() => {
    if (user.isAuthenticated) {
      handleChange("name", user.name);
      handleChange("number", user.phone);
      formData.name = user.name;
      formData.number = user.phone;
    }
  }, [user]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <>
      {modals.thanksModal && (
        <Popup
          closeModal={() => {
            dispatch(thanksModalUpdateState({ isOpen: false }));
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
      {promotionPopup === true && (
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
              onChange={(value) => handleChange("name", value)}
            />
            <InputNumber
              value={formData.number}
              inputValue={formData.number}
              onChange={(value) => handleChange("number", value)}
            />
          </div>
        </section>
        <section className="order-page__section">
          <h3>Спосіб отримання замовлення</h3>
          <section className="order-page__section-inputs">
            <InputSelector
              name={"Збережені адреси"}
              data={adresses}
              placeholder={"Оберіть адресу"}
              value={formData.selectedAddress}
              onChange={(value) => handleChange("selectedAddress", value)}
            />
          </section>
          <section className="order-page__section-inputs order-page__section-inputs-row">
            <InputText
              name={"Вулиця"}
              placeholder={"Вулиця"}
              value={formData.street}
              onChange={(value) => handleChange("street", value)}
            />
            <InputText
              name={"№ Будинку"}
              placeholder={"№ Будинку"}
              value={formData.houseNumber}
              onChange={(value) => handleChange("houseNumber", value)}
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
                handleChange("howToReciveOrder", event.target.value)
              }
            />
          </section>
          {formData.howToReciveOrder === "До дверей" && (
            <section className="order-page__section-inputs order-page__section-inputs-row">
              <InputText
                name={"Квартира"}
                placeholder={"№ Квартири"}
                value={formData.apartment}
                onChange={(value) => handleChange("apartment", value)}
              />

              <InputText
                name={"Парадна"}
                placeholder={"№ Парадної"}
                value={formData.entrance}
                onChange={(value) => handleChange("entrance", value)}
              />
              <InputText
                name={"Код"}
                placeholder={"Код"}
                value={formData.buildingCode}
                onChange={(value) => handleChange("buildingCode", value)}
              />
              <InputText
                name={"Поверх"}
                placeholder={"Поверх"}
                value={formData.floor}
                onChange={(value) => handleChange("floor", value)}
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
                handleChange("deliveryTime", event.target.value)
              }
              column
            />
            {formData.deliveryTime === "Вказати точний час" && (
              <InputSelector
                name={"Час"}
                placeholder={"Час"}
                data={time}
                value={formData.selectedTime}
                onChange={(value) => handleChange("selectedTime", value)}
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
                user.isAuthenticated && user.promocode40
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
              onChange={(value) => handleChange("promoCode", value)}
            />
            <BtnMain
              name={"Застосувати"}
              onClick={() => {
                if (calculateTotalPrice(shoppingCart) * (60 / 100) <= 200) {
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
                  console.log("usage");
                  dispatch(userPromocode());
                  setIsPromotion(true);
                }
              }}
              disabled={user.promocode40 ? false : true}
            />
          </section>
          {user.isAuthenticated && user.promocode40 && (
            <div className={`order-page__have-promocode`}>
              <span>У ВАС Е ПРОМОКОД НА СКИДКУ 40%</span>
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
          )}
        </section>
        <section className="order-page__section">
          <h3>Спосіб оплати</h3>
          <div className="order-page__section-inputs">
            <InputText
              name={"Використати бонуси"}
              placeholder={"0"}
              value={formData.bonus}
              onChange={(value) => handleChange("bonus", value)}
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
              onChange={(value) => handleChange("paymentMethod", value)}
            />
            <InputText
              name={"Сдача с"}
              placeholder={"500"}
              value={formData.change}
              onChange={(value) => handleChange("change", value)}
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
                  handleChange("withoutDevices", !formData.withoutDevices)
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
                      handleChange("personCount", formData.personCount - 1);
                    }
                  }}
                >
                  -
                </div>
                <div className="counter__value">{formData.personCount}</div>
                <div
                  className="counter__btn"
                  onClick={() =>
                    handleChange("personCount", formData.personCount + 1)
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
              onChange={(value) => handleChange("comment", value)}
            />
          </section>
          <section className="order-page__section-inputs">
            <div className="order-page__block">
              <Checkbox
                isChecked={formData.doNotCall}
                onCheckboxChange={() =>
                  handleChange("doNotCall", !formData.doNotCall)
                }
                label={"Не передзвонювати мені"}
              />
            </div>
          </section>
        </section>

        <BtnMain
          name={"Оформити замовлення"}
          fullWide
          onClick={() => onSubmit()}
        />
      </section>
    </>
  );
};
export default OrderForm;
