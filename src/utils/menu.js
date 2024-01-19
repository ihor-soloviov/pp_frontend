import axios from "axios";
import { url } from "../api";

export const getCategories = (setCategories) => {
  axios
    .get(`${url}/api/menu`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      const categories = res.data.response;

      const filteredCat = categories.filter((obj) =>
        obj.category_name.startsWith("onlineOrder:")
      );
      const mapCat = filteredCat.map((el, index) => {
        return {
          category_name: el.category_name.replace(/onlineOrder: /, ""),
          category_id: el.category_id,
          category_position_index: index,
        };
      });
      mapCat[12].category_position_index = 1;
      mapCat[11].category_position_index = 2;
      mapCat[8].category_position_index = 3;
      mapCat[10].category_position_index = 4;
      mapCat[9].category_position_index = 5;
      mapCat[2].category_position_index = 6;
      mapCat[3].category_position_index = 7;
      mapCat[0].category_position_index = 8;
      mapCat[6].category_position_index = 9;
      mapCat[4].category_position_index = 10;
      mapCat[7].category_position_index = 11;
      mapCat[1].category_position_index = 12;
      mapCat[5].category_position_index = 13;

      mapCat.sort(
        (a, b) => a.category_position_index - b.category_position_index
      );

      setCategories(mapCat);
    })
    .catch((err) => console.error(err));
};

export const getProducts = (id, setProducts) => {
  const data = JSON.stringify({ categoryId: id });

  axios
    .post(`${url}/api/products`, data, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      const data = res.data.response;

      const dataMap = data.map((item) => {
        return {
          photo: item.photo_origin,
          product_name: item.product_name,
          price: item.price,
          out: item.out,
          product_id: item.product_id,
          ingredients: item.product_production_description
            .split(".")[0]
            .split(", ")
            .join(", "),
          category: item.category_name,
        };
      });

      setProducts(dataMap);
    })
    .catch((err) => console.error(err));
};
