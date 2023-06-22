import React, {useEffect, useState} from 'react';
import Container from '../../components/Container/Container';
import './Order.scss';

//Import components

import {useDispatch, useSelector} from 'react-redux';

import OrderForm from './OrderForm';

const Order = () => {
    const dispatch = useDispatch();
    const shoppingCart = useSelector((state) => state.shoppingCart);
    const modals = useSelector((state) => state.modals);

    const calculateTotalPrice = (items) => {
        let totalPrice = 0;

        items.forEach((item) => {
            totalPrice += item.totalPrice;
        });

        return totalPrice;
    };

    useEffect(() => {
        console.log(shoppingCart.promocode)
    }, [shoppingCart.promocode])
    return (
        <>
            <Container>
                <div className='order-page'>
                    <div className='order-page__content'>
                        <OrderForm/>
                        <div className='checkout'>
                            <div className='checkout__content'>
                                <h3 className='title__h3 text__color--secondary'>
                                    Ваше замовлення
                                </h3>
                                <ul className='checkout__list'>
                                    {shoppingCart.products.map((item) => {
                                        return (
                                            <li className='checkout__item'>
                                                <div className='checkout__row'>
                                                    <p className='checkout__item-name'> {item.name}</p>
                                                    <p className='checkout__item-count'> x{item.count}</p>
                                                </div>
                                                <div className='checkout__row'>
                                                    <p className='checkout__item-weight'>
                                                        {item.weight}г
                                                    </p>
                                                    <p className='checkout__item-price'>
                                                        {item.totalPrice} ₴
                                                    </p>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                                <div className='checkout__total'>
                                    <div className='checkout__row'>
                                        <p className='checkout__text'>Сума замовлення:</p>
                                        <p className='checkout__text'>
                                            {calculateTotalPrice(shoppingCart.products)} ₴
                                        </p>
                                    </div>
                                    <div className='checkout__row checkout__row-delivery'>
                                        <p className='checkout__text'>Доставка:</p>
                                        <p className='checkout__text'>
                                            {shoppingCart.products.reduce((a, b) => a + b.totalPrice, 0) < 500
                                                ? 'за допомогою таксі (оплачується окремо)'
                                                : 'Безкоштовна'}
                                        </p>
                                    </div>
                                    {shoppingCart.promocode && <div className='checkout__row'>
                                        <p className='checkout__text'>Скидка:</p>
                                        <p className='checkout__text'>
                                            {calculateTotalPrice(shoppingCart.products) - calculateTotalPrice(shoppingCart.products) * (40 / 100)} ₴
                                        </p>
                                    </div>}

                                    <div className='checkout__row'>
                                        <p className='checkout__text checkout__text-bold'>
                                            Всього до сплати:
                                        </p>
                                        <p className='checkout__text-bold'>
                                            {shoppingCart.promocode ? (calculateTotalPrice(shoppingCart.products) * (40 / 100)) : calculateTotalPrice(shoppingCart.products)} ₴
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
