//Import React
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import userStore from "../../store/user-store";
import popupActionsStore from "../../store/popup-action-store";
import shoppingCartStore from "../../store/shoping-cart-store";

import { observer } from "mobx-react-lite";
import { sendFavsToServer } from "../../utils/favorites";

//Import Styles
import "./productCard.scss";
import classNames from "classnames";
import { addToCartHandler } from "../../utils/menu";
import ModificatorsPopup from "../../Pages/ProductPage/ModificatorsPopup";
import Popup from "../Popup/Popup";

const ProductCard = observer(({ product, preview, name, price, ingredients, weight, id }) => {
  const { token, favoritProducts, removeFromFavorit, addToFavorit } = userStore;

  const { addProduct } = shoppingCartStore;
  const { setActions } = popupActionsStore;

  const [count, setCount] = useState(1);
  const [isPopupOpened, setIsPopupOpened] = useState(false)
  const [selectedModificators, setSelectedModificators] = useState([]);

  const navigate = useNavigate();


  const addProductToCart = () => {
    addToCartHandler(addProduct, product, selectedModificators, count, id, setActions);
    setIsPopupOpened(false)
  }

  const handleModPopup = () => setIsPopupOpened(prev => !prev)

  const isItemFavourite = () => {
    if (!favoritProducts || favoritProducts === null) {
      return false;
    }
    return favoritProducts.some((el) => el.id === id);
  };

  const handleFavorite = () => {

    if (isItemFavourite()) {
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

  return (
    <>
      {isPopupOpened && product.group_modifications && (
        <Popup closeModal={handleModPopup}>
          <ModificatorsPopup groups={product.group_modifications} setSelectedModificators={setSelectedModificators} addProductToCart={addProductToCart} />
        </Popup>
      )}

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
              fill="transparent"
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
            src={preview}
            alt={name}
            onClick={() => navigate(`/product/${id}`)}
          />
          <button className="product__addToCard" onClick={() => product?.group_modifications?.length ? handleModPopup : addProductToCart()}>
            В кошик
          </button>
        </div>
        <div className="product__info">
          <p className="product__weight">{weight} г</p>
          <h4 className="product__name">{name}</h4>
          <p className="product__composition">{ingredients}</p>
        </div>
        <div className="product__order">
          <div className="product__price">
            <div className="product__total-price">{price * count} ₴</div>
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
    </>
  );
});

export default ProductCard;
