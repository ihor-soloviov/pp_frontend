import React, { useEffect } from "react";
import Container from "../../components/Container/Container";
import "./Order.scss";

import shoppingCartStore from "../../store/shoping-cart-store";
import userStore from "../../store/user-store";

//Import components


import { setPaymentData } from "../../store/orderSlice";
import OrderForm from "./OrderForm";


const Order = () => {
  const { products, promocode } = shoppingCartStore;
  const { promocode40 } = userStore;

  const calculateTotalPrice = (items) => {
    let totalPrice = 0;

    items.forEach((item) => {
      totalPrice += item.totalPrice;
    });

    return totalPrice;
  };

  useEffect(() => {
    console.log(promocode);
  }, [promocode]);

  //    useEffect(() => {
  //        const user_payment_data_json = localStorage.getItem('user_payment_data');
  //
  //        if (user_payment_data_json) {
  //            const user_payment_data = JSON.parse(user_payment_data_json)
  //
  //            dispatch(setPaymentData({payment_data: user_payment_data}))
  //        }
  //
  //
  //    })

  return (
    <>
      <Container>
        <div className="order-page">
          <div className="order-page__content">
            <OrderForm />
            <div className="checkout">
              <div className="checkout__content">
                <h3 className="title__h3 text__color--secondary">
                  Ваше замовлення
                </h3>
                <ul className="checkout__list">
                  {products.map((item) => {
                    return (
                      <li className="checkout__item">
                        <div className="checkout__row">
                          <p className="checkout__item-name"> {item.name}</p>
                          <p className="checkout__item-count"> x{item.count}</p>
                        </div>
                        <div className="checkout__row">
                          <p className="checkout__item-weight">
                            {item.weight}г
                          </p>
                          <p className="checkout__item-price">
                            {item.totalPrice} ₴
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <div className="checkout__total">
                  <div className="checkout__row">
                    <p className="checkout__text">Сума замовлення:</p>
                    <p className="checkout__text">
                      {calculateTotalPrice(products)} ₴
                    </p>
                  </div>
                  <div className="checkout__row checkout__row-delivery">
                    <p className="checkout__text">Доставка:</p>
                    <p className="checkout__text">
                      {products.reduce((a, b) => a + b.totalPrice, 0) < 500
                        ? "за допомогою таксі (оплачується окремо)"
                        : "Безкоштовна"}
                    </p>
                  </div>
                  {!promocode40 && (
                    <div className="checkout__row">
                      <p className="checkout__text">Скидка:</p>
                      <p className="checkout__text">
                        {(
                          calculateTotalPrice(products) -
                          calculateTotalPrice(products) * (60 / 100)
                        ).toFixed(2)}{" "}
                        ₴
                      </p>
                    </div>
                  )}

                  <div className="checkout__row">
                    <p className="checkout__text checkout__text-bold">
                      Всього до сплати:
                    </p>
                    <p className="checkout__text-bold">
                      {!promocode40
                        ? calculateTotalPrice(products) * (60 / 100)
                        : calculateTotalPrice(products)}{" "}
                      ₴
                    </p>
                  </div>
                  {/* <BtnMain name={'ОПЛАТИТЬ'} fullWide onClick={() => pay()} /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Order;
