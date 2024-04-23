/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Container from '../../components/Container/Container';
import './Order.scss';
import { motion } from 'framer-motion';
//Import Mobx
import { observer } from 'mobx-react-lite';
import shoppingCartStore from '../../store/shoping-cart-store';

//Import components

import OrderForm from './OrderComponents/OrderForm';
import { dropInProducts } from '../../utils/animation';
import modalsStore from '../../store/modal-store';
import Popup from '../../components/Popup/Popup';
import OrderThanks from '../../components/Thanks/OrderThanks';

const Order = observer(({ handleError, setPromotionPopup }) => {
  const { cartItems, totalPrice, deliveryPrice } = shoppingCartStore;
  const { thanksModal, thanksModalHandler } = modalsStore;
  const [isPromotion, setIsPromotion] = useState(false);
  const [posterOrder, setPosterOrder] = useState(null);
  const result = totalPrice * 0.6 + deliveryPrice;

  const formattedPrice = result % 1 === 0 ? result.toFixed(0) : result.toFixed(2);

  useEffect(() => {
    if (posterOrder) {
      console.log('posterOrder', posterOrder);
      thanksModalHandler(true);
    }
  }, [posterOrder]);

  return (
    <React.Fragment>
      {thanksModal && (
        <Popup
          closeModal={() => {
            thanksModalHandler(false);
          }}
        >
          <OrderThanks
            orderId={posterOrder.incoming_order_id}
            deliveryTime={posterOrder.delivery_time}
          />
        </Popup>
      )
      }
      <Container>
        <motion.div
          variants={dropInProducts}
          initial='hidden'
          animate='visible'
          exit='exit'
          className='order-page'
        >
          <div className='order-page__content'>
            <OrderForm
              isPromotion={isPromotion}
              setPosterOrder={setPosterOrder}
              handleError={handleError}
            />
            <div className='checkout'>
              <div className='checkout__content'>
                <h3 className='title__h3 text__color--secondary'>Ваше замовлення</h3>
                <ul className='checkout__list'>
                  {!!cartItems &&
                    cartItems.map((item) => {
                      return (
                        <li className='checkout__item' key={item.cartItemId}>
                          <div className='checkout__row'>
                            <p className='checkout__item-name'> {item.name}</p>
                            <p className='checkout__item-count'> x{item.count}</p>
                          </div>
                          <div className='checkout__row'>
                            <p className='checkout__item-weight'>{item.weight}г</p>
                            <p className='checkout__item-price'>{item.totalPrice} ₴</p>
                          </div>
                          {!!item.mods.length && (
                            <ul className='mods-inner order-mods-inner'>
                              {item.mods.map((mod) => (
                                <li className='mods-item ' key={mod.m}>
                                  <p>+{mod.name}</p>
                                  <p>+{mod.price}₴</p>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      );
                    })}
                </ul>
                <div className='checkout__total'>
                  <div className='checkout__row'>
                    <p className='checkout__text'>Сума замовлення:</p>
                    <p className='checkout__text'>{totalPrice} ₴</p>
                  </div>
                  <div className='checkout__row checkout__row-delivery'>
                    <p className='checkout__text'>Доставка:</p>
                    <p className='checkout__text'>{deliveryPrice} ₴</p>
                  </div>
                  {isPromotion && (
                    <div className='checkout__row'>
                      <p className='checkout__text'>Знижка:</p>
                      <p className='checkout__text'>
                        {(totalPrice * (40 / 100)).toFixed(2)} ₴
                      </p>
                    </div>
                  )}

                  <div className='checkout__row'>
                    <p className='checkout__text checkout__text-bold'>Всього до сплати:</p>
                    <p className='checkout__text-bold'>
                      {isPromotion ? formattedPrice : totalPrice + deliveryPrice} ₴
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </React.Fragment>
  );
});

export default Order;
