import React, { useState, useEffect } from 'react';
import InputText from '../../../components/Inputs/InputText';
import RadioButton from '../../../components/RadioButton/RadioButton';
import { observer } from 'mobx-react-lite';
import userStore from '../../../store/user-store';
import shoppingCartStore from '../../../store/shoping-cart-store';
import { CustomSelect } from '../../../components/CustomSelect/CustomSelect';
export const OrderAddress = observer(({ formData, handleFormValueChange }) => {
  const { floor, buildingCode, entrance, apartment, houseNumber, street, howToReciveOrder } =
    formData;
  const { setDeliveryPrice } = shoppingCartStore;

  const { adresses } = userStore;

  const addressOptions = adresses.map((address) => ({
    value: address.addressId,
    label: address.adressName,
    id: address.addressId,
  }));

  const [dropAddress, setDropAddress] = useState(null);

  const [currentAddressInfo, setCurrentAddressInfo] = useState(null);

  console.log('dropAddress', dropAddress);

  console.log('currentAddressState', currentAddressInfo);

  const handleChangeAddress = (e) => {
    setDropAddress(e.value);
  };

  useEffect(() => {
    const allAddresses =
      dropAddress &&
      adresses.map((address) => ({
        ...address,
      }));

    const currentAddressInfo =
      allAddresses && allAddresses.find((address) => address.addressId === dropAddress);

    currentAddressInfo && setCurrentAddressInfo(currentAddressInfo);
  }, [adresses, dropAddress]);

  return (
    <section className='order-page__section'>
      <h3 className='order-page__header'>Спосіб отримання замовлення</h3>
      {/*<section className="order-page__section-inputs">
        <label className='inputText'>
          <span>Збережені адреси</span>
          <CustomSelect placeholder="Оберіть адресу" value={selectedAddress} options={addressOptions} />
        </label>
  </section>*/}
      <section className='order-page__section-inputs order-page__section-inputs-row'>
        {adresses.length === 0 ? (
          <>
            <InputText
              name={'Вулиця'}
              placeholder={'Вулиця'}
              value={street}
              onChange={(value) => handleFormValueChange('street', value)}
            />
            <InputText
              name={'№ Будинку'}
              placeholder={'№ Будинку'}
              value={houseNumber}
              onChange={(value) => handleFormValueChange('houseNumber', value)}
            />
          </>
        ) : (
          <CustomSelect
            className={'cityDrop address'}
            placeholder={'Збережні адреси'}
            options={addressOptions}
            value={dropAddress}
            handleChange={handleChangeAddress}
          />
        )}
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
            value={apartment}
            onChange={(value) => handleFormValueChange('apartment', value)}
          />

          <InputText
            name={'Парадна'}
            placeholder={'№ Парадної'}
            value={entrance}
            onChange={(value) => handleFormValueChange('entrance', value)}
          />
          <InputText
            name={'Код'}
            placeholder={'Код'}
            currentValue={
              currentAddressInfo &&
              currentAddressInfo.entranceCode &&
              currentAddressInfo.entranceCode
            }
            value={buildingCode}
            onChange={(value) => handleFormValueChange('buildingCode', value)}
          />
          <InputText
            name={'Поверх'}
            placeholder={'Поверх'}
            value={floor}
            onChange={(value) => handleFormValueChange('floor', value)}
          />
        </section>
      )}
    </section>
  );
});
