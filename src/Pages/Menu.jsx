//Import React
import React, { useEffect, useState } from "react";
//Impost styles
import "./menu.scss";

//Import Components
import ProductCard from "../components/ProductCard/ProductCard";

//Import plug
import axios from "axios";
import Container from "../components/Container/Container";
import { useParams } from "react-router-dom";

import Slider from "../components/Slider/Slider";
import { useSelector } from "react-redux";
import { url } from "../api";
import Loader from "../components/Loader/Loader";
import { sendFavsToServer } from "../utils/favorites";
import userStore from "../store/user-store";
const token = "436783:670964579c5655f22513de1218a29b4d";

const proxy_url = `https://pelmeni-proxy.work-set.eu`;
// eslint-disable-next-line
const poster_url = "https://polar-pelmeni-odessa.joinposter.com";

const Menu = () => {
  const { id } = useParams();

  const [currentCatId, setCurrentCatId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const data = localStorage.getItem("favoritProducts");

  const getCategories = () => {
    axios
      .get(`${url}/api/menu`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const data = res.data.response;

        const filteredCat = data.filter((obj) =>
          obj.category_name.startsWith("onlineOrder:")
        );
        const mapCat = filteredCat.map((el, index) => {
          return {
            category_name: el.category_name.replace(/onlineOrder: /, ""),
            category_id: el.category_id,
            category_position_index: index,
          };
        });
        mapCat[13].category_position_index = 0;
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

        setCurrentCatId(mapCat[0].category_id);
        setCategories(mapCat);
      })
      .catch((err) => console.error(err));
  };

  const getProducts = (id) => {
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

        // preview={poster_url + product.photo}
        // name={product.product_name}
        // price={parseInt(product.price[1].slice(0, -2))}
        // ingredients={product.ingredients}
        // weight={product.out}
        // key={product.product_id}
        // id={product.product_id}

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

  // //Завантаження улюблених страв
  // useEffect(() => {
  //   const fetchFavoritesFromServer = async () => {
  //     if (userToken) {
  //       try {
  //         const response = await axios.post(
  //           'https://polarpelmeni-api.work-set.eu/api/favorites',
  //           JSON.stringify({ token: userToken }),
  //           {
  //             headers: {
  //               'Access-Control-Allow-Origin': '*',
  //               'Content-Type': 'application/json',
  //             },
  //           }
  //         );
  //         if (response.status === 200) {
  //           const data = response.data;
  //           localStorage.setItem('favoritProducts', JSON.stringify(data));
  //         } else {
  //           console.error('Failed to fetch favorites from server');
  //         }
  //       } catch (error) {
  //         console.error('Error fetching favorites:', error);
  //       }
  //     }
  //   };

  //   fetchFavoritesFromServer();
  //   const favorites = JSON.parse(data)

  //   return () => {
  //     sendFavsToServer(userToken, favorites)
  //     console.log('baing')
  //   }
  // }, [data, userToken]);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getProducts(currentCatId);
  }, [currentCatId]);

  useEffect(() => {
    const getFav = () => {
      setFavorites(JSON.parse(data));
    };

    getFav();
  }, [data]);

  useEffect(() => {
    if (id) {
      setCurrentCatId(id);
    }
  }, [id]);

  return (
    <>
      <div className="categories" id="menu">
        <h1 className="title__h1">Куштуй тільки найсмачніше</h1>
        {products && (
          <div className="categories__list">
            {categories.map((cat) => {
              return (
                <button
                  key={cat.category_id}
                  className={`categories__btn ${
                    currentCatId === cat.category_id
                      ? "categories__btn-active"
                      : ""
                  }`}
                  onClick={() => setCurrentCatId(cat.category_id)}
                >
                  {cat.category_name}
                </button>
              );
            })}
          </div>
        )}
      </div>
      {products && (
        <div className="menu__products">
          {products.map((product) => {
            return (
              <ProductCard
                preview={`https://polarpelmeni-api.work-set.eu/api/sendImage/${product.product_id}`}
                name={product.product_name}
                price={parseInt(product.price[1].slice(0, -2))}
                ingredients={product.ingredients}
                weight={product.out}
                key={product.product_id}
                id={product.product_id}
                category={product.category}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default Menu;
