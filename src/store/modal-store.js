import { makeAutoObservable, runInAction } from "mobx";

class ModalsStore {
  authModal = false;
  cityModal = true;
  thanksModal = false;
  isLoader = false;
  isMobileMenu = false

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

  isLoaderHandler = (isOpen) => {
    this.isLoader = isOpen;
  };

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
