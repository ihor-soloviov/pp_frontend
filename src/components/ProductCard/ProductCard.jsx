//Import React
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { add_to_cart } from "../../gm4";

import userStore from "../../store/user-store";
import popupActionsStore from "../../store/popup-action-store";
import shoppingCartStore from "../../store/shoping-cart-store";

import { observer } from "mobx-react-lite";
import { sendFavsToServer } from "../../utils/favorites";

//Import Styles
import "./productCard.scss";
import classNames from "classnames";

const ProductCard = observer((props) => {
  const { token, favoritProducts, removeFromFavorit, addToFavorit } = userStore;
  const { addProduct } = shoppingCartStore;
  const { setActions } = popupActionsStore;

  const [count, setCount] = useState(1);
  const [inCart, setInCart] = useState(false);

  const navigate = useNavigate();

  const isItemFavourite = () => {
    if (!favoritProducts) {
      return false;
    }
    return favoritProducts.some((el) => el.id === props.id);
  };

  const handleFavorite = () => {
    const { id, name, price, count, preview, weight, ingredients } = props;

    if (favoritProducts.some((el) => el.id === id)) {
      removeFromFavorit(id);
    } else {
      setActions("addToFavorit");
      setTimeout(() => {
        setActions("");
      }, 2000);

      addToFavorit({
        name,
        price,
        count,
        preview,
        weight,
        id,
        ingredients,
      });

      sendFavsToServer(token, favoritProducts);
    }
  };

  const addToCart = () => {
    console.log("addToCart");
    setActions("addToCard");
    addProduct({
      name: props.name,
      price: props.price,
      count: count,
      preview: props.preview,
      weight: props.weight,
      id: props.id,
      ingredients: props.ingredients,
      category: props.category,
    });

    setInCart(true);

    add_to_cart(props.name, props.id, props.price, props.category, count);
    setTimeout(() => {
      setInCart(false);

      setActions("");
    }, 2000);
  };

  return (
    <div className="product">
      <div className="product__cta">
        <div
          className={classNames("product__like", {
            "product__like-active": isItemFavourite(),
          })}
          onClick={() => handleFavorite()}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            // fill="transparent"
            fill="black"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.5097 3.13486L7.99967 3.68282L7.48964 3.13486C6.08123 1.62171 3.79773 1.62171 2.38932 3.13486C0.980904 4.648 0.980904 7.10129 2.38932 8.61444L6.97961 13.5461C7.54297 14.1513 8.45637 14.1513 9.01974 13.5461L13.61 8.61444C15.0184 7.10129 15.0184 4.648 13.61 3.13486C12.2016 1.62171 9.91812 1.62171 8.5097 3.13486Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className="product__preview">
        <img
          loading="lazy"
          src={props.preview}
          alt={props.name}
          onClick={() => navigate(`/product/${props.id}`)}
        />
        {inCart === true ? (
          <button>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.66715 10.1138L12.7954 3.9856L13.7382 4.9284L6.66715 11.9994L2.4245 7.75685L3.36731 6.81405L6.66715 10.1138Z"
                fill="#92939A"
              />
            </svg>
            <p> Додано до кошику</p>
          </button>
        ) : (
          <button className="product__addToCard" onClick={() => addToCart()}>
            В кошик
          </button>
        )}
      </div>
      <div className="product__info">
        <p className="product__weight">{props.weight} г</p>
        <h4 className="product__name">{props.name}</h4>
        <p className="product__composition">{props.ingredients}</p>
      </div>
      <div className="product__order">
        <div className="product__price">
          <div className="product__total-price">{props.price * count} ₴</div>
        </div>
        <div className="counter">
          <div
            className="counter__btn"
            onClick={() => {
              if (count > 1) {
                setCount(count - 1);
              }
            }}
          >
            -
          </div>
          <div className="counter__value">{count}</div>
          <div className="counter__btn" onClick={() => setCount(count + 1)}>
            +
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProductCard;
