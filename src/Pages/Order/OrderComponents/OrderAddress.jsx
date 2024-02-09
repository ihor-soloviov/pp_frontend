import React from 'react'
import InputText from '../../../components/Inputs/InputText'
import RadioButton from '../../../components/RadioButton/RadioButton'

export const OrderAddress = React.memo(({ formData, handleFormValueChange }) => {
  const { floor, buildingCode, entrance, apartment, houseNumber, street, howToReciveOrder } = formData;
  return (
    <section className="order-page__section">
      <h3>Спосіб отримання замовлення</h3>
      { /*         <section className="order-page__section-inputs">
            <InputSelector
              name={"Збережені адреси"}
              data={selectAddresses}
              placeholder={"Оберіть адресу"}
              value={formData.selectedAddress}
              onChange={(value) => handleFormValueChange("selectedAddress", value)}
            />
        </section>*/}
      <section className="order-page__section-inputs order-page__section-inputs-row">
        <InputText
          name={"Вулиця"}
          placeholder={"Вулиця"}
          value={street}
          onChange={(value) => handleFormValueChange("street", value)}
        />
        <InputText
          name={"№ Будинку"}
          placeholder={"№ Будинку"}
          value={houseNumber}
          onChange={(value) => handleFormValueChange("houseNumber", value)}
        />
      </section>
      <section className="order-page__section-inputs">
        <RadioButton
          data={[
            { id: 1, value: "До дверей", label: "До дверей" },
            {
              id: 2,
              value: "Приватний будинок",
              label: "Приватний будинок",
            },
            { id: 4, value: "Вийду до машини", label: "Вийду до машини" },
            {
              id: 3,
              value: "Самовивіз",
              label: "Самовивіз",
              info: "(Одеса, вул. Лейтенанта Шмідта 25)",
            },
          ]}
          selectedOption={howToReciveOrder}
          onOptionChange={(event) =>
            handleFormValueChange("howToReciveOrder", event.target.value)
          }
        />
      </section>
      {howToReciveOrder === "До дверей" && (
        <section className="order-page__section-inputs order-page__section-inputs-row">
          <InputText
            name={"Квартира"}
            placeholder={"№ Квартири"}
            value={apartment}
            onChange={(value) => handleFormValueChange("apartment", value)}
          />

          <InputText
            name={"Парадна"}
            placeholder={"№ Парадної"}
            value={entrance}
            onChange={(value) => handleFormValueChange("entrance", value)}
          />
          <InputText
            name={"Код"}
            placeholder={"Код"}
            value={buildingCode}
            onChange={(value) => handleFormValueChange("buildingCode", value)}
          />
          <InputText
            name={"Поверх"}
            placeholder={"Поверх"}
            value={floor}
            onChange={(value) => handleFormValueChange("floor", value)}
          />
        </section>
      )}
    </section>
  )
})
