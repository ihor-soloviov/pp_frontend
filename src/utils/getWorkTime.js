export const shouldShowTimePopup = () => {
  // Получаем текущее время
  const currentTime = new Date();
  // Получаем час и минуты
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();

  // Устанавливаем время начала и конца PopUp
  const popupStartTime = 21; // 9 вечера
  const popupEndTimeHour = 9; // 9 утра (следующего дня)
  const popupEndTimeMinute = 30; // 30 минут

  // Проверяем, находится ли текущее время в интервале для отображения PopUp
  return (
    (currentHour >= popupStartTime && currentHour < 24) || // С 21:00 до полуночи
    (currentHour >= 0 && currentHour < popupEndTimeHour) || // С полуночи до 09:00
    (currentHour === popupEndTimeHour && currentMinute <= popupEndTimeMinute) // С 09:00 до 09:30
  );
};
export const timeErrorText =
  'Нажаль, ми вже закриті, але ми з нетерпінням чекаємо завтрашнього дня, щоб вас нагодувати';
