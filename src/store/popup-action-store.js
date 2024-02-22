import { makeAutoObservable } from "mobx";

class PopupActionsStore {
  currentAction = "";

  constructor() {
    makeAutoObservable(this);
  }

  setActions = (action = '') => {
    //якщо action не передати (дефолтне значння буде пустий рядок) - це прибирає action Modal
    this.currentAction = action;
  };
}

const popupActionsStore = new PopupActionsStore();
export default popupActionsStore;
