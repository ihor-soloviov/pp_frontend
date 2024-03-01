import React from 'react'
import Checkbox from '../../../components/Inputs/Checkbox';
import InputTextArea from '../../../components/Inputs/InputTextArea';

export const OrderComment = React.memo(({ formData, handleFormValueChange }) => {
  const { withoutDevices, personCount, comment, doNotCall } = formData;
  return (
    <section className="order-page__section">
      <h3 className='order-page__header'>Додатково</h3>
      <section style={{ alignItems: "flex-start" }} className="order-page__section-inputs order-page__section-inputs-row">
        <div className="order-page__block">
          <span>Кількість персон:</span>
          <Checkbox
            isChecked={withoutDevices}
            onCheckboxChange={() =>
              handleFormValueChange("withoutDevices", !withoutDevices)
            }
            label={"Без приборів"}
          />
        </div>
        <div className="order-page__block">
          <span>Кількість персон:</span>
          <div className="counter">
            <div
              className="counter__btn"
              onClick={() => {
                if (personCount > 1) {
                  handleFormValueChange("personCount", personCount - 1);
                }
              }}
            >
              -
            </div>
            <div className="counter__value">{personCount}</div>
            <div
              className="counter__btn"
              onClick={() =>
                handleFormValueChange("personCount", personCount + 1)
              }
            >
              +
            </div>
          </div>
        </div>
      </section>
      <section className="order-page__section-inputs">
        <InputTextArea
          name={"Коментар до замовлення"}
          placeholder={"Можете тут написати будь-що:)"}
          value={comment}
          onChange={(value) => handleFormValueChange("comment", value)}
        />
      </section>
      <section className="order-page__section-inputs">
        <div className="order-page__block">
          <Checkbox
            isChecked={doNotCall}
            onCheckboxChange={() =>
              handleFormValueChange("doNotCall", !doNotCall)
            }
            label={"Не передзвонювати мені"}
          />
        </div>
      </section>
    </section>
  )
})

