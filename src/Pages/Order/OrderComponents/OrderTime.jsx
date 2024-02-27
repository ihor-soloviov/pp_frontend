import React from 'react'
import RadioButton from '../../../components/RadioButton/RadioButton'
import InputSelector from '../../../components/Inputs/InputSelector'
import { timeArray } from '../time'
import { filterTimeArray } from '../OrderFunctions/OrderTools';

const time = filterTimeArray(timeArray);

export const OrderTime = React.memo(({ handleFormValueChange, formData }) => {
  const { deliveryTime, selectedTime } = formData
  return (
    <section className="order-page__section">
      <h3 className='order-page__header'>Час отримання</h3>
      <section className="order-page__section-inputs">
        <RadioButton
          data={[
            { id: 1, value: "На зараз", label: "На зараз" },
            {
              id: 2,
              value: "Вказати точний час",
              label: "Вказати точний час",
            },
          ]}
          selectedOption={deliveryTime}
          onOptionChange={(event) =>
            handleFormValueChange("deliveryTime", event.target.value)
          }
          column
        />
        {deliveryTime === "Вказати точний час" && (
          <InputSelector
            name={"Час"}
            placeholder={"Час"}
            data={time}
            value={selectedTime}
            onChange={(value) => handleFormValueChange("selectedTime", value)}
          />
        )}
      </section>
    </section>
  )
})
