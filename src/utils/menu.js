import axios from "axios";
import { url } from "../api";

export const getCategories = async (setCategories, setCurrentCatId) => {
  try {
    const response = await axios.get(`${url}/api/menu`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });

    const categories = response.data.response;

    // Фільтруємо та перетворюємо категорії
    const processedCategories = categories
      .filter((category) => category.category_name.startsWith("onlineOrder:"))
      .map((category, index) => ({
        ...category,
        category_name: category.category_name.replace("onlineOrder: ", ""),
        category_position_index: index,
      }));

    // Створюємо мапу для кастомних індексів позицій для відображення категорій у потрібному порядку
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

    const response = await axios.post(`${url}/api/products`, data, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });

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
      })
    );

    setProducts(processedProducts);
  } catch (error) {
    console.error("Помилка при отриманні продуктів:", error);
  }
};
