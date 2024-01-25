//Import React
import React from 'react';

//Import Componentsyarn
import InputMask from 'react-input-mask';

//Import Styles
import './InputNumber.scss';

const InputNumber = (props) => {

  return (
    <label className='inputNumber' htmlFor='inputNumber'>
      <span>Телефон</span>
      <InputMask
        value={props.inputValue && props.inputValue}
        mask='+380 (99) 999 99 99'
        type="tel"
        pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
        id='inputNumber'
        placeholder='+380 (__) ___ __ __'
        onChange={(e) => props.onChange(e.target.value)}
      />
    </label>
  );
};

export default InputNumber;
