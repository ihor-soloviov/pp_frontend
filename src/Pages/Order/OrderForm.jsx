import React, { useEffect, useState } from 'react';
import Container from '../../components/Container/Container';
import './Order.scss';

//Import Functios
import {
  dateFormatter,
  calculateTotalPrice,
  filterTimeArray,
} from './OrderTools';

//Import components
import InputText from '../../components/Inputs/InputText';
import InputNumber from '../../components/Inputs/InputNumber';
import InputSelector from '../../components/Inputs/InputSelector';
import RadioButton from '../../components/RadioButton/RadioButton';
import BtnMain from '../../components/Buttons/BtnMain';
import InputTextArea from '../../components/Inputs/InputTextArea';
import Checkbox from '../../components/Inputs/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { thanksModalUpdateState } from '../../store/modalsSlice';
import Popup from '../../components/Popup/Popup';
import Thanks from '../../components/Thanks/Thanks';
import { useLocation } from 'react-router-dom';
import PopupActions from '../../components/PopupActions/PopupActions';

const OrderForm = () => {
  //Tools
  const location = useLocation();
  const dispatch = useDispatch();

  //Redux
  const shoppingCart = useSelector((state) => state.shoppingCart.products);
  const modals = useSelector((state) => state.modals);

  const getCurrentDate = () => {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes() + 10).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
  };

  //State
  const timeArray = [
    {
      id: 1,
      label: '12:00 - 12:30',
      value: '12:00 - 12:30',
    },
    {
      id: 2,
      label: '12:30 - 13:00',
      value: '12:30 - 13:00',
    },
    {
      id: 3,
      label: '13:00 - 13:30',
      value: '13:00 - 13:30',
    },
    {
      id: 4,
      label: '13:30 - 14:00',
      value: '13:30 - 14:00',
    },
    {
      id: 5,
      label: '14:00 - 14:30',
      value: '14:00 - 14:30',
    },
    {
      id: 6,
      label: '14:30 - 15:00',
      value: '14:30 - 15:00',
    },
    {
      id: 7,
      label: '15:00 - 15:30',
      value: '15:00 - 15:30',
    },
    {
      id: 8,
      label: '15:30 - 16:00',
      value: '15:30 - 16:00',
    },
    {
      id: 9,
      label: '16:00 - 16:30',
      value: '16:00 - 16:30',
    },
    {
      id: 10,
      label: '16:30 - 17:00',
      value: '16:30 - 17:00',
    },
    {
      id: 11,
      label: '17:00 - 17:30',
      value: '17:00 - 17:30',
    },
    {
      id: 12,
      label: '17:30 - 18:00',
      value: '17:30 - 18:00',
    },
    {
      id: 13,
      label: '18:00 - 18:30',
      value: '18:00 - 18:30',
    },
    {
      id: 14,
      label: '18:30 - 19:00',
      value: '18:30 - 19:00',
    },
    {
      id: 15,
      label: '19:00 - 19:30',
      value: '19:00 - 19:30',
    },
    {
      id: 16,
      label: '19:30 - 20:00',
      value: '19:30 - 20:00',
    },
  ];

  const time = filterTimeArray(timeArray);
  const [formData, setFormData] = useState({
    spot_id: 1,
    name: '',
    number: '',
    selectedAddress: '',
    street: '',
    houseNumber: '',
    deliveryTime: '',
    howToReciveOrder: '',
    entrance: '',
    apartment: '',
    buildingCode: '',
    floor: '',
    selectedTime: getCurrentDate(),
    promoCode: '',
    bonus: '',
    paymentMethod: 1,
    change: '',
    withoutDevices: false,
    personCount: 1,
    comment: '',
    doNotCall: false,
  });
  const [orderId, setOrderId] = useState(null);
  const [popupTime, setPopupTime] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(0);
  const [error, setError] = useState({ status: false, currentError: '' });

  //Functions
  //Update starte
  const handleChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const pay = (order_id, amount) => {
    const data = JSON.stringify({
      amount: amount,
      order_id: order_id,
    });

    axios
      .post(`https://api.polarpelmeni.com.ua/api/pay`, data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        const url = `https://liqpay.ua/api/3/checkout?data=${res.data.data}&signature=${res.data.signature}`;

        // console.log(res, url);

        window.location.replace(url);
      })
      .catch((err) => console.log(err));
  };

  const shoppingCartMap = shoppingCart.map((item) => {
    return { product_id: item.id, count: item.count };
  });

  const objMap = {
    spot_id: 1,
    first_name: formData.name,
    phone: formData.number,
    products: shoppingCartMap,
    client_address: {
      address1: `Вулиця: ${formData.street}, Дім: ${formData.houseNumber}`,
      address2: `Парадная: ${formData.entrance}, Квартира: ${formData.apartment}, Код: ${formData.buildingCode}, Поверх: ${formData.floor}, `,
    },
    service_mode: formData.howToReciveOrder === 'Самовивіз' ? 2 : 3,
    delivery_time: `${
      formData.deliveryTime === 'На зараз'
        ? getCurrentDate()
        : dateFormatter(formData.selectedTime)
    }`,
    payment: {
      type: paymentStatus,
      sum: calculateTotalPrice(shoppingCart),
      currency: 'UAH',
    },
    promotion: '',
    comment: `Тестовый заказ !!! 
    Кол-во персон: ${formData.personCount},
      ${formData.comment && ` ${formData.comment}`}, ${
      formData.withoutDevices && 'Без приборов'
    },${formData.doNotCall && 'Не перезванивать'}, ${
      formData.howToReciveOrder === 2 && 'САМОВЫВОЗ'
    }`,
  };

  const createOrder = () => {
    const data = JSON.stringify(objMap);

    axios
      .post(`https://api.polarpelmeni.com.ua/api/createOrder`, data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        const response = res.data.response;

        console.log('res:', response);
        if (response.incoming_order_id) {
          localStorage.setItem('order', JSON.stringify(res.data.response));
          setOrderId(response.incoming_order_id);
          if (formData.paymentMethod === 1) {
            // pay(
            //   res.data.response.incoming_order_id,
            //   calculateTotalPrice(shoppingCart)
            // );
          } else {
            dispatch(thanksModalUpdateState({ isOpen: true }));
          }
        }
      })
      .catch((err) => console.error(err));
  };

  const onSubmit = () => {
    console.log(objMap);
    if (objMap.phone === '') {
      setError({
        status: true,
        currentError: 'Будь ласка, заповніть поле номеру телефону',
      });
    } else if (formData.howToReciveOrder === '') {
      setError({
        status: true,
        currentError: 'Будь ласка, оберіть спосіб отримання замовлення',
      });
    } else {
      setError({
        status: false,
        currentError: '',
      });
      createOrder();
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const paramValue = searchParams.get('status');
    if (paramValue === 'done') {
      const storedOrder = localStorage.getItem('order');
      const parsedOrder = JSON.parse(storedOrder);
      const timeSlice = parsedOrder.delivery_time.split(' ');
      console.log('parsedOrder:', parsedOrder);
      setPaymentStatus(1);
      setPopupTime(parsedOrder.delivery_time);
      setOrderId(parsedOrder.incoming_order_id);
      handleChange('deliveryTime', timeSlice[1]);
      dispatch(thanksModalUpdateState({ isOpen: true }));
    }
  }, [location]);

  return (
    <>
      {modals.thanksModal && (
        <Popup
          closeModal={() => {
            dispatch(thanksModalUpdateState({ isOpen: false }));
          }}
        >
          <Thanks orderId={orderId} deliveryTime={popupTime} />
        </Popup>
      )}
      {error.status === true && (
        <PopupActions action={error.currentError} error />
      )}

      <section className='order-page__form'>
        <section className='order-page__section'>
          <h3>Контакти</h3>
          <div className='order-page__section-inputs'>
            <InputText
              name={'Ваше ім’я'}
              placeholder={'Ваше ім’я'}
              value={formData.name}
              onChange={(value) => handleChange('name', value)}
            />
            <InputNumber
              value={formData.number}
              onChange={(value) => handleChange('number', value)}
            />
          </div>
        </section>
        <section className='order-page__section'>
          <h3>Спосіб отримання замовлення</h3>
          <section className='order-page__section-inputs'>
            <InputSelector
              name={'Збережені адреси'}
              data={[
                {
                  id: 1,
                  label: 'Немає',
                  value: 'Немає',
                },
              ]}
              placeholder={'Оберіть адресу'}
              value={formData.selectedAddress}
              onChange={(value) => handleChange('selectedAddress', value)}
            />
          </section>
          <section className='order-page__section-inputs order-page__section-inputs-row'>
            <InputText
              name={'Вулиця'}
              placeholder={'Вулиця'}
              value={formData.street}
              onChange={(value) => handleChange('street', value)}
            />
            <InputText
              name={'№ Будинку'}
              placeholder={'№ Будинку'}
              value={formData.houseNumber}
              onChange={(value) => handleChange('houseNumber', value)}
            />
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
              selectedOption={formData.howToReciveOrder}
              onOptionChange={(event) =>
                handleChange('howToReciveOrder', event.target.value)
              }
            />
          </section>
          {formData.howToReciveOrder === 'До дверей' && (
            <section className='order-page__section-inputs order-page__section-inputs-row'>
              <InputText
                name={'Квартира'}
                placeholder={'№ Квартири'}
                value={formData.apartment}
                onChange={(value) => handleChange('apartment', value)}
              />

              <InputText
                name={'Парадна'}
                placeholder={'№ Парадної'}
                value={formData.entrance}
                onChange={(value) => handleChange('entrance', value)}
              />
              <InputText
                name={'Код'}
                placeholder={'Код'}
                value={formData.buildingCode}
                onChange={(value) => handleChange('buildingCode', value)}
              />
              <InputText
                name={'Поверх'}
                placeholder={'Поверх'}
                value={formData.floor}
                onChange={(value) => handleChange('floor', value)}
              />
            </section>
          )}
        </section>
        <section className='order-page__section'>
          <h3>Час отримання</h3>
          <section className='order-page__section-inputs'>
            <RadioButton
              data={[
                { id: 1, value: 'На зараз', label: 'На зараз' },
                {
                  id: 2,
                  value: 'Вказати точний час',
                  label: 'Вказати точний час',
                },
              ]}
              selectedOption={formData.deliveryTime}
              onOptionChange={(event) =>
                handleChange('deliveryTime', event.target.value)
              }
              column
            />
            {formData.deliveryTime === 'Вказати точний час' && (
              <InputSelector
                name={'Час'}
                placeholder={'Час'}
                data={time}
                value={formData.selectedTime}
                onChange={(value) => handleChange('selectedTime', value)}
              />
            )}
          </section>
        </section>
        <section className='order-page__section'>
          <h3>Додати промокод</h3>
          <section className='order-page__section-inputs order-page__section-inputs-row'>
            <InputText
              name={'Промокод'}
              placeholder={'Промокод'}
              value={formData.promoCode}
              onChange={(value) => handleChange('promoCode', value)}
            />
            <BtnMain name={'Застосувати'} disabled />
          </section>
        </section>
        <section className='order-page__section'>
          <h3>Спосіб оплати</h3>
          <div className='order-page__section-inputs'>
            <InputText
              name={'Використати бонуси'}
              placeholder={'0'}
              value={formData.bonus}
              onChange={(value) => handleChange('bonus', value)}
            />
          </div>
          <div className='order-page__section-inputs order-page__section-inputs-row'>
            <InputSelector
              name={'Оплата'}
              placeholder={'Онлайн'}
              data={[
                { id: 0, label: 'Онлайн', value: 'Онлайн' },
                { id: 1, label: 'Готівка', value: 'Готівка' },
              ]}
              value={formData.paymentMethod}
              onChange={(value) => handleChange('paymentMethod', value)}
            />
            <InputText
              name={'Сдача с'}
              placeholder={'500'}
              value={formData.change}
              onChange={(value) => handleChange('change', value)}
            />
          </div>
        </section>
        <section className='order-page__section'>
          <h3>Додатково</h3>
          <section className='order-page__section-inputs order-page__section-inputs-row'>
            <div className='order-page__block'>
              <span>Кількість персон:</span>
              <Checkbox
                isChecked={formData.withoutDevices}
                onCheckboxChange={() =>
                  handleChange('withoutDevices', !formData.withoutDevices)
                }
                label={'Без приборів'}
              />
            </div>
            <div className='order-page__block'>
              <span>Кількість персон:</span>
              <div className='counter'>
                <div
                  className='counter__btn'
                  onClick={() => {
                    if (formData.personCount > 1) {
                      handleChange('personCount', formData.personCount - 1);
                    }
                  }}
                >
                  -
                </div>
                <div className='counter__value'>{formData.personCount}</div>
                <div
                  className='counter__btn'
                  onClick={() =>
                    handleChange('personCount', formData.personCount + 1)
                  }
                >
                  +
                </div>
              </div>
            </div>
          </section>
          <section className='order-page__section-inputs'>
            <InputTextArea
              name={'Коментар до замовлення'}
              placeholder={'Можете тут написати будь-що:)'}
              value={formData.comment}
              onChange={(value) => handleChange('comment', value)}
            />
          </section>
          <section className='order-page__section-inputs'>
            <div className='order-page__block'>
              <Checkbox
                isChecked={formData.doNotCall}
                onCheckboxChange={() =>
                  handleChange('doNotCall', !formData.doNotCall)
                }
                label={'Не передзвонювати мені'}
              />
            </div>
          </section>
        </section>

        <BtnMain
          name={'Оформити замовлення'}
          fullWide
          onClick={() => onSubmit()}
        />
      </section>
    </>
  );
};

export default OrderForm;
