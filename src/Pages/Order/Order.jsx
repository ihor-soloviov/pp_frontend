import React, { useEffect, useState } from 'react';
import Container from '../../components/Container/Container';
import './Order.scss';

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

const Order = () => {
  const dispatch = useDispatch();
  const shoppingCart = useSelector((state) => state.shoppingCart.products);
  const modals = useSelector((state) => state.modals);
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
    selectedTime: '',
    promoCode: '',
    bonus: '',
    paymentMethod: '',
    change: '',
    withoutDevices: false,
    personCount: 1,
    comment: '',
    doNotCall: false,
  });
  const [orderId, setOrderId] = useState(null);
  const handleChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const calculateTotalPrice = (items) => {
    let totalPrice = 0;

    items.forEach((item) => {
      totalPrice += item.totalPrice;
    });

    return totalPrice;
  };
  const getCurrentDate = () => {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes() + 1).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
  };
  const dateFormatter = (timeRange) => {
    // Получение текущей даты
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var currentMonth = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    var currentDay = ('0' + currentDate.getDate()).slice(-2);

    // Разделение строки времени на начальное и конечное время
    var timeParts = timeRange.split(' - ');
    var startTime = timeParts[0];

    // Объединение текущей даты с начальным временем
    var startDateTime =
      currentYear +
      '-' +
      currentMonth +
      '-' +
      currentDay +
      ' ' +
      startTime +
      ':00';

    return startDateTime;
  };

  const pay = () => {
    const data = JSON.stringify({
      amount: 1,
      order_id: 9999,
    });

    axios
      .post(`https://polarpelmeni-api.work-set.eu/api/pay`, data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        const url = `https://liqpay.ua/api/3/checkout?data=${res.data.data}&signature=${res.data.signature}`;

        console.log(res, url);

        // window.location.replace(url);
      })
      .catch((err) => console.log(err));
  };

  const shoppingCartMap = shoppingCart.map((item) => {
    return { product_id: item.id, count: item.count };
  });
  const objMap = {
    spot_id: 1,
    phone: formData.number,
    products: shoppingCartMap,
    client_address: {
      address1: `вулиця: ${formData.street}, дім: ${formData.houseNumber}, парадна: ${formData.entrance}, код: ${formData.buildingCode}, поверх: ${formData.floor}, квартира: ${formData.apartment}`,
      comment: `Тип доставки: ${formData.howToReciveOrder}`,
    },
    service_mode: 3,
    delivery_time: `${
      formData.deliveryTime === 'На зараз'
        ? getCurrentDate()
        : dateFormatter(formData.selectedTime)
    }`,
    payment: {
      type: formData.paymentMethod === 'Онлайн' ? 1 : 0,
      sum: calculateTotalPrice(shoppingCart),
      currency: 'UAH',
    },
    comment: `Тестовый заказ !!! кол-во персон: ${formData.personCount},
    ${formData.comment && ` ${formData.comment}`}, ${
      formData.withoutDevices && 'Без приборов'
    },${formData.doNotCall && 'Не перезванивать'}, `,
  };
  useEffect(() => {
    console.log(typeof getCurrentDate());

    console.log(objMap);
  }, [formData]);

  const deliveryTimeRadios = [
    { id: 1, value: 'На зараз', label: 'На зараз' },
    { id: 2, value: 'Вказати точний час', label: 'Вказати точний час' },
  ];
  const howToReciveOrder = [
    { id: 1, value: 'До дверей', label: 'До дверей' },
    { id: 2, value: 'Приватний будинок', label: 'Приватний будинок' },
    { id: 4, value: 'Вийду до машини', label: 'Вийду до машини' },
    {
      id: 3,
      value: 'Самовивіз',
      label: 'Самовивіз',
      info: '(Одеса, вул. Лейтенанта Шмідта 25)',
    },
  ];

  const createOrder = () => {
    const data = JSON.stringify(objMap);

    axios
      .post(`https://polarpelmeni-api.work-set.eu/api/createOrder`, data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.response.incoming_order_id) {
          setOrderId(res.data.response.incoming_order_id);
          dispatch(thanksModalUpdateState({ isOpen: true }));
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      {modals.thanksModal && (
        <Popup
          closeModal={() => {
            dispatch(thanksModalUpdateState({ isOpen: false }));
          }}
        >
          <Thanks orderId={orderId} deliveryTime={formData.deliveryTime} />
        </Popup>
      )}
      <Container>
        <div className='order-page'>
          <div className='order-page__content'>
            <div className='order-page__form'>
              <div className='order-page__section'>
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
              </div>
              <div className='order-page__section'>
                <h3>Спосіб отримання замовлення</h3>
                <div className='order-page__section-inputs'>
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
                </div>
                <div className='order-page__section-inputs order-page__section-inputs-row'>
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
                </div>
                <div className='order-page__section-inputs'>
                  <RadioButton
                    data={howToReciveOrder}
                    selectedOption={formData.howToReciveOrder}
                    onOptionChange={(event) =>
                      handleChange('howToReciveOrder', event.target.value)
                    }
                  />
                </div>
                {formData.howToReciveOrder === 'До дверей' && (
                  <div className='order-page__section-inputs order-page__section-inputs-row'>
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
                  </div>
                )}
              </div>
              <div className='order-page__section'>
                <h3>Час отримання</h3>
                <div className='order-page__section-inputs'>
                  <RadioButton
                    data={deliveryTimeRadios}
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
                      data={[
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
                      ]}
                      value={formData.selectedTime}
                      onChange={(value) => handleChange('selectedTime', value)}
                    />
                  )}
                </div>
              </div>
              <div className='order-page__section'>
                <h3>Додати промокод</h3>
                <div className='order-page__section-inputs order-page__section-inputs-row'>
                  <InputText
                    name={'Промокод'}
                    placeholder={'Промокод'}
                    value={formData.promoCode}
                    onChange={(value) => handleChange('promoCode', value)}
                  />
                  <BtnMain name={'Застосувати'} disabled />
                </div>
              </div>
              <div className='order-page__section'>
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
                      { id: 1, label: 'Онлайн', value: 'Онлайн' },
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
              </div>
              <div className='order-page__section'>
                <h3>Додатково</h3>
                <div className='order-page__section-inputs order-page__section-inputs-row'>
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
                            handleChange(
                              'personCount',
                              formData.personCount - 1
                            );
                          }
                        }}
                      >
                        -
                      </div>
                      <div className='counter__value'>
                        {formData.personCount}
                      </div>
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
                </div>
                <div className='order-page__section-inputs'>
                  <InputTextArea
                    name={'Коментар до замовлення'}
                    placeholder={'Можете тут написати будь-що:)'}
                    value={formData.comment}
                    onChange={(value) => handleChange('comment', value)}
                  />
                </div>
                <div className='order-page__section-inputs'>
                  <div className='order-page__block'>
                    <Checkbox
                      isChecked={formData.doNotCall}
                      onCheckboxChange={() =>
                        handleChange('doNotCall', !formData.doNotCall)
                      }
                      label={'Не передзвонювати мені'}
                    />
                  </div>
                </div>
              </div>
              <BtnMain
                name={'Оформити замовлення'}
                fullWide
                onClick={() => createOrder()}
              />
            </div>
            <div className='checkout'>
              <div className='checkout__content'>
                <h3 className='title__h3 text__color--secondary'>
                  Ваше замовлення
                </h3>
                <ul className='checkout__list'>
                  {shoppingCart.map((item) => {
                    return (
                      <li className='checkout__item'>
                        <div className='checkout__row'>
                          <p className='checkout__item-name'> {item.name}</p>
                          <p className='checkout__item-count'> x{item.count}</p>
                        </div>
                        <div className='checkout__row'>
                          <p className='checkout__item-weight'>
                            {item.weight}г
                          </p>
                          <p className='checkout__item-price'>
                            {' '}
                            {item.totalPrice} ₴
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <div className='checkout__total'>
                  <div className='checkout__row'>
                    <p className='checkout__text'>Сума замовлення:</p>
                    <p className='checkout__text'>
                      {calculateTotalPrice(shoppingCart)} ₴
                    </p>
                  </div>
                  <div className='checkout__row'>
                    <p className='checkout__text'>Доставка:</p>
                    <p className='checkout__text'>
                      {' '}
                      {shoppingCart.reduce((a, b) => a + b.totalPrice, 0) < 500
                        ? 'за допомогою таксі (оплачується окремо)'
                        : 'Безкоштовна'}
                    </p>
                  </div>
                  <div className='checkout__row'>
                    <p className='checkout__text checkout__text-bold'>
                      Всього до сплати::
                    </p>
                    <p className='checkout__text-bold'>
                      {calculateTotalPrice(shoppingCart)} ₴
                    </p>
                  </div>
                  <BtnMain name={'ОПЛАТИТЬ'} fullWide onClick={() => pay()} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Order;
