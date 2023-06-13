import React from 'react';

//Import style
import './PopupActions.scss';
import { useDispatch } from 'react-redux';
import { setActions } from '../../store/popupActionsSlice';

const PopupActions = ({ action }) => {

const dispatch = useDispatch()

  return (
    <div className='popup-actions'>
      <div className='popup-actions__content'>
        <div className='popup-actions__ico'>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <circle cx='12' cy='12' r='12' fill='#55CB99' />
            <g clip-path='url(#clip0_390_8333)'>
              <path
                d='M10.6665 14.1148L16.7945 7.98608L17.7378 8.92875L10.6665 16.0001L6.42383 11.7574L7.36649 10.8148L10.6665 14.1148Z'
                fill='#12130F'
              />
            </g>
            <defs>
              <clipPath id='clip0_390_8333'>
                <rect
                  width='16'
                  height='16'
                  fill='white'
                  transform='translate(4 4)'
                />
              </clipPath>
            </defs>
          </svg>
        </div>
        <p>{action}</p>
        <div className='popup-actions__close' onClick={() => dispatch(setActions({action: ''}))}>
          <svg
            width='10'
            height='10'
            viewBox='0 0 10 10'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M5.00048 4.05732L8.30048 0.757324L9.24315 1.69999L5.94315 4.99999L9.24315 8.29999L8.30048 9.24266L5.00048 5.94266L1.70048 9.24266L0.757812 8.29999L4.05781 4.99999L0.757812 1.69999L1.70048 0.757324L5.00048 4.05732Z'
              fill='white'
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PopupActions;
