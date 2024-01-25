import React from "react";
import ProfileLink from "../ProfileLink/ProfileLink";
import ProductCard from "../ProductCard/ProductCard";
import { observer } from "mobx-react-lite";
import userStore from "../../store/user-store";
import "./Favorites.scss";

import { m } from "framer-motion"
import { animationLinks } from "../../animations/profile";


const Favorites = observer(({ handleSidebar }) => {
  const { favoritProducts } = userStore;

  return (
    <m.section
      initial="hidden"
      animate="visible"
      variants={animationLinks}
      transition={{ type: 'linear' }}
      className="grid_layout--main favorites"
    >
      <ProfileLink handleSidebar={handleSidebar}>Улюблені блюда</ProfileLink>
      {favoritProducts &&
        favoritProducts.map((favorite) => (
          <ProductCard
            preview={favorite.preview}
            name={favorite.name}
            price={favorite.price}
            weight={favorite.weight}
            key={favorite.id}
            id={favorite.id}
            ingredients={favorite.ingredients}
          />
        ))}
    </m.section>
  );
});

export default Favorites;
