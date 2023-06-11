import React from 'react';

import './SelectCity.scss';
import { useDispatch } from 'react-redux';
import { updateCity } from '../../store/userSlice';
import { cityModalUpdateState } from '../../store/modalsSlice';

const SelectCity = () => {
  const dispatch = useDispatch();
  return (
    <div className='select-city'>
      <div className='select-city__content'>
        <svg
          width='65'
          height='65'
          viewBox='0 0 65 65'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <circle
            cx='32.5'
            cy='32.5'
            r='32.5'
            fill='#DF643A'
            fillOpacity='0.1'
          />
          <path
            d='M39.364 37.364L33 43.7279L26.636 37.364C23.1213 33.8492 23.1213 28.1508 26.636 24.636C30.1508 21.1213 35.8492 21.1213 39.364 24.636C42.8787 28.1508 42.8787 33.8492 39.364 37.364ZM33 33C34.1046 33 35 32.1046 35 31C35 29.8954 34.1046 29 33 29C31.8954 29 31 29.8954 31 31C31 32.1046 31.8954 33 33 33Z'
            fill='#DF643A'
          />
        </svg>
        <h4 className='title__h4'>Оберіть своє місто</h4>
        <div className='select-city__buttons'>
          <button
            className='select-city__btn'
            onClick={() => {
              dispatch(updateCity({ city: 'Одеса' }));
              dispatch(cityModalUpdateState({ state: false }));
            }}
          >
            Одеса
          </button>
          <button
            className='select-city__btn'
            onClick={() => {
              dispatch(updateCity({ city: 'Ужгород' }));
              dispatch(cityModalUpdateState({ state: false }));
            }}
          >
            Ужгород
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectCity;
