import axios from 'axios';
import { url } from '../../../api';

import userStore from '../../../store/user-store';
import { getOrderData, getValidateRules } from './orderData';

const { userPromocodeNotUse, userPromocode } = userStore;

export const calculateTotalPrice = (items) => items.reduce((acc, item) => acc + item.totalPrice, 0);

export const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

const getToken = () => {
  const userDataFromLS = localStorage.getItem('userData');
  console.log('Отримали userData з LS');

  if (userDataFromLS) {
    const uData = JSON.parse(userDataFromLS);
    console.log('getToken');
    return uData.token;
  }

  return null;
};

export const setTemporaryError = (error, handleError) => {
  handleError({
    status: true,
    currentError: error,
  });
  setTimeout(() => handleError({ status: false, currentError: '' }), 3000);
};

export const getCurrentDate = () => {
  const currentDate = new Date();

  // Додаємо 10 хвилин до поточного часу
  currentDate.setMinutes(currentDate.getMinutes() + 10);

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formattedDate;
};

export const dateFormatter = (timeRange) => {
  // Получение текущей даты
  var currentDate = new Date();
  var currentYear = currentDate.getFullYear();
  var currentMonth = ('0' + (currentDate.getMonth() + 1)).slice(-2);
  var currentDay = ('0' + currentDate.getDate()).slice(-2);

  // Разделение строки времени на начальное и конечное время
  var timeParts = timeRange.split(' - ');
  var startTime = timeParts[0];

  // Объединение текущей даты с начальным временем
  var startDateTime = currentYear + '-' + currentMonth + '-' + currentDay + ' ' + startTime + ':00';

  return startDateTime;
};

export function filterTimeArray(array) {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();
  const currentTimeString = `${currentHour
    .toString()
    .padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;

  const filteredArray = array.filter((item) => {
    const startTime = item.label.split(' - ')[0];
    return startTime >= currentTimeString;
  });

  return filteredArray;
}

export const checkCurrentUserPromo = async () => {
  try {
    const token = getToken();
    if (!token) {
      console.error('Token is not available.');
      return;
    }

    const JSONdata = JSON.stringify({ token });
    const response = await axios.post(`${url}/api/auth`, JSONdata, { headers });

    const { promocode40 } = response.data;
    console.log('checkCurrentUserPromo', promocode40);

    // Використання прямої умови замість !promocode40 для підвищення читабельності
    if (promocode40) {
      userPromocodeNotUse();
    } else {
      userPromocode();
    }
  } catch (err) {
    console.error('Error checking current user promo:', err);
  }
};

export const usagePromotion = async () => {
  try {
    const token = getToken();
    console.log('usagePromotion', token);
    if (!token || token === null) {
      console.error('Не знайдено токен в локалСторі');
      return;
    }
    const res = await axios.post(url + '/api/promocode', { token: token }, { headers: headers });
    const data = res.data;

    console.log('usagePromotion:', data);
  } catch (err) {
    console.error(err);
  }
};

export const validateOrderData = (formData, cartItems, totalPrice, isPromotion) => {
  const rules = getValidateRules(formData, cartItems, totalPrice, isPromotion);

  for (let rule of rules) {
    if (rule.check()) return rule.message;
  }

  return null;
};

export const calculateFinalAmount = (cartItems, isPromotion, howToReciveOrder) => {
  let totalPrice = calculateTotalPrice(cartItems);
  let amount = isPromotion ? totalPrice * 0.6 : totalPrice;
  if (howToReciveOrder.includes('Самовивіз')) {
    return amount;
  }
  //якщо не самовивіз - то треба додавати вартість таксі
  if (amount < 500) amount += 60;
  return amount;
};

export const createOrderData = (formData, cartItems, isPromotion) => {
  return getOrderData(formData, cartItems, isPromotion);
};

export const createOrder = async (setPosterResponse, setIsOrderCreate, isPromotion) => {
  try {
    const token = getToken();
    console.log('createOrder', token);
    const user_payment_data = JSON.parse(localStorage.getItem('user_payment_data'));
    const data = JSON.parse(localStorage.getItem('user_order_data'));
    const shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
    const transactionOrderId = user_payment_data ? user_payment_data.order_id : null;

    const res = await axios.post(
      url + '/api/createOrder',
      {
        transactionOrderId: transactionOrderId,
        userToken: token,
        data: data,
        shoppingCart: shoppingCart,
      },
      { headers: headers },
    );
    const responseData = res.data;
    if (!responseData.error) {
      console.log('createOrder:', responseData);
      setPosterResponse(responseData.response);
      setIsOrderCreate(true);

      if (isPromotion || responseData.promotion !== '') {
        usagePromotion(token);
      }
    }
  } catch (err) {
    console.error(err);
  }
};

export const createTransaction = async (amount, setPaymentData) => {
  try {
    const data = { amount: amount };
    const res = await axios.post(url + '/api/pay', data, { headers: headers });
    const responseData = res.data;
    const payment_url = `https://liqpay.ua/api/3/checkout?data=${responseData.data}&signature=${responseData.signature}`;

    setPaymentData(responseData);

    window.location.replace(payment_url);
  } catch (err) {
    console.error(err);
  }
};

export const checkTransactionStatus = async (setTransactionStatus) => {
  try {
    const user_payment_data = JSON.parse(localStorage.getItem('user_payment_data'));
    console.log('user_payment_data', user_payment_data);

    if (!user_payment_data) {
      setTemporaryError('Оплата не вдала');
      setTransactionStatus(false);
      return;
    }

    const data = { order_id: user_payment_data.order_id };
    const response = await axios.post(`${url}/api/getStatus`, data, { headers });

    const responseData = response.data;
    console.log('TransactionStatus:', responseData);

    switch (responseData) {
      case 'unpaid':
        userPromocodeNotUse();
        setTemporaryError('Оплата не вдала');
        break;
      case 'success':
        setTransactionStatus(true);
        userPromocode();
        break;
      default:
        setTemporaryError('Невідомий статус оплати');
    }
  } catch (error) {
    console.error(error);
    setTemporaryError('Помилка при перевірці статусу транзакції');
  }
};
