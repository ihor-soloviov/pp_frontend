import React, { useState } from 'react';
import InputText from '../../../components/Inputs/InputText';
import { CustomSelect } from '../../../components/CustomSelect/CustomSelect';

export const OrderPaymentType = ({ formData, handleFormValueChange }) => {
  const { bonus, change } = formData;
  const [payment, setPayment] = useState({ label: 'Онлайн', value: 'Онлайн' });

  const handleChangePayment = (e) => {
    setPayment(e);
    handleFormValueChange('paymentMethod', e.value);
  };

  return (
    <section className='order-page__section'>
      <h3 className='order-page__header'>Спосіб оплати</h3>
      <div className='order-page__section-inputs'>
        <InputText
          name={'Використати бонуси'}
          placeholder={'0'}
          value={bonus}
          onChange={(value) => handleFormValueChange('bonus', value)}
        />
      </div>
      <div className='order-page__section-inputs order-page__section-inputs-row'>
        <label className='inputText'>
          <span>Оплата</span>
          <CustomSelect
            className={`cityDrop promo`}
            placeholder='Онлайн'
            value={payment}
            options={['Онлайн', 'Готівка']}
            handleChange={handleChangePayment}
          />
        </label>
        <InputText
          name={'Решта з'}
          placeholder={'0'}
          value={change}
          onChange={(value) => handleFormValueChange('change', value)}
        />
      </div>
    </section>
  );
};
