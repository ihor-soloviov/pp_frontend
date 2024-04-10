import React from 'react'
import { observer } from 'mobx-react-lite';
import InputText from '../../../components/Inputs/InputText'
import InputNumber from '../../../components/Inputs/InputNumber'
import shoppingCartStore from '../../../store/shoping-cart-store';

export const OrderContacts = observer(({ name, number }) => {
  const { handleFormValueChange } = shoppingCartStore

  return (
    <section className="order-page__section">
      <h3 className='order-page__header'>Контакти</h3>
      <div className="order-page__section-inputs">
        <InputText
          name={"Ваше ім’я"}
          placeholder={"Ваше ім’я"}
          inputValue={name}
          value={name}
          onChange={(value) => handleFormValueChange("name", value)}
        />
        <InputNumber
          value={number}
          inputValue={number}
          onChange={(value) => handleFormValueChange("number", value)}
        />
      </div>
    </section>
  )
})
