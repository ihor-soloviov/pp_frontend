import { makeAutoObservable } from 'mobx';

class OrderStore {
  paymentData = null;
  orderData = null;
  posterOrder = null;
  promocode = false;

  constructor() {
    makeAutoObservable(this);
  }

  setPaymentData(paymentData) {
    this.paymentData = paymentData;
    localStorage.setItem('user_payment_data', JSON.stringify(paymentData));
  }

  setOrderData(orderData) {
    this.orderData = orderData;
    localStorage.setItem('user_order_data', JSON.stringify(orderData));
  }

  setPosterResponse(posterOrder) {
    this.posterOrder = posterOrder;
    localStorage.setItem('poster_order', JSON.stringify(posterOrder));
  }

  usedPromocode() {
    this.promocode = !this.promocode;
  }
}

const orderStore = new OrderStore();
export default orderStore;
