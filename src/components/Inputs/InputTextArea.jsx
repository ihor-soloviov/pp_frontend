//Import React
import React from 'react';

//Import Styles
import './InputTextArea.scss';

const InputTextArea = (props) => {
  return (
    <label className={`inputTextArea`}>
      <span>{props.name}</span>
      <textarea
        type='textarea'
        placeholder={props.placeholder}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </label>
  );
};
export default InputTextArea;
