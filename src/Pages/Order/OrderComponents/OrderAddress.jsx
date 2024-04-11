/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import InputText from '../../../components/Inputs/InputText';
import RadioButton from '../../../components/RadioButton/RadioButton';
import { observer } from 'mobx-react-lite';
import userStore from '../../../store/user-store';
import shoppingCartStore from '../../../store/shoping-cart-store';
import { CustomSelect } from '../../../components/CustomSelect/CustomSelect';
import {
  calculateDistance,
  setSpotIds,
  resetInputFields,
  pullInputFields,
  polygonPaths,
} from '../../../utils/distance';
import { Autocomplete } from '@react-google-maps/api';

import '../Order.scss';
import PopupActions from '../../../components/PopupActions/PopupActions';

const radioOptions = [
  { id: 1, value: 'До дверей', label: 'До дверей' },
  {
    id: 2,
    value: 'Приватний будинок',
    label: 'Приватний будинок',
  },
  { id: 4, value: 'Вийду до машини', label: 'Вийду до машини' },
  {
    id: 3,
    value: 'Самовивіз1',
    label: 'Самовивіз',
    info: '(Одеса, вул. Маршала Малиновскього 18)',
  },
  {
    id: 5,
    value: 'Самовивіз2',
    label: 'Самовивіз',
    info: '(Одеса, провулок Економічний 1)',
  },
]

export const OrderAddress = observer(() => {
  const { setDeliveryPrice, totalPrice, handleFormValueChange, orderFormData } = shoppingCartStore;
  const { floor, buildingCode, entrance, apartment, howToReciveOrder } = orderFormData;

  const customPolygon = new window.google.maps.Polygon({
    paths: polygonPaths,
  });

  console.log('order data', { ...orderFormData });
  const customPolygonBounds = new window.google.maps.LatLngBounds();
  customPolygon.getPath().forEach((point) => customPolygonBounds.extend(point));

  const { adresses } = userStore;

  const addressOptions = [
    { value: null, label: 'Не обирати' },
    ...adresses.map((address) => ({
      value: address.addressId,
      label: address.adressName,
      id: address.addressId,
    })),
  ];

  const [error, setError] = useState({ status: false, currentError: '' });
  const [dropAddress, setDropAddress] = useState(null);
  const [currentAddressInfo, setCurrentAddressInfo] = useState(null);
  const [isSavedAddressSelected, setIsSavedAddressSelected] = useState(false);
  const [addressInput, setAddressInput] = useState('');
  const [addressAutocomplete, setAddresstAutocomplete] = useState(null);
  const [spotOneDistance, setSpotOneDistance] = useState(null);
  const [spotTwoDistance, setSpotTwoDistance] = useState(null);

  const handleError = (newErrorState) => setError(newErrorState);

  const handleChangeAddress = (e) => {
    if (e.value === null) {
      setDropAddress(e.value);
      setCurrentAddressInfo(e.value);
      setIsSavedAddressSelected(false);
      setAddressInput('');
      resetInputFields(handleFormValueChange, setSpotOneDistance, setSpotTwoDistance);
      return
    }
    totalPrice < 500 ? setDeliveryPrice(60) : setDeliveryPrice(0);
    setDropAddress(e.value);
    setIsSavedAddressSelected(true);

  };

  const onOptionChange = (event) => {
    if (event.target.value.includes('Самовивіз')) {
      setDeliveryPrice(0);
      resetInputFields(handleFormValueChange, setSpotOneDistance, setSpotTwoDistance);
      setAddressInput('');
    } else {
      totalPrice < 500 ? setDeliveryPrice(60) : setDeliveryPrice(0);
    }

    handleFormValueChange('howToReciveOrder', event.target.value);
  };

  const handleStreetChange = (value) => {
    resetInputFields(handleFormValueChange, setSpotOneDistance, setSpotTwoDistance);
    setAddressInput(value);
  };

  const handleAutoAddressChange = () => {
    if (!addressAutocomplete) {
      return;
    }

    try {
      const place = addressAutocomplete.getPlace();
      const location = place.geometry.location;

      if (!window.google.maps.geometry.poly.containsLocation(location, customPolygon)) {
        handleError({
          status: true,
          currentError: 'Вибрана адреса знаходиться поза доступною зоною доставки',
        });
        setAddressInput('');
        return;
      }

      const { address_components: addressComponents } = place;

      if (!addressComponents) {
        handleError({
          status: true,
          currentError: 'Адреса не знайдена',
        });
        return;
      }

      const streetComponent = addressComponents.find((component) =>
        component.types.includes('route'),
      );

      const houseNumberComponent = addressComponents.find((component) =>
        component.types.includes('street_number'),
      );

      const formatedAddress = place.formatted_address;
      const streetName = streetComponent ? streetComponent.long_name : null;
      const houseNum = houseNumberComponent ? houseNumberComponent.long_name : null;

      if (!houseNumberComponent) {
        handleError({
          status: true,
          currentError: 'Вкажіть номер будинку',
        });

        setAddressInput(`${streetName}`);
        return;
      }

      if (!streetComponent) {
        handleError({
          status: true,
          currentError: 'Адреса не знайдена',
        });
        setAddressInput(`${streetName}`);
        return;
      }

      calculateDistance(formatedAddress, setSpotOneDistance, setSpotTwoDistance);
      setAddressInput(`${streetName}, ${houseNum}`);
      handleFormValueChange('street', streetName);
      handleFormValueChange('houseNumber', houseNum);
      handleError({
        status: false,
        currentError: '',
      });
    } catch (error) {
      handleError({
        status: true,
        currentError: 'Адреса не знайдена',
      });
    }
  };

  useEffect(() => {
    if (spotOneDistance !== null && spotTwoDistance !== null) {
      setSpotIds(spotOneDistance, spotTwoDistance, handleFormValueChange);
    }
  }, [spotOneDistance, spotTwoDistance]);

  useEffect(() => {
    if (howToReciveOrder.includes('Самовивіз')) {
      handleFormValueChange('spot_id', howToReciveOrder === 'Самовивіз1' ? 1 : 2);
    }
  }, [howToReciveOrder]);

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
      pullInputFields(
        currentAddressInfo,
        handleFormValueChange,
        setSpotOneDistance,
        setSpotTwoDistance,
      );
    }
  }, [adresses, dropAddress, handleFormValueChange]);

  useEffect(() => {
    const cleanup = () => {
      const autocompleteContainers = document.getElementsByClassName('pac-container');
      Array.from(autocompleteContainers).forEach((container) => {
        container.parentNode.removeChild(container);
      });
    };

    return cleanup;
  }, []);

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
          <Autocomplete
            types={['address']}
            className='autocomplete-wrap'
            onLoad={(autocomplete) => setAddresstAutocomplete(autocomplete)}
            onPlaceChanged={handleAutoAddressChange}
            options={{
              bounds: customPolygonBounds,
              strictBounds: true,

              componentRestrictions: {
                country: ['ua'],
              },
            }}
          >
            <InputText
              name={'Адреса'}
              placeholder={'Адреса'}
              value={currentAddressInfo && dropAddress ? currentAddressInfo.address : addressInput}
              onChange={handleStreetChange}
              disabled={isSavedAddressSelected}
            />
          </Autocomplete>
        </>
      </section>
      <section className='order-page__section-inputs'>
        <RadioButton
          data={radioOptions}
          selectedOption={howToReciveOrder}
          disabled={isSavedAddressSelected}
          onOptionChange={onOptionChange}
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
      {error.status && (
        <div className='popupWrapOrder'>
          <PopupActions
            action={error.currentError}
            onClick={() =>
              setError({
                status: false,
                currentError: '',
              })
            }
            error
          />
        </div>
      )}
    </section>
  );
});
