import React from 'react';
import cross from '../../../src/assets/Vector.svg';
import userStore from '../../store/user-store';
import { deleteAddress } from '../../utils/addresses';
import { observer } from 'mobx-react-lite';

const CreatedAddress = observer(
  ({ adress, openModal, setIsAdressesUpdating, isEdit, setIsEdit, setCurrentAddressId }) => {
    const { token, removeAdresses } = userStore;
    const street = adress?.address;

    return (
      <div id={adress?.addressId} className='addresses_created'>
        <div className='addresses_created__container'>
          <div className='addresses_created__container--top'>
            <div className='top-name'>
              <h4>
                {adress?.adressName?.length < 14
                  ? adress?.adressName
                  : `${adress?.adressName.slice(0, 15)}...`}
              </h4>
              <button
                onClick={() => {
                  removeAdresses(adress?.addressId);
                  deleteAddress(token, adress, setIsAdressesUpdating);
                }}
              >
                <img src={cross} alt='cross' />
              </button>
            </div>
            <div className='top-street'>
              <p>{street?.length < 33 ? street : `${street.slice(0, 33)}...`}</p>
            </div>
          </div>
          <div className='addresses_created__container--bot'>
            <span>Комментар:</span>
            <p>
              {adress?.comment?.length < 25 ? adress.comment : `${adress.comment.slice(0, 25)}...`}
            </p>
            <button
              onClick={() => {
                setIsEdit(!isEdit);
                setCurrentAddressId(adress?.addressId);
                openModal();
              }}
            >
              Редагувати
            </button>
          </div>
        </div>
      </div>
    );
  },
);

export default CreatedAddress;
