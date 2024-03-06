import { makeAutoObservable, runInAction } from "mobx";
import { getCategories } from "../utils/menu"

class MenuStore {
  categories = [];
  products = [];

  constructor() {
    makeAutoObservable(this);
    this.fetchCategories()
  }

  fetchCategories = async () => {
    try {
      const fetchedCategories = await getCategories();
      runInAction(() => {
        this.categories = fetchedCategories;
      });
    } catch (error) {
      console.error("Помилка при завантаженні категорій:", error);
    }
  }

  setProductsByCategoryId = (products) => {
    this.products = products
  }

}

const menuStore = new MenuStore();
export default menuStore;
