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

export function modifyDateString(dateString) {
  // Разделяем строку по пробелу на дату и время
  var parts = dateString.split(' ');
  var date = parts[0]; // "гггг-мм-дд"
  var time = parts[1]; // "чч:мм:сс"

  // Увеличиваем время на один час
  var newTime = time.split(':');
  var hours = parseInt(newTime[0]);
  hours += 1;
  newTime[0] = hours.toString().padStart(2, '0');

  // Объединяем новую дату и время
  var newDateString = newTime.join(':'); // "чч:мм:сс"

  return newDateString;
}

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
