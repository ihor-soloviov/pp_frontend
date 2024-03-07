import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { nanoid } from 'nanoid';
import Popup from '../Popup/Popup';

import hover from '../../../src/assets/radiobuttons/hover.svg';
import selected from '../../../src/assets/radiobuttons/selected.svg';
import { updateAddress } from '../../utils/addresses';
import userStore from '../../store/user-store';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { url } from '../../api';

import './AddressModal.scss';
import { observer } from 'mobx-react-lite';

const AddressModal = observer(
  ({
    closeModal,
    setIsAdressesUpdating,
    isEdit,
    setIsEdit,
    adresses,
    currentAddressId,
    setCurrentAddressId,
  }) => {
    const { token, addToAdresses } = userStore;

    const [currentAddressState, setCurrentAddressState] = useState(null);

    const [currentOption, setCurrentOption] = useState(null);
    const [selectedOption, setSelectedOption] = useState('house');

    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
    };

    const formSubmit = async (data) => {
      try {
        if (!isEdit) {
          const dataWithId = { ...data, adressType: selectedOption, addressId: nanoid() };
          const JSONdata = JSON.stringify({ token: token, data: dataWithId });

          await axios.post(`${url}/api/addresses`, JSONdata, {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
            },
          });
        }

        await updateAddress(token, {
          ...data,
          adressType: selectedOption,
          addressId: currentAddressId,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsAdressesUpdating(true);
        setSelectedOption('');
        closeModal();
      }
    };

    const { handleSubmit, errors, touched, getFieldProps, setFieldValue } = useFormik({
      initialValues: {
        adressName: '',
        comment: '',
        entranceCode: '',
        entranceNumber: '',
        flatNumber: '',
        floar: '',
        homeNumber: '',
        streetName: '',
      },
      validationSchema: Yup.object({
        adressName: Yup.string()
          .matches(/^[a-zA-Zа-яА-ЯїЇіІєЄёЁґҐ\s]*$/, 'Вкажіть коректне значення')
          .required(`Обов'язкове поле`),
        entranceCode: Yup.number().typeError('Вкажіть коректне значення'),
        entranceNumber: Yup.number().typeError('Вкажіть коректне значення'),
        flatNumber: Yup.number().typeError('Вкажіть коректне значення'),
        floar: Yup.number().typeError('Вкажіть коректне значення'),
        homeNumber: Yup.number()
          .typeError('Вкажіть коректне значення')
          .required(`Обов'язкове поле`),
        streetName: Yup.string()
          .matches(/^[a-zA-Zа-яА-ЯїЇіІєЄёЁґҐ\s]*$/, 'Вкажіть коректне значення')
          .required(`Обов'язкове поле`),
        comment: Yup.string(),
      }),
      onSubmit: (values) => {
        addToAdresses({ address: values });

        formSubmit(values);
        isEdit && setIsEdit(!isEdit);
        setCurrentAddressId(null);
      },
    });
    const currentAddress =
      adresses && Array.isArray(adresses)
        ? adresses.find((address) => address.addressId === currentAddressId)
        : null;

    useEffect(() => {
      currentAddress && setCurrentAddressState(currentAddress);
    }, [adresses, currentAddressId, currentAddress]);

    useEffect(() => {
      if (currentAddress) {
        setCurrentOption(currentAddress.adressType);
        setSelectedOption(currentOption);
      }
    }, [currentAddress, currentOption]);

    useEffect(() => {
      const setFormValues = (address) => {
        if (address) {
          setFieldValue('adressName', address.adressName || '');
          setFieldValue('comment', address.comment || '');
          setFieldValue('entranceCode', address.entranceCode || '');
          setFieldValue('entranceNumber', address.entranceNumber || '');
          setFieldValue('flatNumber', address.flatNumber || '');
          setFieldValue('floar', address.floar || '');
          setFieldValue('homeNumber', address.homeNumber || '');
          setFieldValue('streetName', address.streetName || '');
        }
      };
      currentAddressState && setFormValues(currentAddress);
    }, [currentAddress, setFieldValue, currentAddressState]);
    return (
      <>
        <Popup
          setCurrentAddressState={setCurrentAddressState}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          setCurrentAddressId={setCurrentAddressId}
          closeModal={closeModal}
        >
          <div className='modal-content'>
            <h2 className='modal-content--title'>
              {isEdit ? 'Редагувати адресу' : 'Додати адресу'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className='modal-grid'>
                <div className='modal-grid--item-0 grid-item'>
                  <p className='grid-item__text'>Назва адреси</p>
                  <label className='form_item--label'>
                    <input
                      type='text'
                      placeholder='Назва адреси'
                      {...getFieldProps('adressName')}
                    />
                  </label>
                  {touched.adressName && errors.adressName && (
                    <p className='test-error-text'>{errors.adressName}</p>
                  )}
                </div>
                <div className='modal-grid--item-1 grid-item'>
                  <p className='grid-item__text'>Вулиця</p>
                  <label className='form_item--label'>
                    <input type='text' placeholder='Вулиця' {...getFieldProps('streetName')} />
                  </label>
                  {touched.streetName && errors.streetName && (
                    <p className='test-error-text'>{errors.streetName}</p>
                  )}
                </div>
                <div className='modal-grid--item-2 grid-item'>
                  <p className='grid-item__text'>№ Будинку</p>
                  <label className='form_item--label'>
                    <input type='text' placeholder='№ Будинку' {...getFieldProps('homeNumber')} />
                  </label>
                  {touched.homeNumber && errors.homeNumber && (
                    <p className='test-error-text'>{errors.homeNumber}</p>
                  )}
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
                          {...getFieldProps('flatNumber')}
                        />
                      </label>
                      {touched.flatNumber && errors.flatNumber && (
                        <p className='test-error-text'>{errors.flatNumber}</p>
                      )}
                    </div>
                    <div className='flat-grid--item-1 grid-item'>
                      <p className='grid-item__text'>Парадна</p>
                      <label className='form_item--label'>
                        <input
                          type='text'
                          placeholder='Парадна'
                          {...getFieldProps('entranceNumber')}
                        />
                      </label>
                      {touched.entranceNumber && errors.entranceNumber && (
                        <p className='test-error-text'>{errors.entranceNumber}</p>
                      )}
                    </div>
                    <div className='flat-grid--item-2 grid-item'>
                      <p className='grid-item__text'>Код</p>
                      <label className='form_item--label'>
                        <input type='text' placeholder='Код' {...getFieldProps('entranceCode')} />
                      </label>
                    </div>
                    <div className='flat-grid--item-3 grid-item'>
                      <p className='grid-item__text'>Поверх</p>
                      <label className='form_item--label'>
                        <input type='text' placeholder='Поверх' {...getFieldProps('floar')} />
                      </label>
                      {touched.floar && errors.floar && (
                        <p className='test-error-text'>{errors.floar}</p>
                      )}
                    </div>
                  </div>
                )}
                <div className='modal-grid--item-9 grid-item'>
                  <p className='grid-item__text'>Коментар</p>
                  <label className='form_item--label'>
                    <textarea
                      placeholder='Можете тут написати будь-що:)'
                      rows={1}
                      {...getFieldProps('comment')}
                    />
                  </label>
                  {touched.comment && errors.comment && (
                    <p className='test-error-text'>{errors.comment}</p>
                  )}
                </div>
              </div>
              <div className='form-button'>
                <button className='btn-main ' type='submit'>
                  Зберегти зміни
                </button>
              </div>
            </form>
          </div>
        </Popup>
      </>
    );
  },
);

export default AddressModal;
