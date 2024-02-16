import React, { useEffect, useState } from "react";
import Container from "../../components/Container/Container";
import "./Order.scss";

//Import Mobx
import { observer } from "mobx-react-lite";
import shoppingCartStore from "../../store/shoping-cart-store";

//Import components

import OrderForm from "./OrderComponents/OrderForm";


const Order = observer(() => {
  const { cartItems } = shoppingCartStore;

  const [isPromotion, setIsPromotion] = useState(false);
  const [total, setTotal] = useState(0);
  const [delivery, setDelivery] = useState(60)

  const calculateTotalPrice = (items) => {
    let totalPrice = 0;

    items.forEach((item) => {
      totalPrice += item.totalPrice;
    });

    return totalPrice;
  };

  useEffect(() => {
    let totalPrice = calculateTotalPrice(cartItems);

    if (isPromotion) {
      totalPrice = totalPrice * 0.6
    }

    if (totalPrice > 500) {
      setDelivery(0)
    } else {
      setDelivery(60)
    }

    setTotal(totalPrice)
  }, [cartItems, isPromotion])




  return (
    <React.Fragment>
      <Container>
        <div className="order-page">
          <div className="order-page__content">
            <OrderForm setIsPromotion={setIsPromotion} isPromotion={isPromotion} />
            <div className="checkout">
              <div className="checkout__content">
                <h3 className="title__h3 text__color--secondary">
                  Ваше замовлення
                </h3>
                <ul className="checkout__list">
                  {!!cartItems && cartItems.map((item) => {
                    return (
                      <li className="checkout__item" key={item.cartItemId}>
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
                      {total} ₴
                    </p>
                  </div>
                  <div className="checkout__row checkout__row-delivery">
                    <p className="checkout__text">Доставка:</p>
                    <p className="checkout__text">
                      {delivery} ₴
                    </p>
                  </div>
                  {isPromotion && (
                    <div className="checkout__row">
                      <p className="checkout__text">Знижка:</p>
                      <p className="checkout__text">
                        {
                          (calculateTotalPrice(cartItems) * (40 / 100)).toFixed(2)}{" "}
                        ₴
                      </p>
                    </div>
                  )}

                  <div className="checkout__row">
                    <p className="checkout__text checkout__text-bold">
                      Всього до сплати:
                    </p>
                    <p className="checkout__text-bold">
                      {total + delivery} ₴
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
})

export default Order;
