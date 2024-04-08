/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import InputText from '../../../components/Inputs/InputText';
import RadioButton from '../../../components/RadioButton/RadioButton';
import { observer } from 'mobx-react-lite';
import userStore from '../../../store/user-store';
import shoppingCartStore from '../../../store/shoping-cart-store';
import { CustomSelect } from '../../../components/CustomSelect/CustomSelect';

import { Autocomplete } from '@react-google-maps/api';

import '../Order.scss';
export const OrderAddress = observer(({ formData, handleFormValueChange, handleError }) => {
  const {
    floor,
    buildingCode,
    entrance,
    apartment,
    houseNumber,
    street,
    howToReciveOrder,
    spot_id,
  } = formData;
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

  const resetInputFields = () => {
    handleFormValueChange('street', '');
    handleFormValueChange('houseNumber', '');
    handleFormValueChange('howToReciveOrder', '');
    handleFormValueChange('floor', '');
    handleFormValueChange('buildingCode', '');
    handleFormValueChange('entrance', '');
    handleFormValueChange('apartment', '');
  };
  const [dropAddress, setDropAddress] = useState(null);

  const [currentAddressInfo, setCurrentAddressInfo] = useState(null);

  const [isSavedAddressSelected, setIsSavedAddressSelected] = useState(false);

  const [streetInput, setStreetInput] = useState('');
  const [streetAutocomplete, setStreetAutocomplete] = useState(null);

  const [spotOneDistance, setSpotOneDistance] = useState(null);
  const [spotTwoDistance, setSpotTwoDistance] = useState(null);

  const handleChangeAddress = (e) => {
    if (e.value === null) {
      setDropAddress(e.value);
      setCurrentAddressInfo(e.value);
      setIsSavedAddressSelected(false);
      resetInputFields();
      return;
    }
    setDropAddress(e.value);
    setIsSavedAddressSelected(true);
  };

  const onOptionChange = (event) => {
    if (event.target.value === 'Самовивіз') {
      setDeliveryPrice(0);
      resetInputFields();
    } else {
      setDeliveryPrice(60);
    }
    handleFormValueChange('howToReciveOrder', event.target.value);
  };

  const handleStreetChange = (value) => {
    handleFormValueChange('street', '');
    handleFormValueChange('houseNumber', '');
    handleFormValueChange('spot_id', '');
    setSpotTwoDistance(null);
    setSpotTwoDistance(null);
    setStreetInput(value);
  };

  const handleAutoStreetChange = () => {
    if (!streetAutocomplete) {
      handleError('Адреса не знайдена');
      return;
    }

    const place = streetAutocomplete.getPlace();
    console.log('place', place);

    const { address_components: addressComponents } = place;
    if (!addressComponents) {
      handleError('Адреса не знайдена');
      return;
    }
    calculateDistance(place.formatted_address);

    const streetComponent = addressComponents.find((component) =>
      component.types.includes('route'),
    );
    const houseNumberComponent = addressComponents.find((component) =>
      component.types.includes('street_number'),
    );

    const streetName = streetComponent ? streetComponent.long_name : null;

    if (!streetName) {
      handleError('Вулиця не знайдена');
      return;
    }

    const houseNum = houseNumberComponent ? houseNumberComponent.long_name : null;

    setStreetInput(`${streetName}${houseNum ? ', ' + houseNum : ''}`);
    handleFormValueChange('street', streetName);

    if (houseNum) {
      handleFormValueChange('houseNumber', houseNum);
    } else {
      handleError('Номер будинку не знайдено');
    }
  };

  const compareDistances = (distance1, distance2) => {
    const value1 = parseFloat(distance1.replace(',', '.').split(' ')[0]);
    const value2 = parseFloat(distance2.replace(',', '.').split(' ')[0]);

    return value1 > value2 ? 2 : value1 < value2 ? 1 : 2;
  };

  const calculateDistance = (fullAddress) => {
    const service = new window.google.maps.DistanceMatrixService();

    const spotOne = 'вулиця Маршала Малиновскього, 18, Одеса, Одеська область, Україна, 65000';
    const spotTwo = 'Економічний провулок, 1, Одеса, Одеська область, Україна, 65000';
    service.getDistanceMatrix(
      {
        origins: [spotOne, spotTwo],
        destinations: [fullAddress],
        travelMode: 'DRIVING',
      },
      (response, status) => {
        if (status === 'OK' && response !== null) {
          const distanceOne = response.rows[0].elements[0].distance.text;
          const distanceTwo = response.rows[1].elements[0].distance.text;
          setSpotOneDistance(distanceOne);
          setSpotTwoDistance(distanceTwo);
        } else {
          console.error('Error:', status);
        }
      },
    );
  };

  const setSpotIds = () => {
    const currentSpot =
      spotOneDistance && spotTwoDistance && compareDistances(spotOneDistance, spotTwoDistance);
    console.log('spotOneDistance', spotOneDistance);
    console.log('spotTwoDistance', spotTwoDistance);
    console.log('currentSpot', currentSpot);
    handleFormValueChange('spot_id', currentSpot);
  };

  useEffect(() => {
    if (spotOneDistance !== null && spotTwoDistance !== null) {
      setSpotIds();
    }
  }, [spotOneDistance, spotTwoDistance]);

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
          <Autocomplete
            types={['address']}
            className='autocomplete-wrap'
            onLoad={(autocomplete) => setStreetAutocomplete(autocomplete)}
            onPlaceChanged={handleAutoStreetChange}
            options={{
              bounds: new window.google.maps.LatLngBounds({
                north: 46.6053,
                south: 46.3201,
                west: 30.5788,
                east: 30.8433,
              }),
              strictBounds: true,

              componentRestrictions: {
                country: ['ua'],
              },

              googleLogo: false,
              disableDefaultUI: true,
              inputStyle: {
                backgroundColor: 'lightgray',
                fontFamily: 'Arial, sans-serif',
                fontSize: '16px',
                width: '262px',
              },
              // Установка стиля для контейнера, который содержит предложения автозаполнения
              // Здесь вы можете настроить стили фона, шрифта и др.
              containerStyle: {
                backgroundColor: 'white',
                border: '1px solid black',
                borderRadius: '5px',

                zIndex: 2,
              },
              // Установка стиля для элементов списка предложений автозаполнения
              // Здесь вы можете настроить стили фона, шрифта и др.
              itemStyle: {
                padding: '10px',
                borderBottom: '1px solid gray',
                cursor: 'pointer',
              },
            }}
          >
            <InputText
              name={'Адреса'}
              placeholder={'Адреса'}
              value={
                currentAddressInfo && dropAddress ? currentAddressInfo.streetName : streetInput
              }
              onChange={handleStreetChange}
              disabled={isSavedAddressSelected}
            />
          </Autocomplete>

          {/* <InputText
            name={'№ Будинку'}
            placeholder={'№ Будинку'}
            value={currentAddressInfo && dropAddress ? currentAddressInfo.homeNumber : houseNumber}
            onChange={handleHouseNumChange}
            disabled={isSavedAddressSelected}
          /> */}
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
    </section>
  );
});
