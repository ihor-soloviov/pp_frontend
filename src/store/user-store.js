import { makeAutoObservable, reaction } from 'mobx';

class UserStore {
  isAuthenticated = false;
  isAdmin = true;
  name = null;
  phone = null;
  email = null;
  token = null;
  promocode40 = true;
  favoritProducts = [];
  adresses = [];
  dateOfBirth = null;
  avatar = 'https://cdn-icons-png.flaticon.com/512/552/552721.png';

  constructor() {
    makeAutoObservable(this);
    this.loadUserDataFromLocalStorage();
    this.loadFavoritesFromLocalStorage();
    this.loadAddressesFromLocalStorage();

    reaction(
      () => this.userDataForLocalStorage,
      (userData) => localStorage.setItem('userData', JSON.stringify(userData)),
    );

    reaction(
      () => (Array.isArray(this.favoritProducts) ? this.favoritProducts.slice() : []), // Використовуйте .slice() для створення копії масиву, якщо необхідно
      (favoritProducts) => {
        if (this.isAuthenticated) {
          localStorage.setItem('favoritProducts', JSON.stringify(favoritProducts));
        }
      },
    );

    reaction(
      () => (Array.isArray(this.adresses) ? this.adresses.slice() : []),
      (adresses) => {
        if (this.isAuthenticated) {
          localStorage.setItem('user_adresses', JSON.stringify(adresses));
        }
      },
    );
  }

  get userDataForLocalStorage() {
    const {
      isAuthenticated,
      name,
      phone,
      email,
      token,
      promocode40,
      dateOfBirth,
      avatar,
      isAdmin,
    } = this;
    return {
      isAuthenticated,
      name,
      phone,
      email,
      token,
      promocode40,
      dateOfBirth,
      avatar,
      isAdmin,
    };
  }

  loadUserDataFromLocalStorage = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      Object.assign(this, userData);
    }
  };

  loadFavoritesFromLocalStorage() {
    const favoritProducts = JSON.parse(localStorage.getItem('favoritProducts'));
    if (favoritProducts) {
      this.favoritProducts = favoritProducts;
    }
  }

  loadAddressesFromLocalStorage() {
    const addressesFromLS = localStorage.getItem('user_adresses');
    if (!addressesFromLS || addressesFromLS === 'undefined') {
      this.adresses = [];
      return;
    }

    this.adresses = JSON.parse(addressesFromLS);
  }

  setUserAvatar = (avatarUrl) => {
    if (!avatarUrl) {
      return;
    }
    this.avatar = avatarUrl;
  };

  changePhoneNumber = (newNumber) => {
    this.phone = newNumber;
  };

  setUserDataToStore = ({
    name,
    phone,
    email,
    token,
    promocode40,
    favorites,
    addresses,
    dateOfBirth,
    isAdmin,
  }) => {
    console.log('setUserDataToStore');
    this.isAuthenticated = true;
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.dateOfBirth = dateOfBirth;
    this.token = token;
    this.promocode40 = promocode40;
    this.adresses = addresses;
    this.favoritProducts = favorites;
    this.isAdmin = isAdmin;
  };

  userLogout = () => {
    this.isAuthenticated = false;
    this.name = null;
    this.phone = null;
    this.email = null;
    this.token = null;
    this.promocode40 = false;
    this.dateOfBirth = null;
    this.isAdmin = true;
    this.adresses = [];
  };

  addToFavorit = ({ product_name, price, out, product_id, ingredients }) => {
    const product = { product_name, price, count: 1, out, product_id, ingredients };
    this.favoritProducts.push(product);
  };

  removeFromFavorit = (productId) => {
    this.favoritProducts = this.favoritProducts.filter(
      (product) => product.product_id !== productId,
    );
  };

  addToAdresses = (addresses) => {
    this.adresses = addresses;
  };

  removeAdresses = (addressId) => {
    this.adresses = this.adresses.filter((adress) => adress.addressId !== addressId);
  };

  userPromocode = () => {
    this.promocode40 = false;
  };

  userPromocodeNotUse = () => {
    this.promocode40 = true;
  };
}

const userStore = new UserStore();
export default userStore;
