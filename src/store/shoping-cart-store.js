import axios from 'axios';
import { makeAutoObservable, reaction } from 'mobx';
import { url } from '../api';
import { getCurrentDate } from '../Pages/Order/OrderFunctions/OrderTools';

class ShoppingCartStore {
  cartItems = [];
  promocode = false;
  totalPrice = 0;
  deliveryPrice = 60;
  spotOneStatus = true;
  spotTwoStatus = true;
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
  };

  constructor() {
    makeAutoObservable(this);
    this.loadCartFromLocalStorage();
    reaction(
      () => [this.cartItems, this.totalPrice, this.deliveryPrice],
      () => this.saveCartToLocalStorage(),
    );
    this.loadSpotStatusFromLocalStorage();
    reaction(
      () => [this.spotOneStatus, this.spotTwoStatus],
      () => this.saveSpotStatusToLocalStorage(),
    );
  }

  loadCartFromLocalStorage() {
    this.cartItems = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
    this.totalPrice = JSON.parse(localStorage.getItem('totalPrice') || '0');
    this.deliveryPrice = JSON.parse(localStorage.getItem('deliveryPrice') || '60');
  }

  saveCartToLocalStorage() {
    localStorage.setItem('shoppingCart', JSON.stringify(this.cartItems));
    localStorage.setItem('totalPrice', JSON.stringify(this.totalPrice));
    localStorage.setItem('deliveryPrice', JSON.stringify(this.deliveryPrice));
  }

  loadSpotStatusFromLocalStorage() {
    this.spotOneStatus = JSON.parse(localStorage.getItem('spotOneStatus') || 'true');
    this.spotTwoStatus = JSON.parse(localStorage.getItem('spotOneStatus') || 'true');
  }

  saveSpotStatusToLocalStorage() {
    localStorage.setItem('spotOneStatus', JSON.stringify(this.spotOneStatus));
    localStorage.setItem('spotTwoStatus', JSON.stringify(this.spotTwoStatus));
  }

  handleFormValueChange = (field, value) => {
    this.orderFormData[field] = value;
  };

  updateDeliveryPrice = (newPrice) => {
    this.deliveryPrice = this.orderFormData.howToReciveOrder.includes('Самовивіз')
      ? 0
      : newPrice > 500
        ? 0
        : 60;
  };

  calculateProductTotalPrice = ({ price, count, mods = [] }) => {
    return count * (price + mods.reduce((acc, mod) => acc + (mod.price || 0), 0));
  };

  findExistingProductIndex = (id, mods) => {
    return this.cartItems.findIndex(
      (item) => item.id === id && JSON.stringify(item.mods) === JSON.stringify(mods),
    );
  };

  addProduct = (product) => {
    const existingProductIndex = this.findExistingProductIndex(product.id, product.mods);
    const totalPriceForProduct = this.calculateProductTotalPrice(product);

    if (existingProductIndex >= 0) {
      const existingProduct = this.cartItems[existingProductIndex];
      existingProduct.count += product.count;
      existingProduct.totalPrice += totalPriceForProduct;
    } else {
      const cartItemId = Date.now() + Math.random().toString(16).substring(2);
      this.cartItems.push({ ...product, totalPrice: totalPriceForProduct, cartItemId });
    }

    this.totalPrice += totalPriceForProduct;
    this.updateDeliveryPrice(this.totalPrice);
  };

  removeFromCart = (cartItemId) => {
    const itemIndex = this.cartItems.findIndex((item) => item.cartItemId === cartItemId);
    if (itemIndex > -1) {
      this.totalPrice -= this.cartItems[itemIndex].totalPrice;
      this.cartItems.splice(itemIndex, 1);
      this.updateDeliveryPrice(this.totalPrice);
    }
  };

  updateItemQuantity = (cartItemId, newCount) => {
    const itemIndex = this.cartItems.findIndex((item) => item.cartItemId === cartItemId);
    if (itemIndex > -1) {
      const item = this.cartItems[itemIndex];
      const newTotalPrice = this.calculateProductTotalPrice({ ...item, count: newCount });
      this.totalPrice += newTotalPrice - item.totalPrice;
      item.count = newCount;
      item.totalPrice = newTotalPrice;
      this.updateDeliveryPrice(this.totalPrice);
    }
  };

  repeatTheOrder = async (orderId) => {
    try {
      const response = await axios.get(`${url}/api/getProductsByOrderId/${orderId}`);
      if (response && response.data) {
        const products = response.data[0].products;
        this.cartItems = products;
        this.totalPrice = products.reduce((total, item) => total + item.totalPrice, 0);
      }
    } catch (error) {
      console.error('Не вдалося додати продукти до кошика:', error);
    }
  };

  clearCart = () => {
    this.cartItems = [];
    this.totalPrice = 0;
    this.deliveryPrice = 60;
    [
      'shoppingCart',
      'totalPrice',
      'deliveryPrice',
      'posterOrder',
      'poster_order',
      'user_payment_data',
      'user_order_data',
    ].forEach((key) => localStorage.removeItem(key));
  };

  cartPromocode() {
    this.promocode = true;
  }

  setSpotOneStatus = (status) => {
    this.spotOneStatus = status;
  };

  setSpotTwoStatus = (status) => {
    this.spotTwoStatus = status;
  };

  setDeliveryPrice = (price) => {
    this.deliveryPrice = price;
  };

  get itemCount() {
    return this.cartItems.length;
  }

  getItemById = (cartItemId) => {
    return this.cartItems.find((item) => item.cartItemId === cartItemId);
  };
}

const shoppingCartStore = new ShoppingCartStore();
export default shoppingCartStore;
