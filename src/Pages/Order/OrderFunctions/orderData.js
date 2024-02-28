import {
  getCurrentDate,
  dateFormatter,
  calculateTotalPrice
} from "./OrderTools";

const shoppingCartMap = products => products.map(item => {
  // Ініціалізація базового об'єкта для кожного продукту
  const productMapping = { product_id: item.id, count: item.count };

  // Перевірка, чи масив mods існує та не пустий
  if (Array.isArray(item.mods) && item.mods.length > 0) {
    // Модифікація масиву mods, залишаючи лише потрібні поля m та a
    const modification = item.mods.map(mod => ({ m: mod.m, a: mod.a }));
    // Додавання модифікованого масиву mods до результату
    productMapping.modification = modification;
  }

  return productMapping;
});


const shoppingCartMapPromo = products => products.map((item) => {
  // Ініціалізація об'єкта для кожного продукту в involved_products
  const productMapping = { id: item.id, count: item.count };

  // Перевірка на наявність та непустоту масиву mods
  if (Array.isArray(item.mods) && item.mods.length > 0) {
    // Створення modification з вибраними полями m та a
    const modification = item.mods.map(mod => ({ m: mod.m, a: mod.a }));
    // Додавання modification до об'єкта продукту
    productMapping.modification = modification;
  }

  return {
    id: "2", //id акції на -40%
    involved_products: [productMapping]
  };
});


export const getOrderData = (formData, products, isPromotion) => {
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
    paymentMethod,
    NotCall
  } = formData;

  const address1 = `Вулиця: ${street} , Дім: ${houseNumber}`;
  const address2 = howToReciveOrder === "До дверей" ? `Парадная: ${entrance}, Квартира: ${apartment}, Код: ${buildingCode}, Поверх: ${floor}` : "Приватний будинок"
  const isAddressComment = howToReciveOrder === "Вийду до машини";
  const serviceMode = howToReciveOrder === "Самовивіз" ? 2 : 3;
  const delivery_time = deliveryTime === "На зараз" ? getCurrentDate() : dateFormatter(selectedTime);
  const devicesComment = withoutDevices ? ", Без приборів" : "";
  const callOrNot = NotCall ? ", Не передзвонювати" : "";
  const orderRecive = howToReciveOrder === 2 ? ", Самовивіз" : ""
  const isProm = isPromotion ? " Знижка 40%" : ""
  const com = `Кількість персон: ${personCount},${devicesComment}${callOrNot}${orderRecive}${isProm}, Коментар від користувача: ${comment}`

  return {
    spot_id: 1,
    first_name: name,
    phone: number,
    products: shoppingCartMap(products),
    client_address: {
      address1: address1,
      address2: address2,
      comment: isAddressComment ? "Вийду до машини" : ""
    },
    payment: {
      type: paymentMethod.label === "Готівка" ? 0 : 1,
      sum: isPromotion ? calculateTotalPrice(products) * (60 / 100) : calculateTotalPrice(products),
      currency: "UAH",
    },
    service_mode: serviceMode,
    delivery_time: delivery_time,
    promotion: isPromotion ? shoppingCartMapPromo(products) : "",
    comment: com,
  };
}