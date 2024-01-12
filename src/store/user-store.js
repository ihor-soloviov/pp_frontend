import { makeAutoObservable } from 'mobx';

class UserStore {
  isAuthenticated = false;
  city = null;
  name = null;
  phone = null;
  email = null;
  token = null;
  promocode40 = true;
  favoritProducts = [];
  adresses = [];

  constructor() {
    makeAutoObservable(this);
  }

  userLogin({ name, phone, email, token, promocode40 }) {
    this.isAuthenticated = true;
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.token = token;
    this.promocode40 = promocode40;
    localStorage.setItem('userData', JSON.stringify(this));
  }

  userLogout() {
    this.isAuthenticated = false;
    this.name = null;
    this.phone = null;
    this.email = null;
    this.token = null;
    this.promocode40 = false;
    localStorage.removeItem('userData');
  }

  updateCity(city) {
    this.city = city;
    localStorage.setItem('userData', JSON.stringify(this));
  }

  addToFavorit({ preview, name, price, weight, id, ingredients }) {
    const product = { preview, name, price, count: 1, weight, id, ingredients };
    this.favoritProducts.push(product);
    if (this.isAuthenticated) {
      localStorage.setItem('favoritProducts', JSON.stringify(this.favoritProducts));
    }
  }

  removeFromFavorit(productId) {
    this.favoritProducts = this.favoritProducts.filter(product => product.id !== productId);
    if (this.isAuthenticated) {
      localStorage.setItem('favoritProducts', JSON.stringify(this.favoritProducts));
    }
  }

  loadFromLocalStorage() {
    const data = localStorage.getItem('favoritProducts');
    if (data) {
      this.favoritProducts = JSON.parse(data);
    }
  }

  addToAdresses(adress) {
    this.adresses.push(adress);
    if (this.isAuthenticated) {
      localStorage.setItem('user_adresses', JSON.stringify(this.adresses));
    }
  }

  removeAdresses(addressName) {
    this.adresses = this.adresses.filter(adress => adress.addressName !== addressName);
    if (this.isAuthenticated) {
      localStorage.setItem('user_adresses', JSON.stringify(this.adresses));
    }
  }

  userPromocode() {
    this.promocode40 = false;
    localStorage.setItem('userData', JSON.stringify(this));
  }

  userPromocodeNotUse() {
    this.promocode40 = true;
    localStorage.setItem('userData', JSON.stringify(this));
  }
}

const userStore = new UserStore();
export default userStore;
