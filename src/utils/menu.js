import axios from 'axios';
import { url } from '../api';
import { add_to_cart } from '../gm4';
import shoppingCartStore from '../store/shoping-cart-store';
import popupActionsStore from '../store/popup-action-store';

const { addProduct } = shoppingCartStore;
const { setActions } = popupActionsStore;

export const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};

export const handleModificatorChange = (newModificator, setSelectedModificators) => {
  setSelectedModificators((prev) => {
    const index = prev.findIndex((modificator) => modificator.group === newModificator.group);

    if (index !== -1) {
      if (newModificator.name.toLowerCase().includes('без')) {
        return prev.filter((_, idx) => idx !== index);
      } else {
        return prev.map((modificator, idx) => (idx === index ? newModificator : modificator));
      }
    } else {
      return [...prev, newModificator];
    }
  });
};

export const addToCartHandler = (product, count) => {
  const { product_name, price, out, category_name, product_id, mods } = product;
  addProduct({
    name: product_name,
    price: price,
    count,
    preview: `${url}/api/sendImage/${product.product_id}`,
    weight: out,
    category: category_name,
    id: product_id,
    mods,
  });
  add_to_cart(product_name, product_id, price * count, category_name, count);

  setActions('addToCard');
  setTimeout(() => {
    setActions('');
  }, 2000);
};

export const getCategories = async () => {
  try {
    const response = await axios.get(`${url}/api/menu`, { headers });
    if (!response?.data?.response) {
      return [];
    }
    return response.data.response;
  } catch (error) {
    console.error('Помилка при отриманні категорій:', error);
    return [];
  }
};

export const getProducts = async (id, setProducts) => {
  try {
    const response = await axios.get(`${url}/api/products/${id}`, { headers });
    if (!response?.data) {
      return;
    }

    const productsData = response.data;
    setProducts(productsData);
  } catch (error) {
    console.error('Помилка при отриманні продуктів:', error);
  }
};

export const getProductById = async (id, setProduct) => {
  try {
    // Перший запит
    const product = await axios.get(`${url}/api/product/${id}`, { headers });

    if (product.data) {
      setProduct(product.data);
    }
  } catch (error) {
    console.error(error);
  }
};
