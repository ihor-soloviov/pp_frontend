import React from 'react';
import InputText from '../../../components/Inputs/InputText';
import { CustomSelect } from '../../../components/CustomSelect/CustomSelect';
import { observer } from 'mobx-react-lite';
import shoppingCartStore from '../../../store/shoping-cart-store';

export const OrderPaymentType = observer(({ payment, setPayment }) => {
  const { orderFormData, handleFormValueChange } = shoppingCartStore
  const { change } = orderFormData;

  const handleChangePayment = (e) => {
    setPayment(e);
    handleFormValueChange('paymentMethod', e.value);
  };

  return (
    <section className='order-page__section'>
      <h3 className='order-page__header'>Спосіб оплати</h3>
      <div className='order-page__section-inputs order-page__section-inputs-row'>
        <label className='inputText'>
          <span>Оплата</span>
          <CustomSelect
            className={`cityDrop promo`}
            placeholder='Онлайн'
            value={payment}
            options={orderFormData.howToReciveOrder === 'Самовивіз1' ? ['Онлайн', 'Готівка'] : ['Онлайн']}
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
})
