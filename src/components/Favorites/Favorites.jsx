import React from "react";
import { useEffect } from "react";
import ProfileLink from "../ProfileLink/ProfileLink";
import { useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./Favorites.scss";

const Favorites = ({ handleSidebar }) => {
  const [favorites, setFavorites] = useState([]);
  const data = localStorage.getItem("favoritProducts");

  useEffect(() => {
    const getFav = () => {
      setFavorites(JSON.parse(data));
    };

    getFav();
  }, [data]);

  return (
    <section className="grid_layout--main favorites">
      <ProfileLink handleSidebar={handleSidebar}>Улюблені блюда</ProfileLink>
      {favorites &&
        favorites.map((favorite) => (
          <ProductCard
            preview={favorite.preview}
            name={favorite.name}
            price={favorite.price}
            weight={favorite.weight}
            key={favorite.id}
            id={favorite.id}
            ingredients={favorite.ingredients}
            // liked={false}
          />
        ))}
    </section>
  );
};

export default Favorites;
