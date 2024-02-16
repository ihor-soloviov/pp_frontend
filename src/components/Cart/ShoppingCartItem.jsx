import React from "react";
import shoppingCartStore from "../../store/shoping-cart-store";
import { observer } from "mobx-react-lite";

const ShoppingCartItem = observer(({ id }) => {

  const { removeFromCart, getItemById, updateItemQuantity } = shoppingCartStore;
  const cartItem = getItemById(id);

  if (!cartItem) return null

  const { preview, name, weight, price, count, mods } = cartItem

  return (
    <li className="shopping-cart__item">
      <div className="item-inner">
        <div className="shopping-cart__preview">
          <img src={preview} alt="product" />
        </div>
        <div className="shopping-cart__info">
          <div className="shopping-cart__row">
            <h6 className="title__h8">{name}</h6>
            <div
              className="shopping-cart__remove"
              onClick={() => removeFromCart(id)}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.0006 4.82144L10.1256 0.696442L11.3039 1.87478L7.17893 5.99977L11.3039 10.1248L10.1256 11.3031L6.0006 7.17811L1.8756 11.3031L0.697266 10.1248L4.82227 5.99977L0.697266 1.87478L1.8756 0.696442L6.0006 4.82144Z"
                  fill="#49484D"
                />
              </svg>
            </div>
          </div>

          <p className="shopping-cart__weight">{weight} г</p>
          <div className="shopping-cart__row">
            <p className="shopping-cart__price">{price} ₴</p>
            <div className="counter">
              <div
                className="counter__btn counter__btn--light"
                onClick={() => {
                  if (count > 1) {
                    updateItemQuantity(id, count - 1)
                  }
                }}
              >
                -
              </div>
              <div className="counter__value">{count}</div>
              <div
                className="counter__btn counter__btn--light"
                onClick={() => updateItemQuantity(id, count + 1)}
              >
                +
              </div>
            </div>
          </div>
        </div>
      </div>
      {!!mods.length && (
        <ul className="mods-inner">
          {mods.map(mod => (
            <li className="mods-item">
              <p>+{mod.name}</p>
              <p>+{mod.price}₴</p>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
);

export default ShoppingCartItem;
