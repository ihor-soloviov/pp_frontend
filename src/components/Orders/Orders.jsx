/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import OrderModal from "../OrderModal/OrderModal";
import ProfileLink from "../ProfileLink/ProfileLink";
import "./Orders.scss";
import axios from "axios";
import { url } from "../../api"
import userStore from "../../store/user-store";

export const getOrderStatus = status => status === "60" ? "Виконане" : "Готується"

const Orders = ({ handleSidebar }) => {
  const [isMainModalOpen, setMainModalOpen] = useState(false);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null)



  const { token } = userStore;


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${url}/api/getOrdersFromDB/${token}`);
        if (response.data.length > 0) {
          console.log(response.data);
          setOrders(response.data)
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchOrders()

  }, [token])


  const openMainModal = (order) => {
    setSelectedOrder(order);

    setMainModalOpen(true);

  };

  const closeMainModal = () => {
    setMainModalOpen(false);
  };

  const openConfirmModal = () => {
    setConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setConfirmModalOpen(false);
  };


  return (
    <React.Fragment>
      <section className="grid_layout--main orders">
        <ProfileLink handleSidebar={handleSidebar}>
          Історія замовлень
        </ProfileLink>
        {orders.length > 0 && (
          orders.map(el => (
            <div key={el.id} className="order">
              <div className="order-container">
                <div className="order-info">
                  <div className="order-info__number">
                    <h4>{`Замовлення №${el.incoming_order_id}`}</h4>
                    <p className="status">{getOrderStatus(el.processing_status)}</p>
                  </div>
                  <div className="order-info__datetime">{el.created_at}</div>
                </div>
                <div className="order-details">
                  <h4>{el.amount} ₴</h4>
                  <button
                    onClick={() => openMainModal(el)}
                    className="order-details__modal-link"
                  >
                    Детальніше
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
        {selectedOrder && (

          <OrderModal
            order={selectedOrder}
            isConfirmModalOpen={isConfirmModalOpen}
            openConfirmModal={openConfirmModal}
            closeConfirmModal={closeConfirmModal}
            closeMainModal={closeMainModal}
            isMainModalOpen={isMainModalOpen}
          />
        )}
      </section>
    </React.Fragment>
  );
};

export default Orders;
