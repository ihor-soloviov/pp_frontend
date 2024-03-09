import React, { useState, useEffect } from 'react';
import InputText from '../../../components/Inputs/InputText';
import RadioButton from '../../../components/RadioButton/RadioButton';
import { observer } from 'mobx-react-lite';
import userStore from '../../../store/user-store';
import shoppingCartStore from '../../../store/shoping-cart-store';
import { CustomSelect } from '../../../components/CustomSelect/CustomSelect';
import '../Order.scss';
export const OrderAddress = observer(({ formData, handleFormValueChange }) => {
  const { floor, buildingCode, entrance, apartment, houseNumber, street, howToReciveOrder } =
    formData;
  const { setDeliveryPrice } = shoppingCartStore;

  const { adresses } = userStore;

  const addressOptions = [
    { value: null, label: 'Не обирати' },
    ...adresses.map((address) => ({
      value: address.addressId,
      label: address.adressName,
      id: address.addressId,
    })),
  ];
  const [dropAddress, setDropAddress] = useState(null);

  const [currentAddressInfo, setCurrentAddressInfo] = useState(null);

  const [isSavedAddressSelected, setIsSavedAddressSelected] = useState(false);

  const handleChangeAddress = (e) => {
    if (e.value === null) {
      setDropAddress(e.value);
      setCurrentAddressInfo(e.value);
      setIsSavedAddressSelected(false);
      handleFormValueChange('street', '');
      handleFormValueChange('houseNumber', '');
      handleFormValueChange('howToReciveOrder', '');
      handleFormValueChange('floor', '');
      handleFormValueChange('buildingCode', '');
      handleFormValueChange('entrance', '');
      handleFormValueChange('apartment', '');
      return;
    }
    setDropAddress(e.value);
    setIsSavedAddressSelected(true);
  };

  useEffect(() => {
    const allAddresses =
      dropAddress &&
      adresses.map((address) => ({
        ...address,
      }));

    const currentAddressInfo =
      allAddresses && allAddresses.find((address) => address.addressId === dropAddress);

    if (currentAddressInfo) {
      setCurrentAddressInfo(currentAddressInfo);
      handleFormValueChange('street', currentAddressInfo.streetName);
      handleFormValueChange('houseNumber', currentAddressInfo.homeNumber);
      handleFormValueChange(
        'howToReciveOrder',
        currentAddressInfo.adressType === 'house' ? 'Приватний будинок' : 'До дверей',
      );
      handleFormValueChange('apartment', currentAddressInfo.flatNumber);
      handleFormValueChange('entrance', currentAddressInfo.entranceNumber);
      handleFormValueChange('buildingCode', currentAddressInfo.entranceCode);
      handleFormValueChange('floor', currentAddressInfo.floar);
    }
  }, [adresses, dropAddress, handleFormValueChange]);

  return (
    <section className='order-page__section'>
      <h3 className='order-page__header'>Спосіб отримання замовлення</h3>

      {adresses.length > 0 && (
        <label className='address-label'>
          Збережні адреси
          <CustomSelect
            className={'cityDrop address'}
            placeholder={'Оберіть адресу'}
            options={addressOptions}
            value={dropAddress}
            handleChange={handleChangeAddress}
          />
        </label>
      )}

      <section className='order-page__section-inputs order-page__section-inputs-row'>
        <>
          <InputText
            name={'Вулиця'}
            placeholder={'Вулиця'}
            value={currentAddressInfo && dropAddress ? currentAddressInfo.streetName : street}
            onChange={(value) => handleFormValueChange('street', value)}
            disabled={isSavedAddressSelected}
          />
          <InputText
            name={'№ Будинку'}
            placeholder={'№ Будинку'}
            value={currentAddressInfo && dropAddress ? currentAddressInfo.homeNumber : houseNumber}
            onChange={(value) => handleFormValueChange('houseNumber', value)}
            disabled={isSavedAddressSelected}
          />
        </>
      </section>
      <section className='order-page__section-inputs'>
        <RadioButton
          data={[
            { id: 1, value: 'До дверей', label: 'До дверей' },
            {
              id: 2,
              value: 'Приватний будинок',
              label: 'Приватний будинок',
            },
            { id: 4, value: 'Вийду до машини', label: 'Вийду до машини' },
            {
              id: 3,
              value: 'Самовивіз',
              label: 'Самовивіз',
              info: '(Одеса, вул. Лейтенанта Шмідта 25)',
            },
          ]}
          selectedOption={howToReciveOrder}
          disabled={isSavedAddressSelected}
          onOptionChange={(event) => {
            if (event.target.value === 'Самовивіз') {
              setDeliveryPrice(0);
            } else {
              setDeliveryPrice(60);
            }
            handleFormValueChange('howToReciveOrder', event.target.value);
          }}
        />
      </section>

      {howToReciveOrder === 'До дверей' && (
        <section className='order-page__section-inputs order-page__section-inputs-row'>
          <InputText
            name={'Квартира'}
            placeholder={'№ Квартири'}
            value={
              dropAddress && currentAddressInfo && currentAddressInfo.flatNumber
                ? currentAddressInfo.flatNumber
                : apartment
            }
            onChange={(value) => handleFormValueChange('apartment', value)}
            disabled={isSavedAddressSelected}
          />

          <InputText
            name={'Парадна'}
            placeholder={'№ Парадної'}
            value={
              dropAddress && currentAddressInfo && currentAddressInfo.entranceNumber
                ? currentAddressInfo.entranceNumber
                : entrance
            }
            onChange={(value) => handleFormValueChange('entrance', value)}
            disabled={isSavedAddressSelected}
          />
          <InputText
            name={'Код'}
            placeholder={'Код'}
            value={
              dropAddress && currentAddressInfo && currentAddressInfo.entranceCode
                ? currentAddressInfo.entranceCode
                : buildingCode
            }
            onChange={(value) => handleFormValueChange('buildingCode', value)}
            disabled={isSavedAddressSelected}
          />
          <InputText
            name={'Поверх'}
            placeholder={'Поверх'}
            value={
              dropAddress && currentAddressInfo && currentAddressInfo.floar
                ? currentAddressInfo.floar
                : floor
            }
            onChange={(value) => handleFormValueChange('floor', value)}
            disabled={isSavedAddressSelected}
          />
        </section>
      )}
    </section>
  );
});
