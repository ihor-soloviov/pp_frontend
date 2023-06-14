import React from "react";
import { useEffect } from "react";
import ProfileLink from "../ProfileLink/ProfileLink";
import { useState } from "react";
import ProductCard from "../ProductCard/ProductCard";

const Favorites = ({ handleSidebar }) => {
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    const getFav = () => {
      const data = localStorage.getItem("favoritProducts");
      setFavorites(JSON.parse(data));
    };

    getFav();
    console.log("data: ", favorites);
  }, []);
  return (
    <section className="grid_layout--main orders">
      <ProfileLink handleSidebar={handleSidebar}>Улюблені блюда</ProfileLink>
      {favorites &&
        favorites.map((favorite) => {
          console.log('prod: ', favorite)
          return (
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
          );
        })}
    </section>
  );
};

export default Favorites;
