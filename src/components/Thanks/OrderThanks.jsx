import React from 'react';
import './Thanks.scss';
import BtnSecondary from '../Buttons/BtnSecondary';
import { useNavigate } from 'react-router-dom';
import ThanksContainer from './ThanksContainer';

const OrderThanks = ({ orderId, deliveryTime }) => {
  const navigate = useNavigate()
  return (
    <ThanksContainer>
      <p className='thanks__text'>Номер вашого замовлення №{orderId}</p>
      <div className='thanks__delivery-time'>
        <p>
          Орієнтовний час отримання: <b>{deliveryTime}</b>
        </p>
      </div>
      <BtnSecondary name={'Зв’язатися з нами'} onClick={() => navigate('/contact')} fullWide />
    </ThanksContainer>
  );
};

export default OrderThanks;
