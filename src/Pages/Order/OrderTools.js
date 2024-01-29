import axios from "axios";
import { url } from "../../api";

import userStore from "../../store/user-store";

const { token, userPromocodeNotUse, userPromocode } = userStore

export const headers = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
}

export const getCurrentDate = () => {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes() + 5).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");

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

export const calculateTotalPrice = (items) => {
  let totalPrice = 0;

  items.forEach((item) => {
    totalPrice += item.totalPrice;
  });

  return totalPrice;
};

// export function modifyDateString(dateString) {
//   // Разделяем строку по пробелу на дату и время
//   var parts = dateString.split(' ');
//   var date = parts[0]; // "гггг-мм-дд"
//   var time = parts[1]; // "чч:мм:сс"

//   // Увеличиваем время на один час
//   var newTime = time.split(':');
//   var hours = parseInt(newTime[0]);
//   hours += 1;
//   newTime[0] = hours.toString().padStart(2, '0');

//   // Объединяем новую дату и время
//   var newDateString = newTime.join(':'); // "чч:мм:сс"

//   return newDateString;
// }

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
    const response = await axios.post(
      `${url}/api/auth`,
      { token: token },
      {
        headers: headers,
      }
    );

    const data = response.data;

    if (response.status === 200) {
      console.log("checkCurrentUserPromo", data.promocode40);
      if (data.promocode40 === true) {
        userPromocodeNotUse();
      } else {
        userPromocode();
      }
    }
  } catch (err) {
    console.error(err);
  }
};

export const usagePromotion = async () => {
  try {
    const res = await axios.post(url + "/api/promocode", { token: token }, { headers: headers });
    const data = res.data;

    console.log("usagePromotion:", data);
  } catch (err) {
    console.error(err);
  }
};


export const createOrder = async (setPosterResponse, setIsOrderCreate, isPromotion) => {
  try {
    const user_payment_data = JSON.parse(localStorage.getItem("user_payment_data"));
    const data = JSON.parse(localStorage.getItem("user_order_data"));
    const orderId = user_payment_data ? user_payment_data.order_id : null;

    const res = await axios.post(url + "/api/createOrder", { order_id: orderId, data: data }, { headers: headers });
    const responseData = res.data;
    if (!responseData.error) {
      console.log("createOrder:", responseData);
      setPosterResponse({ posterOrder: responseData.response });
      setIsOrderCreate(true);

      if (isPromotion || responseData.promotion !== "") {
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
    const res = await axios.post(url + "/api/pay", data, { headers: headers });
    const responseData = res.data;
    const payment_url = `https://liqpay.ua/api/3/checkout?data=${responseData.data}&signature=${responseData.signature}`;

    setPaymentData(responseData);

    console.log("createTransaction:", responseData, payment_url);

    window.location.replace(payment_url);
  } catch (err) {
    console.error(err);
  }
};

export const checkTransactionStatus = async (setTransactionStatus, setError, navigate) => {
  try {
    const user_payment_data = JSON.parse(
      localStorage.getItem("user_payment_data")
    );

    if (!user_payment_data) {
      setError({
        status: true,
        currentError: "Оплата не вдала",
      });
      return
    }

    const data = { order_id: user_payment_data.order_id };
    const response = await axios.post(url + "/api/getStatus", data, { headers: headers });

    const responseData = response.data;
    console.log("checkTransactionStatus:", responseData);

    if (responseData === "unpaid") {
      userPromocodeNotUse();
      setError({
        status: true,
        currentError: "Оплата не вдала",
      });
      return
    }

    if (responseData === "success") {
      setTransactionStatus(true);

      // setTimeout(() => {
      //   navigate("/order");
      // }, 2000);
    }
  } catch (error) {
    console.error(error);
  }
};
