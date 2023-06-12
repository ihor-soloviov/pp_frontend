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
import Banner from "../components/Banner/Banner";
import Slider from "../components/Slider/Slider";
import { useSelector } from "react-redux";
const token = "436783:670964579c5655f22513de1218a29b4d";

const proxy_url = `https://pelmeni-proxy.work-set.eu`;
// eslint-disable-next-line
const poster_url = "https://polar-pelmeni-odessa.joinposter.com";

const Menu = () => {
  const { id } = useParams();
  const userToken = useSelector((state) => state.user).token;

  const [currentCatId, setCurrentCatId] = useState("41");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const getCategories = () => {
    axios
      .get(`https://polarpelmeni-api.work-set.eu/api/menu`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("start");
        console.log(res);
        const data = res.data.response;

        const filteredCat = data.filter((obj) =>
          obj.category_name.startsWith("onlineOrder:")
        );
        const mapCat = filteredCat.map((el) => {
          return {
            category_name: el.category_name.replace(/onlineOrder: /, ""),
            category_id: el.category_id,
          };
        });

        setCategories(mapCat);
      })
      .catch((err) => console.error(err));
  };

  const getProducts = (id) => {
    const data = JSON.stringify({ categoryId: id });
    console.log("json", data);
    axios
      .post(`https://polarpelmeni-api.work-set.eu/api/products`, data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const data = res.data.response;
        console.log(data, "res GP");
        setProducts(data);
      })
      .catch((err) => console.error(err));
  };

  //Завантаження улюблених страв
  useEffect(() => {
    const fetchFavoritesFromServer = async () => {
      if (userToken) {
        try {
          const response = await axios.post(
            "https://polarpelmeni-api.work-set.eu/api/favourites",
            JSON.stringify({ token: userToken }),
            {
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
              },
            }
          );
          if (response.status === 200) {
            const data = response.data;
            localStorage.setItem("favorites", JSON.stringify(data));
          } else {
            console.error("Failed to fetch favorites from server");
          }
        } catch (error) {
          console.error("Error fetching favorites:", error);
        }
      }
    };

    fetchFavoritesFromServer();
  }, [userToken]);

  // Оновлення LocalStorage при зміні списку улюблених товарів
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);
  useEffect(() => {
    console.log("id", id);
    if (id) {
      setCurrentCatId(id);
    }
  }, [id]);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getProducts(currentCatId);
  }, [currentCatId]);

  //Функція для додавання- видалення айтемів з favorites
  // const handleFavoriteToggle = () => {
  //   if (favorites.includes(id)) {
  //     const updatedFavorites = favorites.filter(
  //       (favoriteId) => favoriteId !== id
  //     );
  //     setFavorites(updatedFavorites);
  //   } else {
  //     const updatedFavorites = [...favorites, id];
  //     setFavorites(updatedFavorites);
  //   }
  // };

  // Відправка змінених даних на сервер при закритті сторінки
  useEffect(() => {
    const sendFavoritesToServer = async () => {
      try {
        const response = await axios.post(
          "https://polarpelmeni-api.work-set.eu/api/updateFavourites",
          JSON.stringify({ token: userToken }),
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status !== 200) {
          console.error("Failed to update favorites on server");
        }
      } catch (error) {
        console.error("Error updating favorites:", error);
      }
    };

    window.addEventListener("beforeunload", sendFavoritesToServer);

    return () => {
      window.removeEventListener("beforeunload", sendFavoritesToServer);
    };
  }, [favorites]);

  return (
    <Container>
      <Slider />
      {/* <Banner
        title={'Polar Доставка'}
        desc={
          'Необов’язково покидати улюблене ліжко або ж взагалі виходити з дому, аби поласувати улюбленими пельменями!'
        }
      />
      <Banner
        title={'Любов з першого погляду існує... '}
        desc={
          'Насолоджуйтесь смачною їжею та будьте коханими в будь-який день'
        }
      />
      <Banner
        title={'Замовляй смаколики від Полар додому'}
        desc={
          'Швидко, яксіно і смачно'
        }
      /> */}
      <div className="categories">
        <h1 className="title__h1">Куштуй тільки найсмачніше</h1>
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
      </div>
      <div className="menu__products">
        {products.map((product) => {
          return (
            <ProductCard
              preview={poster_url + product.photo}
              name={product.product_name}
              price={parseInt(product.price[1].slice(0, -2))}
              ingredients={product.ingredients}
              weight={product.out}
              key={product.product_id}
              id={product.product_id}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default Menu;
