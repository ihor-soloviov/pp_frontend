import React from 'react'

import InputText from '../../../components/Inputs/InputText'
import InputNumber from '../../../components/Inputs/InputNumber'

export const OrderContacts = React.memo(({ name, number, handleFormValueChange }) => {

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
