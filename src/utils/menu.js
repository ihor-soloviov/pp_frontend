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

const customIndexMap = {
  12: 1,
  11: 2,
  8: 3,
  10: 4,
  9: 5,
  2: 6,
  3: 7,
  0: 8,
  6: 9,
  4: 10,
  7: 11,
  1: 12,
  5: 13,
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
    price: parseInt(price[1].slice(0, -2)),
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
    parseInt(price[1].slice(0, -2)) * count,
    category_name,
    count
  );

  setActions("addToCard");
  setTimeout(() => {
    setActions("");
  }, 2000);
}

export const getCategories = async (setCategories, setCurrentCatId) => {
  try {
    const response = await axios.get(`${url}/api/menu`, { headers });

    if (!response?.data?.response) {
      return
    }
    const categories = response.data.response;
    
    const filtr = ["onlineOrder: Напівфабрикати", "onlineOrder: Десерти", "onlineOrder: Додатково", "onlineOrder: Чик-чирик", "onlineOrder: Комбо "]

    // Фільтруємо та перетворюємо категорії
    const processedCategories = categories
      .filter(category => !filtr.includes(category.category_name))
      .filter((category) => category.category_name.startsWith("onlineOrder:"))
      .map((category, index) => ({
        ...category,
        category_name: category.category_name.replace("onlineOrder: ", ""),
        category_position_index: index,
      }));


    // Переназначаємо індекси згідно з мапою
    processedCategories.forEach((category) => {
      category.category_position_index =
        customIndexMap[category.category_position_index] ||
        category.category_position_index;
    });

    // Сортуємо категорії за індексом позиції
    processedCategories.sort(
      (a, b) => a.category_position_index - b.category_position_index
    );

    console.log(processedCategories)

    // Оновлюємо стан
    setCategories(processedCategories);
    if (setCurrentCatId && processedCategories.length > 0) {
      setCurrentCatId(processedCategories[0].category_id);
    }
  } catch (error) {
    console.error("Помилка при отриманні категорій:", error);
  }
};

export const getProducts = async (id, setProducts) => {
  try {
    const data = JSON.stringify({ categoryId: id });

    const response = await axios.post(`${url}/api/products`, data, { headers });

    if (!response?.data?.response) {
      return
    }

    const productsData = response.data.response;

    // Перетворюємо дані продуктів
    const processedProducts = productsData.map(
      ({
        photo_origin,
        product_name,
        price,
        out,
        product_id,
        product_production_description,
        category_name,
        group_modifications
      }) => ({
        photo: photo_origin,
        product_name: product_name,
        price: price,
        out: out,
        product_id: product_id,
        ingredients: product_production_description
          .split(".")[0]
          .split(", ")
          .join(", "),
        category: category_name,
        group_modifications
      })
    );

    setProducts(processedProducts);
  } catch (error) {
    console.error("Помилка при отриманні продуктів:", error);
  }
};

export const productPageGetter = async (id, setProduct, setGroupsOfModificators, setRecommendationsProducts) => {
  try {
    // Перший запит
    const productResponse = await axios.post(`${url}/api/product`, JSON.stringify({ productId: id }), { headers });
    console.log(productResponse.data)
    setProduct(productResponse.data);
    const modificators = productResponse.data.group_modifications;
    setGroupsOfModificators(modificators)

    // Другий запит
    const menuCategoryId = JSON.stringify({ categoryId: productResponse.data.menu_category_id });
    const recommendationsResponse = await axios.post(`${url}/api/products`, menuCategoryId, { headers });

    const recommendationsData = recommendationsResponse.data.response.map(item => ({
      key: item.product_id,
      photo: item.photo_origin,
      product_name: item.product_name,
      price: item.price,
      out: item.out,
      product_id: item.product_id,
      ingredients: item.product_production_description.split(".")[0].split(", ").join(", "),
      category_name: item.category_name,
    }));
    setRecommendationsProducts(recommendationsData);



  } catch (error) {
    console.error(error);
  }
};
