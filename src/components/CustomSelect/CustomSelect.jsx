import React from 'react'
import sprite from '../../assets/images/sprite.svg';
import Dropdown from 'react-dropdown';
import "./CustomSelect.scss"

export const CustomSelect = ({ options, value, handleChange, className, placeholder }) => (
  <Dropdown
    className={`${className}`}
    placeholder={placeholder}
    options={options}
    value={value}
    onChange={handleChange}
    arrowClosed={
      <svg className='iconArrow'>
        <use href={sprite + '#icon-arrow'}></use>
      </svg>
    }
    arrowOpen={
      <svg className='iconArrowRotate'>
        <use href={sprite + '#icon-arrow'}></use>
      </svg>
    }
  />
)

