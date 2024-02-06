import React from "react";
import Popup from "../Popup/Popup";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import "./OrderModal.scss";
import { getOrderStatus } from "../Orders/Orders";

const OrderModal = ({
  order,
  isMainModalOpen,
  closeMainModal,
  closeConfirmModal,
  isConfirmModalOpen,
  openConfirmModal,
}) => {
  const { client_address, persone_count, comment, amount, incoming_order_id, processing_status, created_at } = order;
  const { address1 } = client_address;
  const userComment = comment.split("Коментар від користувача: ").reverse()[0] || ""
  console.log(userComment)
  return (
    <>
      {isMainModalOpen && (
        <Popup closeModal={closeMainModal}>
          <div className="modal-content">
            <h2 className="modal-content--title">Деталі замовлення</h2>
            <div className="modal-content__info">
              <div className="title-line">
                <h4>{`Замовлення №${incoming_order_id}`}</h4>
                <p className="status">{getOrderStatus(processing_status)}</p>
              </div>

              <div className="content-lines">
                <div className="content-line">
                  <h5>Дата замовлення</h5>
                  <p className="info">{created_at}</p>
                </div>

                <div className="content-line">
                  <h5>Адреса доставки</h5>
                  <p className="info">{address1}</p>
                </div>

                <div className="content-line">
                  <h5>Кількість персон</h5>
                  <p className="info">{persone_count}</p>
                </div>

                <div className="content-line">
                  <h5>Спосіб оплати</h5>
                  <p className="info">"Онлайн"</p>
                </div>

                <div className="content-line__comment">
                  <h5>Коментар до замовлення:</h5>
                  <div className="comment">
                    <p>{userComment}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-content__price">
              <div className="content-lines">
                <div className="content-line">
                  <h5>Сума замовлення:</h5>
                  <h5 className="info">{amount} ₴</h5>
                </div>

                { /*               <div className="content-line">
                  <h5>Доставка:</h5>
                  <h5 className="info">70 ₴</h5>
                </div>

                <div className="title-line bottom">
                  <h4>Всього до сплати:</h4>
                  <h4>917 ₴</h4>
                </div>*/}
              </div>
            </div>
            <button className="modal-button" type="submit" onClick={openConfirmModal}>
              Повторити замовлення
            </button>
          </div>
        </Popup>

      )}

      {isConfirmModalOpen && (
        <ConfirmModal closeConfirmModal={closeConfirmModal} />
      )}
    </>
  );
};

export default OrderModal;
