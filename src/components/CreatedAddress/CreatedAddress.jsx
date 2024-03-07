import React from 'react';
import cross from '../../../src/assets/Vector.svg';
import userStore from '../../store/user-store';
import { deleteAddress } from '../../utils/addresses';
import { observer } from 'mobx-react-lite';
import { getFlat, getStreet } from './utils';

const CreatedAddress = observer(
  ({ adress, openModal, setIsAdressesUpdating, isEdit, setIsEdit, setCurrentAddressId }) => {
    const { token, removeAdresses } = userStore;

    const flat = getFlat(adress);
    const street = getStreet(adress.streetName, adress.homeNumber, flat);

    return (
      <div id={adress.addressId} className='addresses_created'>
        <div className='addresses_created__container'>
          <div className='addresses_created__container--top'>
            <div className='top-name'>
              <h4>{adress.adressName}</h4>
              <button
                onClick={() => {
                  removeAdresses(adress.addressId);
                  deleteAddress(token, adress, setIsAdressesUpdating);
                }}
              >
                <img src={cross} alt='cross' />
              </button>
            </div>
            <div className='top-street'>
              <p>
                <span>Вулиця</span> {street}
              </p>
            </div>
          </div>
          <div className='addresses_created__container--bot'>
            <span>Комментар:</span>
            <p>{adress.comment}</p>
            <button
              onClick={() => {
                setIsEdit(!isEdit);
                setCurrentAddressId(adress.addressId);
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
