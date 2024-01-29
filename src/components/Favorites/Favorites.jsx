import React from "react";
import ProfileLink from "../ProfileLink/ProfileLink";
import ProductCard from "../ProductCard/ProductCard";
import { observer } from "mobx-react-lite";
import userStore from "../../store/user-store";
import "./Favorites.scss";



const Favorites = observer(({ handleSidebar }) => {
  const { favoritProducts } = userStore;

  return (
    <section

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
    </section>
  );
});

export default Favorites;
