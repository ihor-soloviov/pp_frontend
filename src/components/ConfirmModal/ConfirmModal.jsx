import React from "react";
import Popup from "../Popup/Popup";
import { observer } from "mobx-react-lite";
import shoppingCartStore from "../../store/shoping-cart-store";
import { useNavigate } from "react-router-dom";

const ConfirmModal = observer(({ closeConfirmModal, orderId }) => {
  const navigate = useNavigate();
  const { repeatTheOrder } = shoppingCartStore;
  const handleRepeatTheOrder = () => {
    repeatTheOrder(orderId);
    navigate("/order")
  }


  return (
    <Popup closeModal={closeConfirmModal}>
      <div className="modal-content">
        <h2 className="modal-content--title">Повторити замовлення?</h2>
        <p className="confirm-text">
          Ми очистимо кошик і замінимо поточні позиції на позиції з цього
          замовлення
        </p>
        <button className="modal-button confirm" type="submit" onClick={handleRepeatTheOrder}>
          Підтвердити
        </button>
      </div>
    </Popup>
  );
})

export default ConfirmModal;
