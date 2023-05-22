import React from "react";
import Popup from "../Popup/Popup";
import "./OrderModal.scss";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

const OrderModal = ({
  isMainModalOpen,
  closeMainModal,
  closeConfirmModal,
  isConfirmModalOpen,
  openConfirmModal,
}) => {
  return (
    <>
      {isMainModalOpen && (
        <Popup closeModal={closeMainModal}>
          <div className="modal-content">
            <h2 className="modal-content--title">Деталі замовлення</h2>
            <div className="modal-content__info">
              <div className="title-line">
                <h4>Замовлення №6648</h4>
                <p className="status">Виконане</p>
              </div>

              <div className="content-lines">
                <div className="content-line">
                  <h5>Дата замовлення</h5>
                  <p className="info">18.03.2023, 18:39</p>
                </div>

                <div className="content-line">
                  <h5>Адреса доставки</h5>
                  <p className="info">вул. Мачтова, 10</p>
                </div>

                <div className="content-line">
                  <h5>Кількість персон</h5>
                  <p className="info">2</p>
                </div>

                <div className="content-line">
                  <h5>Спосіб оплати</h5>
                  <p className="info">Онлайн</p>
                </div>

                <div className="content-line__comment">
                  <h5>Коментар до замовлення:</h5>
                  <div className="comment">
                    <p>Натиснути на домофоні 75Е</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-content__price">
              <div className="content-lines">
                <div className="content-line">
                  <h5>Сума замовлення:</h5>
                  <h5 className="info">870 ₴</h5>
                </div>

                <div className="content-line">
                  <h5>Доставка:</h5>
                  <h5 className="info">70 ₴</h5>
                </div>

                <div className="title-line bottom">
                  <h4>Всього до сплати:</h4>
                  <h4>917 ₴</h4>
                </div>
              </div>
            </div>
            <button className="modal-button" type="submit" onClick={openConfirmModal}>
              Повторити замовлення
            </button>
          </div>
        </Popup>
        
      )}

      {isConfirmModalOpen && (
        <ConfirmModal closeConfirmModal={closeConfirmModal}/>
      )}
    </>
  );
};

export default OrderModal;
