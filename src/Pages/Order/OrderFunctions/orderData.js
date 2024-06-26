import { getCurrentDate, dateFormatter, calculateTotalPrice } from './OrderTools';
import { shouldShowTimePopup } from '../../../utils/getWorkTime';

const shoppingCartMap = (products) =>
  products.map((item) => {
    // Ініціалізація базового об'єкта для кожного продукту
    const productMapping = { product_id: item.id, count: item.count };

    // Перевірка, чи масив mods існує та не пустий
    if (Array.isArray(item.mods) && item.mods.length > 0) {
      // Модифікація масиву mods, залишаючи лише потрібні поля m та a
      const modification = item.mods.map((mod) => ({ m: mod.m, a: mod.a }));
      // Додавання модифікованого масиву mods до результату
      productMapping.modification = modification;
    }

    return productMapping;
  });

const shoppingCartMapPromo = (products) =>
  products.map((item) => {
    // Ініціалізація об'єкта для кожного продукту в involved_products
    const productMapping = { id: item.id, count: item.count };

    // Перевірка на наявність та непустоту масиву mods
    if (Array.isArray(item.mods) && item.mods.length > 0) {
      // Створення modification з вибраними полями m та a
      const modification = item.mods.map((mod) => ({ m: mod.m, a: mod.a }));
      // Додавання modification до об'єкта продукту
      productMapping.modification = modification;
    }

    return {
      id: 15, //id акції на -40%
      involved_products: [productMapping],
    };
  });

const inputAddress = document.getElementById('order-address');

export const getValidateRules = (formData, cartItems, totalPrice, isPromotion) => {
  const {
    number,
    howToReciveOrder,
    houseNumber,
    street,
    deliveryTime,
    apartment,
    entrance,
    paymentMethod,
  } = formData;

  const orderPrice = isPromotion ? totalPrice * 0.6 : totalPrice;

  return [
    { check: () => cartItems.length === 0, message: 'Будь ласка, оберіть товари для замовлення' },
    {
      check: () =>
        !/^\+380(39|50|63|66|67|73|68|91|92|93|94|95|96|97|98|99)\d{7}$/.test(
          number.replace(/[\s()]+/g, ''),
        ),
      message: 'Будь ласка, введіть коректний номер телефону',
    },
    { check: () => number === '', message: 'Будь ласка, заповніть поле номеру телефону' },
    { check: () => !howToReciveOrder, message: 'Будь ласка, оберіть спосіб отримання замовлення' },
    {
      check: () =>
        !howToReciveOrder.includes('Самовивіз') &&
        !street &&
        !houseNumber &&
        inputAddress?.value !== '',
      message: 'Будь ласка, вкажіть коректну адресу',
    },

    {
      check: () => !howToReciveOrder.includes('Самовивіз') && (!houseNumber || !street),
      message: 'Будь ласка, вкажіть адресу',
    },
    {
      check: () => howToReciveOrder !== 'Самовивіз1' && paymentMethod === 'Готівка',
      message: 'Оплата готівкою доступна тільки у закладі',
    },

    {
      check: () => howToReciveOrder === 'До дверей' && (!apartment || !entrance),
      message: 'Будь ласка, вкажіть номер квартири та парадну',
    },

    { check: () => !deliveryTime, message: 'Будь ласка, оберіть час отримання замовлення' },
    { check: () => orderPrice < 200, message: 'Мінімальна сумма замовлення 200 ₴' },
  ];
};

export const getOrderData = (formData, products, isPromotion) => {
  const {
    spot_id,
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
    doNotCall,
  } = formData;

  const address1 = `Вулиця: ${street} , Дім: ${houseNumber}`;
  const address2 =
    howToReciveOrder === 'До дверей'
      ? `Парадная: ${entrance}, Квартира: ${apartment}, Код: ${buildingCode}, Поверх: ${floor}`
      : 'Приватний будинок';
  const isAddressComment = howToReciveOrder === 'Вийду до машини';
  const serviceMode = howToReciveOrder.includes('Самовивіз') ? 2 : 3;
  const delivery_time =
    deliveryTime === 'На зараз' ? getCurrentDate() : dateFormatter(selectedTime);
  const devicesComment = withoutDevices ? ', без приборів' : '';
  const callOrNot = doNotCall ? ', не передзвонювати' : '';
  const orderRecive = howToReciveOrder.includes('Самовивіз') ? ', самовивіз' : '';
  const cashPayment = paymentMethod === 'Готівка';
  const paymentComment = cashPayment ? ', оплата готівкою' : ', оплата карткою';
  // const isProm = isPromotion ? ', Знижка 40%' : '';
  const com = `Кількість персон: ${personCount}${devicesComment}${callOrNot}${orderRecive}${paymentComment}, Коментар від користувача: ${comment}`;
  //   const finalSpotId = checkAndSelectOppositeSpot(spot_id);

  return {
    spot_id: spot_id,
    first_name: name,
    phone: number,
    products: shoppingCartMap(products),
    client_address: {
      address1: address1,
      address2: address2,
      comment: isAddressComment ? 'Вийду до машини' : '',
    },
    payment: {
      type: cashPayment ? 0 : 1,
      sum: isPromotion ? calculateTotalPrice(products) * (60 / 100) : calculateTotalPrice(products),
      currency: 'UAH',
    },
    service_mode: serviceMode,
    delivery_time: delivery_time,
    promotion: isPromotion ? shoppingCartMapPromo(products) : '',
    comment: com,
  };
};
