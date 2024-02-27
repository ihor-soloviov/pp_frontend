import { makeAutoObservable, runInAction } from "mobx";
import { getCategories } from "../utils/menu"

class MenuStore {
  categories = [];
  isFetchedCategories = false;

  constructor() {
    makeAutoObservable(this);
    this.fetchCategories()
  }

  fetchCategories = async () => {
    if (this.isFetchedCategories) return;
    this.isFetchedCategories = true; // Запобігає повторному виконанню
    console.log('fetching')
    try {
      const fetchedCategories = await getCategories();
      runInAction(() => {
        this.categories = fetchedCategories;
      });
    } catch (error) {
      console.error("Помилка при завантаженні категорій:", error);
    }
  }

}

const menuStore = new MenuStore();
export default menuStore;
