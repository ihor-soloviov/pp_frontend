import React, { useEffect } from "react";
import ProfileLink from "../ProfileLink/ProfileLink";
import ProductCard from "../ProductCard/ProductCard";
import { observer } from "mobx-react-lite";
import userStore from "../../store/user-store";
import "./Favorites.scss";



const Favorites = observer(({ handleSidebar }) => {
  const { favoritProducts } = userStore;
  
  useEffect(() => {
    console.log(favoritProducts)
  }, [favoritProducts])
  

  return (
    <section className="grid_layout--main favorites">
      <ProfileLink handleSidebar={handleSidebar}>Улюблені блюда</ProfileLink>
      {favoritProducts &&
        favoritProducts.map((favorite) => (
          <React.Fragment key={favorite.product_id}>
            <ProductCard product={favorite} />
          </React.Fragment>
        ))}
    </section>
  );
});

export default Favorites;
