import React from "react";
import Popup from "../Popup/Popup";

const ConfirmModal = ({ closeConfirmModal }) => {
  return (
    <Popup closeModal={closeConfirmModal}>
      <div className="modal-content">
        <h2 className="modal-content--title">Повторити замовлення?</h2>
        <p className="confirm-text">
          Ми очистимо кошик і замінимо поточні позиції на позиції з цього
          замовлення
        </p>
        <button className="modal-button confirm" type="submit">
          Підтвердити
        </button>
      </div>
    </Popup>
  );
};

export default ConfirmModal;
