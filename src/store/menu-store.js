import { makeAutoObservable, runInAction } from "mobx";
import { getCategories } from "../utils/menu"

class MenuStore {
  categories = [];
  isFetchedCategories = false;
  products = [];

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

  fetchProductsByCategory = async (categoryId) => {
    const productsByCategory = this.products.find(({category_id}) => category_id === categoryId)
    if (productsByCategory) {
      return productsByCategory
    }
    // доробити
  }

}

const menuStore = new MenuStore();
export default menuStore;
