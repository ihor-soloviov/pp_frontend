import { makeAutoObservable } from "mobx";

class ModalsStore {
  authModal = false;
  cityModal = true;
  thanksModal = false;
  isLoader = false;

  constructor() {
    makeAutoObservable(this);
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
}

const modalsStore = new ModalsStore();
export default modalsStore;
