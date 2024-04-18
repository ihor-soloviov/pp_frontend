import { makeAutoObservable, runInAction } from "mobx";

class ModalsStore {
  authModal = false;
  cityModal = true;
  thanksModal = false;
  isLoader = false;
  isMobileMenu = false;
  isDiscountModal = false;
  thanksRegModal = false;


  constructor() {
    makeAutoObservable(this);
  }

  mobileMenuHandler = () => {
    this.isMobileMenu = !this.isMobileMenu
  }

  authModalHandler = (isOpen) => {
    this.authModal = isOpen;
  };

  cityModalHandler = (isOpen) => {
    this.cityModal = isOpen;
  };

  thanksModalHandler = (isOpen) => {
    this.thanksModal = isOpen;
  };

  thanksRegModalHandler = (isOpen) => {
    this.thanksRegModal = isOpen
  }

  isLoaderHandler = (isOpen) => {
    this.isLoader = isOpen;
  };

  isDiscountHandler = (isOpen) => {
    this.isDiscountModal = isOpen
  }

  setLoader = () => {
    runInAction(() => {
      this.isLoader = true;
    });
    setTimeout(() => {
      runInAction(() => {
        this.isLoader = false;
      });
    }, 1500);
  }
}

const modalsStore = new ModalsStore();
export default modalsStore;
