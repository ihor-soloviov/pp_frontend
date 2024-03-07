//Import React
import React from 'react';

//Import Style
import './popup.scss';

const Popup = ({
  children,
  closeModal,
  small,
  isEdit,
  setIsEdit,
  setCurrentAddressId,
  setCurrentAddressState,
}) => {
  return (
    <div className={`popup ${small && 'popup-small'}`}>
      <div className={`popup__content ${small && 'popup__content-small'}`}>
        <button
          className='popup__close'
          onClick={() => {
            console.log('clic');
            if (isEdit) {
              setIsEdit(!isEdit);
              setCurrentAddressId(null);
              setCurrentAddressState(null);
            }

            closeModal();
          }}
        >
          <svg
            width='12'
            height='12'
            viewBox='0 0 12 12'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M6.0006 4.82166L10.1256 0.696655L11.3039 1.87499L7.17893 5.99999L11.3039 10.125L10.1256 11.3033L6.0006 7.17832L1.8756 11.3033L0.697266 10.125L4.82227 5.99999L0.697266 1.87499L1.8756 0.696655L6.0006 4.82166Z'
              fill='#12130F'
            />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Popup;
