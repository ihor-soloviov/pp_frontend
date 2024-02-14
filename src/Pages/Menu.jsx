//Import React
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//Import Components
import ProductCard from "../components/ProductCard/ProductCard";

//Import Utils
import { addToCartHandler, getCategories, getProducts } from "../utils/menu";
import classNames from "classnames";
import { url } from "../api";

//Impost styles
import "./menu.scss";
import Popup from "../components/Popup/Popup";
import ModificatorsPopup from "./ProductPage/ModificatorsPopup";
import shoppingCartStore from "../store/shoping-cart-store";

const Menu = React.memo(() => {
  const { id } = useParams();

  const [currentCatId, setCurrentCatId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState(null);

 

  useEffect(() => {
    getCategories(setCategories, setCurrentCatId);
  }, []);

  useEffect(() => {
    getProducts(currentCatId, setProducts);
  }, [currentCatId]);

  useEffect(() => {
    if (id) {
      setCurrentCatId(id);
    }
  }, [id]);

  return (
    <>
      <div className="categories" id="menu">
        <h1 className="title__h1">Куштуй тільки найсмачніше</h1>
        {categories && (
          <div className="categories__list">
            {categories.map((cat) => {
              return (
                <button
                  key={cat.category_id}
                  className={classNames("categories__btn", {
                    "categories__btn-active": currentCatId === cat.category_id,
                  })}
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
                product={product}
                preview={`${url}/api/sendImage/${product.product_id}`}
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
});

export default Menu;
