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
} from '../../../utils/distance';
import { Autocomplete } from '@react-google-maps/api';

import '../Order.scss';
import PopupActions from '../../../components/PopupActions/PopupActions';

export const OrderAddress = observer(() => {
  const { setDeliveryPrice, totalPrice, handleFormValueChange, orderFormData } = shoppingCartStore;
  const { floor, buildingCode, entrance, apartment, howToReciveOrder } = orderFormData;

  const customPolygon = new window.google.maps.Polygon({
    paths: [
      { lat: 46.45166673859898, lng: 30.768502518442684 },
      { lat: 46.442002530249624, lng: 30.771964651313617 },
      { lat: 46.42316678919593, lng: 30.76792704865653 },
      { lat: 46.41539983373721, lng: 30.761838090430164 },
      { lat: 46.40877854800877, lng: 30.75562931670575 },
      { lat: 46.405671457272895, lng: 30.7306096725362 },
      { lat: 46.40761713782876, lng: 30.729853158039546 },
      { lat: 46.40498354777752, lng: 30.709928576790787 },
      { lat: 46.406971488077765, lng: 30.70582518820819 },
      { lat: 46.40891828049145, lng: 30.704900279321024 },
      { lat: 46.40782741399074, lng: 30.693314578523907 },
      { lat: 46.41178799435908, lng: 30.69277910499714 },
      { lat: 46.419119614120035, lng: 30.70835915895738 },
      { lat: 46.430910710773155, lng: 30.69469284118881 },
      { lat: 46.43570930278756, lng: 30.698458312621103 },
      { lat: 46.437956666674765, lng: 30.695776772996556 },
      { lat: 46.442221001671925, lng: 30.694550747976074 },
      { lat: 46.442221001671925, lng: 30.687161898465458 },
      { lat: 46.44569685315506, lng: 30.686806665315906 },
      { lat: 46.44564789914128, lng: 30.68375166025658 },
      { lat: 46.451571027663135, lng: 30.683112240587395 },
      { lat: 46.457640342586444, lng: 30.68240177431671 },
      { lat: 46.460576864931056, lng: 30.692277255874156 },
      { lat: 46.460858095754745, lng: 30.705969774960003 },
      { lat: 46.460968412072376, lng: 30.713259845881964 },
      { lat: 46.46485080424781, lng: 30.722392196623577 },
      { lat: 46.463780291012405, lng: 30.72979043782668 },
      { lat: 46.46525243525569, lng: 30.735367090146806 },
      { lat: 46.46394795092836, lng: 30.754325672389097 },
      { lat: 46.46097805085998, lng: 30.755937454067467 },
      { lat: 46.4614844664613, lng: 30.758814664207677 },
    ],
  });

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

  console.log('spotOneDistance', spotOneDistance);
  console.log('spotTwoDistance', spotTwoDistance);
  const handleError = (newErrorState) => setError(newErrorState);

  const handleChangeAddress = (e) => {
    if (e.value === null) {
      setDropAddress(e.value);
      setCurrentAddressInfo(e.value);
      setIsSavedAddressSelected(false);
      setAddressInput('');
      resetInputFields(handleFormValueChange, setSpotOneDistance, setSpotTwoDistance);
      return;
    }
    setDropAddress(e.value);
    setIsSavedAddressSelected(true);
  };

  const onOptionChange = (event) => {
    if (event.target.value === 'Самовивіз') {
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
    const place = addressAutocomplete.getPlace();
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
  };

  useEffect(() => {
    if (spotOneDistance !== null && spotTwoDistance !== null) {
      setSpotIds(spotOneDistance, spotTwoDistance, handleFormValueChange);
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
