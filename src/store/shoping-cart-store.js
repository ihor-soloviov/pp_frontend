import axios from "axios";
import { makeAutoObservable, reaction, runInAction } from "mobx";
import { url } from "../api";
import { getCurrentDate } from "../Pages/Order/OrderFunctions/OrderTools";

class ShoppingCartStore {
  cartItems = [];
  promocode = false;
  totalPrice = 0
  deliveryPrice = 60;
  orderFormData = {
    spot_id: '',
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
    paymentMethod: 'Онлайн',
    change: '',
    withoutDevices: false,
    personCount: 1,
    comment: '',
    doNotCall: false,
  }

  constructor() {
    makeAutoObservable(this);
    this.loadCartFromLocalStorage();
    // Автоматично зберігає стан кошика в localStorage при будь-яких змінах
    reaction(
      () => [this.cartItems, this.totalPrice, this.deliveryPrice],
      () => {
        localStorage.setItem('shoppingCart', JSON.stringify(this.cartItems));
        localStorage.setItem('totalPrice', JSON.stringify(this.totalPrice));
        localStorage.setItem('deliveryPrice', JSON.stringify(this.deliveryPrice))
      }
    );
  }

  loadCartFromLocalStorage() {
    const cartItems = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
    const totalPrice = JSON.parse(localStorage.getItem('totalPrice') || '0');
    const deliveryPrice = JSON.parse(localStorage.getItem('deliveryPrice') || '60');
    this.cartItems = cartItems;
    this.totalPrice = totalPrice;
    this.deliveryPrice = deliveryPrice;
  }

  handleFormValueChange = (field, value) => {
    const updatedFormData = { ...this.orderFormData, [field]: value };

    this.orderFormData = updatedFormData;
  }

  updateDeliveryPrice = (newPrice) => {
    // Перевіряємо, чи замовлення передбачає самовивіз
    if (this.orderFormData.howToReciveOrder === 'Самовивіз') {
      this.deliveryPrice = 0;
    } else {
      if (newPrice > 500) {
        this.deliveryPrice = 0;
      } else {
        this.deliveryPrice = 60;
      }
    }
  }

  addProduct = (product) => {
    const { id, price, count, mods = [] } = product;

    // Функція для перевірки еквівалентності модифікаторів
    const areModifiersEqual = (mods1, mods2) => {
      if (mods1.length !== mods2.length) return false;
      return mods1.every(mod1 => {
        const mod2 = mods2.find(m => m.m === mod1.m);
        return mod2 && mod1.a === mod2.a;
      });
    };

    const modsPrice = mods.reduce((acc, mod) => acc + (mod.price || 0), 0);
    const totalPriceForProduct = count * (price + modsPrice);
    console.log(modsPrice, price, totalPriceForProduct)

    // Перевірка наявності товару з такими ж модифікаторами
    const existingProductIndex = this.cartItems.findIndex(item => item.id === id && areModifiersEqual(item.mods, mods));

    if (existingProductIndex >= 0) {
      // Якщо товар з такими ж модифікаторами вже є, збільшуємо кількість
      const existingProduct = this.cartItems[existingProductIndex];
      existingProduct.count += count;
      existingProduct.totalPrice += totalPriceForProduct;
      this.cartItems[existingProductIndex] = existingProduct;
    } else {
      // Якщо немає точно такого товару, додаємо як новий
      const cartItemId = Date.now() + Math.random().toString(16).substring(2);
      this.cartItems.push({ ...product, totalPrice: totalPriceForProduct, cartItemId });
    }
    const newPrice = this.totalPrice += totalPriceForProduct;
    this.totalPrice = newPrice;

    this.updateDeliveryPrice(newPrice)
  };

  removeFromCart = (cartItemId) => {
    const itemIndex = this.cartItems.findIndex(item => item.cartItemId === cartItemId);
    if (itemIndex > -1) {
      const newPrice = this.totalPrice -= this.cartItems[itemIndex].totalPrice;
      this.totalPrice = newPrice
      this.cartItems.splice(itemIndex, 1);
      this.updateDeliveryPrice(newPrice)
    }
  }

  setDeliveryPrice = (price) => {
    this.deliveryPrice = price
  }

  get itemCount() {
    return this.cartItems.length;
  }

  getItemById = (cartItemId) => {
    return this.cartItems.find(item => item.cartItemId === cartItemId);
  }

  updateItemQuantity = (cartItemId, newCount) => {
    const itemIndex = this.cartItems.findIndex(item => item.cartItemId === cartItemId);
    if (itemIndex > -1) {
      const item = this.cartItems[itemIndex];
      const modsPrice = item.mods.reduce((acc, mod) => acc + mod.price, 0);
      const totalPrice = newCount * (item.price + modsPrice);

      this.cartItems[itemIndex] = { ...item, count: newCount, totalPrice };
      // Перерахунок загальної вартості кошика
      const newPrice = this.totalPrice = this.cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
      this.totalPrice = newPrice;
      this.updateDeliveryPrice(newPrice)
    }
  }

  repeatTheOrder = async (orderId) => {
    this.cartItems = [];
    this.totalPrice = 0;

    try {
      const response = await axios.get(`${url}/api/getProductsByOrderId/${orderId}`);

      if (!response || !response.data) return;

      const products = response.data[0].products

      runInAction(() => {
        this.cartItems = products;
        this.totalPrice = products.reduce((total, item) => total + item.totalPrice, 0)
      })
    } catch (error) {
      console.error("Не вдалося додати продукти до кошика:", error);
    }

  }

  cartPromocode = () => {
    this.promocode = true;
  };

  clearCart = () => {
    this.cartItems = [];
    this.totalPrice = 0
    this.deliveryPrice = 60
    localStorage.removeItem("shoppingCart");
    localStorage.removeItem("totalPrice");
    localStorage.removeItem("deliveryPrice");
    localStorage.removeItem("posterOrder");
    localStorage.removeItem("poster_order");
    localStorage.removeItem("user_payment_data");
    localStorage.removeItem("user_order_data");
  }
}

const shoppingCartStore = new ShoppingCartStore();
export default shoppingCartStore;
