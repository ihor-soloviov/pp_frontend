//Import React
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import menuStore from "../store/menu-store";

//Import Components
import ProductCard from "../components/ProductCard/ProductCard";
import { Categories } from "../components/Categories/Categories";

//Impost styles
import "./menu.scss";

const Menu = observer(() => {
  const [products, setProducts] = useState(null);

  const { setProductsByCategoryId } = menuStore;

  useEffect(() => {
    if (products?.length) {
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
            <React.Fragment key={product.product_id}>
              <ProductCard product={product} />
            </React.Fragment>
          )
          )}
        </div>
      )}
    </React.Fragment>
  );
});

export default Menu;
