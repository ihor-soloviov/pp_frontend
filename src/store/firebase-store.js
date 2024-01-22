import { makeAutoObservable } from "mobx";

class FirebaseStore {
  app = null;
  constructor() {
    makeAutoObservable(this);
  }

  setApp = (app) => {
    console.log(app);
    this.app = app;
  };
}

const firebaseStore = new FirebaseStore();
export default firebaseStore;
