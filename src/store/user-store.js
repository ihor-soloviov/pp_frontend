import { makeAutoObservable, reaction } from "mobx";

class UserStore {
  isAuthenticated = false;
  name = null;
  phone = null;
  email = null;
  token = null;
  promocode40 = true;
  favoritProducts = [];
  adresses = [];
  dateOfBirth = null;
  avatar = "https://cdn-icons-png.flaticon.com/512/552/552721.png";

  constructor() {
    makeAutoObservable(this);
    this.loadUserDataFromLocalStorage();
    this.loadFavoritesFromLocalStorage();
    this.loadAddressesFromLocalStorage();

    reaction(
      () => this.userDataForLocalStorage,
      userData => localStorage.setItem("userData", JSON.stringify(userData))
    );

    reaction(
      () => this.favoritProducts.slice(), // Використовуйте .slice() для створення копії масиву, якщо необхідно
      (favoritProducts) => {
        if (this.isAuthenticated) {
          localStorage.setItem("favoritProducts", JSON.stringify(favoritProducts));
        }
      }
    );

    reaction(
      () => this.adresses,
      adresses => {
        if (this.isAuthenticated) {
          localStorage.setItem("user_adresses", JSON.stringify(adresses));
        }
      }
    );
  }

  get userDataForLocalStorage() {
    const { isAuthenticated, name, phone, email, token, promocode40, dateOfBirth, avatar } = this;
    return { isAuthenticated, name, phone, email, token, promocode40, dateOfBirth, avatar };
  }

  loadUserDataFromLocalStorage = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      Object.assign(this, userData);
    }
  }

  loadFavoritesFromLocalStorage() {
    const favoritProducts = JSON.parse(localStorage.getItem("favoritProducts"));
    if (favoritProducts) {
      this.favoritProducts = favoritProducts;
    }
  }

  loadAddressesFromLocalStorage() {
    const adresses = JSON.parse(localStorage.getItem("user_adresses"));
    if (adresses) {
      this.adresses = adresses;
    }
  }

  setUserAvatar = (avatarUrl) => {
    if (!avatarUrl) {
      return;
    }
    this.avatar = avatarUrl;
  }

  changePhoneNumber = (newNumber) => {
    this.phone = newNumber;
  }

  setUserDataToStore = ({
    name,
    phone,
    email,
    token,
    promocode40,
    favorites,
    addresses,
    dateOfBirth
  }) => {
    console.log('setUserDataToStore')
    this.isAuthenticated = true;
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.dateOfBirth = dateOfBirth
    this.token = token;
    this.promocode40 = promocode40;
    this.adresses = addresses;
    this.favoritProducts = favorites;
  };

  userLogout = () => {
    this.isAuthenticated = false;
    this.name = null;
    this.phone = null;
    this.email = null;
    this.token = null;
    this.promocode40 = false;
    this.dateOfBirth = null

  };

  addToFavorit = ({ preview, name, price, weight, id, ingredients }) => {
    const product = { preview, name, price, count: 1, weight, id, ingredients };
    this.favoritProducts.push(product);
  };

  removeFromFavorit = (productId) => {
    this.favoritProducts = this.favoritProducts.filter(
      (product) => product.id !== productId
    );
  };

  addToAdresses = (addresses) => {
    if (addresses.length > 0) {
      this.adresses = addresses;
    }
  };

  removeAdresses = (addressName) => {
    this.adresses = this.adresses.filter(
      (adress) => adress.adressName !== addressName
    );
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
