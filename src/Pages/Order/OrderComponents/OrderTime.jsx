import React from 'react';
import RadioButton from '../../../components/RadioButton/RadioButton';
import { timeArray } from '../time';
import { filterTimeArray } from '../OrderFunctions/OrderTools';
import { CustomSelect } from '../../../components/CustomSelect/CustomSelect';
import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import '../../../components/Inputs/InputText.scss';
import shoppingCartStore from '../../../store/shoping-cart-store';

const timeOptions = filterTimeArray(timeArray);

export const OrderTime = observer(() => {
  const { orderFormData, handleFormValueChange } = shoppingCartStore
  const { deliveryTime } = orderFormData;

  const [dropTime, setDropTime] = useState(null);

  const handleChangeTime = (e) => {
    setDropTime(e.value);
    handleFormValueChange('selectedTime', e.value);
  };

  return (
    <section className='order-page__section'>
      <h3 className='order-page__header'>Час отримання</h3>
      <section className='order-page__section-inputs'>
        <RadioButton
          data={[
            { id: 1, value: 'На зараз', label: 'На зараз' },
            {
              id: 2,
              value: 'Вказати точний час',
              label: 'Вказати точний час',
            },
          ]}
          selectedOption={deliveryTime}
          onOptionChange={(event) => handleFormValueChange('deliveryTime', event.target.value)}
          column
        />
        {deliveryTime === 'Вказати точний час' && (
          <label className='inputText'>
            <span>{'Час'}</span>
            <CustomSelect
              className={'cityDrop time'}
              placeholder={'Час'}
              options={timeOptions}
              value={dropTime && dropTime}
              handleChange={handleChangeTime}
            />
          </label>
        )}
      </section>
    </section>
  );
});
