import {
  getCurrentDate,
  dateFormatter,
  calculateTotalPrice
} from "./OrderTools";

export const getOrderData = (formData, shoppingCartMap, shoppingCartMapPromo, products, isPromotion) => {

  const {
    name,
    number,
    street,
    houseNumber,
    entrance,
    apartment,
    buildingCode,
    floor,
    howToReciveOrder,
    deliveryTime,
    selectedTime,
    withoutDevices,
    personCount,
    comment,
    NotCall
  } = formData;

  const address1 = `Вулиця: ${street} , Дім: ${houseNumber}`;
  const address2 = howToReciveOrder === "До дверей" ? `Парадная: ${entrance}, Квартира: ${apartment}, Код: ${buildingCode}, Поверх: ${floor}` : "Приватний будинок"
  const isAddressComment = howToReciveOrder === "Вийду до машини";
  const serviceMode = howToReciveOrder === "Самовивіз" ? 2 : 3;
  const delivery_time = deliveryTime === "На зараз" ? getCurrentDate() : dateFormatter(selectedTime);
  const devicesComment = withoutDevices ? ", Без приборів, " : "";
  const callOrNot = NotCall ? ", Не передзвонювати, " : "";
  const orderRecive = howToReciveOrder === 2 ? ", Самовивіз, " : ""
  const isProm = isPromotion ? "Знижка 40%" : ""
  const com = `Кількість персон: ${personCount}${devicesComment}${callOrNot}${orderRecive}${isProm}, Коментар від користувача: ${comment}`

  return {
    spot_id: 1,
    first_name: name,
    phone: number,
    products: shoppingCartMap,
    client_address: {
      address1: address1,
      address2: address2,
      comment: isAddressComment ? "Вийду до машини" : ""
    },
    service_mode: serviceMode,
    delivery_time: delivery_time,
    promotion: isPromotion ? shoppingCartMapPromo : "",
    comment: com,
  };
}