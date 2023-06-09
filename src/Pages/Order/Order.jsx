import React, { useState } from 'react';
import Container from '../../components/Container/Container';
import './Order.scss';

//Import components
import InputText from '../../components/Inputs/InputText';
import InputNumber from '../../components/Inputs/InputNumber';
import InputSelector from '../../components/Inputs/InputSelector';

const Order = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  return (
    <Container>
      <div className='order-page'>
        <div className='order-page__content'>
          <div className='order-page__form'>
            <div className='order-page__section'>
              <h3>Контакти</h3>
              <div className='order-page__section-inputs'>
                <InputText
                  name={'Ваше ім’я'}
                  placeholder={'Ваше ім’я'}
                  onChange={(value) => setName(value)}
                />
                <InputNumber onChange={(value) => setNumber(value)} />
              </div>
            </div>
            <div className='order-page__section'>
              <h3>Спосіб отримання замовлення</h3>
              <div className='order-page__section-inputs order-page__section-inputs-row'>
                <InputText
                  name={'Вулиця'}
                  placeholder={'Вулиця'}
                  onChange={(value) => setName(value)}
                />
                <InputText
                  name={'№ Будинку'}
                  placeholder={'№ Будинку'}
                  onChange={(value) => setName(value)}
                />
              </div>
            </div>

            <div className='order-page__section'>
              <h3>Час отримання</h3>
              <div className='order-page__section-inputs order-page__section-inputs-row'>
                <InputSelector
                  name={'Час'}
                  placeholder={'Час'}
                  onChange={(value) => setName(value)}
                />
              </div>
            </div>


            
          </div>
          <ul className='order-page__positions'></ul>
        </div>
      </div>
    </Container>
  );
};

export default Order;
