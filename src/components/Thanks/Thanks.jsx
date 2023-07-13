import React from 'react';
import './Thanks.scss';
import BtnSecondary from '../Buttons/BtnSecondary';
import { useNavigate } from 'react-router-dom';

const Thanks = ({ orderId, deliveryTime }) => {
  const navigate = useNavigate()
  return (
    <div>
      <div className='thanks'>
        <div className='thanks__content'>
          <div className='thanks__ico'>
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M11.602 13.7599L13.014 15.1719L21.4795 6.7063L22.8938 8.12051L13.014 18.0003L6.65 11.6363L8.06421 10.2221L10.189 12.3469L11.602 13.7599ZM11.6037 10.9322L16.5563 5.97949L17.9666 7.38977L13.014 12.3424L11.6037 10.9322ZM8.77698 16.5873L7.36396 18.0003L1 11.6363L2.41421 10.2221L3.82723 11.6352L3.82604 11.6363L8.77698 16.5873Z'
                fill='#DF643A'
              />
            </svg>
          </div>
          <h4 className='title__h4'>Дякуємо</h4>
          <p className='thanks__text'>Номер вашого замовлення №{orderId}</p>
          <div className='thanks__delivery-time'>
            <p>
              Орієнтовний час отримання: <b>{deliveryTime}</b>
            </p>
          </div>
          <BtnSecondary name={'Зв’язатися з нами'} onClick={() => navigate('/contact')}fullWide />
        </div>
      </div>
    </div>
  );
};

export default Thanks;
