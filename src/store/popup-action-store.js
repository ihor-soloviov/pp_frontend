import { makeAutoObservable } from 'mobx';

class PopupActionsStore {
  currentAction = '';

  constructor() {
    makeAutoObservable(this);
  }

  setActions(action) {
    this.currentAction = action;
  }
}

const popupActionsStore = new PopupActionsStore();
export default popupActionsStore;
