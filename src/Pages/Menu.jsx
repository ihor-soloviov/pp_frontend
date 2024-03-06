//Import React
import React, { useEffect, useState } from "react";

//Import Components
import ProductCard from "../components/ProductCard/ProductCard";

//Import Utils
import { url } from "../api";

//Impost styles
import "./menu.scss";
import { Categories } from "../components/Categories/Categories";
import { observer } from "mobx-react-lite";
import menuStore from "../store/menu-store";

const Menu = observer(() => {
  const [products, setProducts] = useState(null);

  const { setProductsByCategoryId } = menuStore;

  useEffect(() => {
    if (products) {
      setProductsByCategoryId(products)
    }
  }, [products, setProductsByCategoryId])



  return (
    <React.Fragment>
      <div className="categories" id="menu">
        <h1 className="title__h1">Куштуй тільки найсмачніше</h1>
        <Categories setProducts={setProducts} />
      </div>
      {products && (
        <div className="menu__products">
          {products.map((product) => (
            <ProductCard
              product={product}
              preview={`${url}/api/sendImage/${product.product_id}`}
              name={product.product_name}
              price={product.price}
              ingredients={product.ingredients}
              weight={product.out}
              key={product.product_id}
              id={product.product_id}
              category={product.category}
            />
          )
          )}
        </div>
      )}
    </React.Fragment>
  );
});

export default Menu;
