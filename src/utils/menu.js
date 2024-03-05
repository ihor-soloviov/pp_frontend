import axios from "axios";
import { url } from "../api";
import { add_to_cart } from "../gm4";
import shoppingCartStore from "../store/shoping-cart-store";
import popupActionsStore from "../store/popup-action-store";

const { addProduct } = shoppingCartStore;
const { setActions } = popupActionsStore;

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};

export const handleModificatorChange = (newModificator, setSelectedModificators) => {
  setSelectedModificators(prev => {
    const index = prev.findIndex(modificator => modificator.group === newModificator.group);

    if (index !== -1) {
      if (newModificator.name.toLowerCase().includes("без")) {
        return prev.filter((_, idx) => idx !== index);
      } else {
        return prev.map((modificator, idx) => idx === index ? newModificator : modificator);
      }
    } else {
      return [...prev, newModificator];
    }
  });
};

export const addToCartHandler = (product, count) => {
  const { product_name, price, out, category_name, product_id, mods } = product
  addProduct({
    name: product_name,
    price: price,
    count,
    preview: `${url}/api/sendImage/${product.product_id}`,
    weight: out,
    category: category_name,
    id: product_id,
    mods
  });
  add_to_cart(
    product_name,
    product_id,
    price * count,
    category_name,
    count
  );

  setActions("addToCard");
  setTimeout(() => {
    setActions("");
  }, 2000);
}

export const getCategories = async () => {
  try {
    const response = await axios.get(`${url}/api/menu`, { headers });
    if (!response?.data?.response) {
      return [];
    }
    console.log(response.data.response)
    return response.data.response;
  } catch (error) {
    console.error("Помилка при отриманні категорій:", error);
    return [];
  }
};

export const getProducts = async (id, setProducts) => {
  try {
    
    const response = await axios.get(`${url}/api/products/${id}`, { headers });
    console.log(response)
    if (!response?.data) {
      return
    }

    const productsData = response.data;
    console.log(productsData)
    setProducts(productsData);
  } catch (error) {
    console.error("Помилка при отриманні продуктів:", error);
  }
};

export const productPageGetter = async (id, setProduct, setGroupsOfModificators, setRecommendationsProducts) => {
  try {
    // Перший запит
    const productResponse = await axios.post(`${url}/api/product`, JSON.stringify({ productId: id }), { headers });
    const factoredProduct = {
      ...productResponse.data, price: parseInt(productResponse.data.price[1].slice(0, -2))
    }
    setProduct(factoredProduct);
    const modificators = productResponse.data.group_modifications;
    setGroupsOfModificators(modificators)

    // Другий запит
    const menuCategoryId = JSON.stringify({ categoryId: productResponse.data.menu_category_id });
    const recommendationsResponse = await axios.post(`${url}/api/products`, menuCategoryId, { headers });
    console.log(recommendationsResponse.data.response)

    const recommendationsData = recommendationsResponse.data.response.map(item => ({
      key: item.product_id,
      photo: item.photo_origin,
      product_name: item.product_name,
      price: parseInt(item.price[1].slice(0, -2)),
      out: item.out,
      product_id: item.product_id,
      ingredients: item.product_production_description.split(".")[0].split(", ").join(", "),
      category_name: item.category_name,
      group_modifications: item.group_modifications
    }));
    setRecommendationsProducts(recommendationsData);



  } catch (error) {
    console.error(error);
  }
};
