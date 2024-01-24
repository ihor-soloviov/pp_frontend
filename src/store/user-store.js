import axios from "axios";
import { makeAutoObservable } from "mobx";

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
  dateOfBirth = null

  constructor() {
    makeAutoObservable(this);
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
    this.isAuthenticated = true;
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.dateOfBirth = dateOfBirth
    this.token = token;
    this.promocode40 = promocode40;
    this.adresses = addresses;
    this.favoritProducts = favorites;
    localStorage.setItem("userData", JSON.stringify(this));
  };

  changePhoneNumber = (newNumber) => {
    this.phone = newNumber;
    localStorage.setItem("userData", JSON.stringify(this))
  }

  userLogout = () => {
    this.isAuthenticated = false;
    this.name = null;
    this.phone = null;
    this.email = null;
    this.token = null;
    this.promocode40 = false;
    this.dateOfBirth = null
    localStorage.removeItem("userData");
  };

  updateCity = (city) => {
    this.city = city;
    const userDataFromStorage = JSON.parse(localStorage.getItem("userData"));

    if (!userDataFromStorage?.isAuthenticated) {
      return;
    }
    const updatedDataWithCity = { ...userDataFromStorage, city: city };
    localStorage.setItem("userData", JSON.stringify(updatedDataWithCity));
  };

  addToFavorit = ({ preview, name, price, weight, id, ingredients }) => {
    const product = { preview, name, price, count: 1, weight, id, ingredients };
    this.favoritProducts.push(product);
    if (this.isAuthenticated) {
      localStorage.setItem(
        "favoritProducts",
        JSON.stringify(this.favoritProducts)
      );
    }
  };

  removeFromFavorit = (productId) => {
    console.log("a");
    this.favoritProducts = this.favoritProducts.filter(
      (product) => product.id !== productId
    );
    if (this.isAuthenticated) {
      localStorage.setItem(
        "favoritProducts",
        JSON.stringify(this.favoritProducts)
      );
    }
  };

  getFavoritesFromLS = () => {
    const data = localStorage.getItem("favoritProducts");
    if (data) {
      this.favoritProducts = JSON.parse(data);
    }
  };

  loadFromLocalStorageAdress = () => {
    const adresses = localStorage.getItem("user_adresses");
    const dataParse = JSON.parse(adresses);
    if (dataParse !== null) {
      this.adresses = dataParse;
    }
  };

  addToAdresses = (addresses) => {
    if (addresses.length > 0) {
      this.adresses = addresses;
    }
    if (this.isAuthenticated) {
      localStorage.setItem("user_adresses", JSON.stringify(this.adresses));
    }
  };

  removeAdresses = (addressName) => {
    this.adresses = this.adresses.filter(
      (adress) => adress.adressName !== addressName
    );
    if (this.isAuthenticated) {
      localStorage.setItem("user_adresses", JSON.stringify(this.adresses));
    }
  };

  userPromocode = () => {
    this.promocode40 = false;
    localStorage.setItem("userData", JSON.stringify(this));
  };

  userPromocodeNotUse = () => {
    this.promocode40 = true;
    localStorage.setItem("userData", JSON.stringify(this));
  };
}

const userStore = new UserStore();
export default userStore;
