import React, { useState } from 'react';
import './Checkbox.scss'; // Подключаем файл со стилями

const Checkbox = ({ isChecked, onCheckboxChange, label }) => {
  const handleCheckboxChange = () => {
    onCheckboxChange(!isChecked);
  };

  return (
    <label className='checkbox-container'>
      <input
        type='checkbox'
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <span className='checkmark'></span>
      <span className='checkbox-label'>{label}</span>
    </label>
  );
};

export default Checkbox;
