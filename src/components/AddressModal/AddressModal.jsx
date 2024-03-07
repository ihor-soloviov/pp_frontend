import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { nanoid } from 'nanoid';
import Popup from '../Popup/Popup';

import hover from '../../../src/assets/radiobuttons/hover.svg';
import selected from '../../../src/assets/radiobuttons/selected.svg';
import { updateAddress } from '../../utils/addresses';
import userStore from '../../store/user-store';

import axios from 'axios';
import { url } from '../../api';

import './AddressModal.scss';
import { observer } from 'mobx-react-lite';

const AddressModal = observer(
  ({
    closeModal,
    isModalOpen,
    setIsAdressesUpdating,
    isEdit,
    setIsEdit,
    adresses,
    currentAddressId,
    setCurrentAddressId,
  }) => {
    const { token, addToAdresses } = userStore;

    const currentAddress =
      isEdit && adresses && currentAddressId
        ? adresses.find((address) => address.addressId === currentAddressId)
        : null;

    console.log('currentAddress', { ...currentAddress });

    const [selectedOption, setSelectedOption] = useState('');

    const {
      register,
      formState: { errors, isValid },
      handleSubmit,
      reset,
    } = useForm({ mode: 'onBlur' });

    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
    };

    const onSubmit = (data, e) => {
      addToAdresses({ address: data });
      formSubmit(data, e);
    };

    const formSubmit = async (data, e) => {
      e.preventDefault();
      try {
        if (!isEdit) {
          const dataWithId = { ...data, addressId: nanoid() };
          const JSONdata = JSON.stringify({ token: token, data: dataWithId });
          console.log('JSONdata', data);

          await axios.post(`${url}/api/addresses`, JSONdata, {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
            },
          });
        }

        await updateAddress(token, data);

        setIsAdressesUpdating(true);
      } catch (error) {
        console.log(error);
      } finally {
        reset();
        setSelectedOption('');
        closeModal();
      }
    };

    return (
      <>
        {isModalOpen && (
          <Popup
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            setCurrentAddressId={setCurrentAddressId}
            closeModal={closeModal}
          >
            <div className='modal-content'>
              <h2 className='modal-content--title'>
                {isEdit ? 'Редагувати адресу' : 'Додати адресу'}
              </h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='modal-grid'>
                  <div className='modal-grid--item-0 grid-item'>
                    <p className='grid-item__text'>Назва адреси</p>
                    <label className='form_item--label'>
                      <input
                        type='text'
                        placeholder='Назва адреси'
                        {...register('adressName', {
                          required: true,
                        })}
                      />
                    </label>
                    {errors?.address && <p>Error!</p>}
                  </div>
                  <div className='modal-grid--item-1 grid-item'>
                    <p className='grid-item__text'>Вулиця</p>
                    <label className='form_item--label'>
                      <input
                        type='text'
                        placeholder='Вулиця'
                        {...register('streetName', {
                          required: true,
                          pattern: /^[a-zA-Zа-яА-ЯїЇіІєЄёЁґҐ\s]*$/,
                        })}
                      />
                    </label>
                    <div height={40}>{errors?.street && <p>Error!</p>}</div>
                  </div>
                  <div className='modal-grid--item-2 grid-item'>
                    <p className='grid-item__text'>№ Будинку</p>
                    <label className='form_item--label'>
                      <input
                        type='text'
                        placeholder='№ Будинку'
                        {...register('homeNumber', {
                          required: true,
                        })}
                      />
                    </label>
                  </div>
                  <div className='modal-grid--item-3 grid-item grid-radio'>
                    <label className='radio'>
                      <div
                        className='radio-button'
                        onClick={() => handleOptionChange({ target: { value: 'flat' } })}
                      >
                        {selectedOption === 'flat' ? (
                          <img src={selected} alt='flat' />
                        ) : (
                          <img src={hover} alt='house' />
                        )}
                      </div>
                      <p>Квартира</p>
                    </label>
                  </div>
                  <div className='modal-grid--item-4 grid-item grid-radio'>
                    <label className='radio'>
                      <div
                        className='radio-button'
                        onClick={() => handleOptionChange({ target: { value: 'house' } })}
                      >
                        {selectedOption === 'house' ? (
                          <img src={selected} alt='flat' />
                        ) : (
                          <img src={hover} alt='house' />
                        )}
                      </div>
                      <p>Приватний будинок</p>
                    </label>
                  </div>
                  {selectedOption === 'flat' && (
                    <div className='modal-grid--item-5 flat-grid'>
                      <div className='flat-grid--item-0 grid-item'>
                        <p className='grid-item__text'>Квартира</p>
                        <label className='form_item--label'>
                          <input
                            type='text'
                            placeholder='Квартира'
                            {...register('flatNumber', {
                              required: true,
                            })}
                          />
                        </label>
                      </div>
                      <div className='flat-grid--item-1 grid-item'>
                        <p className='grid-item__text'>Парадна</p>
                        <label className='form_item--label'>
                          <input
                            type='text'
                            placeholder='Парадна'
                            {...register('entranceNumber', {
                              required: true,
                            })}
                          />
                        </label>
                      </div>
                      <div className='flat-grid--item-2 grid-item'>
                        <p className='grid-item__text'>Код</p>
                        <label className='form_item--label'>
                          <input
                            type='text'
                            placeholder='Код'
                            {...register('entranceCode', {
                              required: true,
                            })}
                          />
                        </label>
                      </div>
                      <div className='flat-grid--item-3 grid-item'>
                        <p className='grid-item__text'>Поверх</p>
                        <label className='form_item--label'>
                          <input
                            type='text'
                            placeholder='Поверх'
                            {...register('floar', {
                              required: true,
                            })}
                          />
                        </label>
                      </div>
                    </div>
                  )}
                  <div className='modal-grid--item-9 grid-item'>
                    <p className='grid-item__text'>Коментар</p>
                    <label className='form_item--label'>
                      <textarea
                        placeholder='Можете тут написати будь-що:)'
                        rows={1}
                        {...register('comment')}
                      />
                    </label>
                  </div>
                </div>
                <div className='form-button'>
                  <button className='btn-main ' type='submit' disabled={!isValid}>
                    Зберегти зміни
                  </button>
                </div>
              </form>
            </div>
          </Popup>
        )}
      </>
    );
  },
);

export default AddressModal;
