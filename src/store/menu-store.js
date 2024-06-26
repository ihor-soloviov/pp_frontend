import { makeAutoObservable, runInAction } from 'mobx';
import { getCategories } from '../utils/menu';

class MenuStore {
  categories = [];
  currentCategoryId = '67';
  products = [];

  constructor() {
    makeAutoObservable(this);
    this.fetchCategories();

  }

  fetchCategories = async () => {
    try {
      const fetchedCategories = await getCategories();
      runInAction(() => {
        this.categories = fetchedCategories;
      });
    } catch (error) {
      console.error('Помилка при завантаженні категорій:', error);
    }
  };

  setCurrentCategoryId = (id) => {
    this.currentCategoryId = id;
  };

  handleMenuCategory = (dropDownHandler, id) => {
    if (!id) {
      return
    }
    dropDownHandler();
    this.setCurrentCategoryId(id)
  }

  setProductsByCategoryId = (products) => {
    this.products = products;
  };
}

const menuStore = new MenuStore();
export default menuStore;
