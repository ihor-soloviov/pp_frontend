import React from "react";
import Popup from "../Popup/Popup";
import { observer } from "mobx-react-lite";
import shoppingCartStore from "../../store/shoping-cart-store";

const ConfirmModal = observer(({ closeConfirmModal, products }) => {
  const { repeatTheOrder } = shoppingCartStore
  console.log(products)
  return (
    <Popup closeModal={closeConfirmModal}>
      <div className="modal-content">
        <h2 className="modal-content--title">Повторити замовлення?</h2>
        <p className="confirm-text">
          Ми очистимо кошик і замінимо поточні позиції на позиції з цього
          замовлення
        </p>
        <button className="modal-button confirm" type="submit" onClick={() => repeatTheOrder(products)}>
          Підтвердити
        </button>
      </div>
    </Popup>
  );
})

export default ConfirmModal;
