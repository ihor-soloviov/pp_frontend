import React from 'react'
import InputText from '../../../components/Inputs/InputText'
import InputSelector from '../../../components/Inputs/InputSelector'

export const OrderPaymentType = ({ formData, handleFormValueChange }) => {
  const { bonus, paymentMethod, change } = formData;
  return (
    <section className="order-page__section">
      <h3>Спосіб оплати</h3>
      <div className="order-page__section-inputs">
        <InputText
          name={"Використати бонуси"}
          placeholder={"0"}
          value={bonus}
          onChange={(value) => handleFormValueChange("bonus", value)}
        />
      </div>
      <div className="order-page__section-inputs order-page__section-inputs-row">
        <InputSelector
          name={"Оплата"}
          placeholder={"Онлайн"}
          data={[
            { id: 0, label: "Онлайн", value: "Онлайн" },
            { id: 1, label: "Готівка", value: "Готівка" },
          ]}
          value={paymentMethod}
          onChange={(value) => handleFormValueChange("paymentMethod", value)}
        />
        <InputText
          name={"Сдача с"}
          placeholder={"500"}
          value={change}
          onChange={(value) => handleFormValueChange("change", value)}
        />
      </div>
    </section>
  )
}

