//Import React
import React from 'react';

//Import Styles
import './InputText.scss';

const InputText = ({ isStreet = false, id, autocomplete = 'on', name, placeholder, value, onChange, disabled }) => {
  return (
    <label className={`inputText`}>
      <span>{name}</span>
      <input
        autoComplete={autocomplete}
        id={id && id}
        type='text'
        placeholder={placeholder}
        value={value && value}
        onChange={(e) => {
          if (isStreet) {
            const { value: inputValue, selectionStart, selectionEnd } = e.target;

            // Перевіряємо, чи курсор знаходиться в кінці тексту
            if (selectionStart === inputValue.length && selectionEnd === inputValue.length) {
              // Якщо довжина нового введеного тексту менша, ніж поточна, і курсор знаходиться в кінці
              if (inputValue.length < value.length) {
                onChange(''); // Очищуємо інпут
                return;
              }
            }
          }
          onChange(e.target.value)
        }}
        disabled={disabled}
      />
    </label>
  );
};

export default InputText;
