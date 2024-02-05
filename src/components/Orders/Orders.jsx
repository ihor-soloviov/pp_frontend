/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import OrderModal from "../OrderModal/OrderModal";
import ProfileLink from "../ProfileLink/ProfileLink";
import "./Orders.scss";
import axios from "axios";
import { url } from "../../api"


const Orders = ({ handleSidebar }) => {
  const [isMainModalOpen, setMainModalOpen] = useState(false);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null)

  const getOrderStatus = status => status === "60" ? "Виконане" : "Готується"

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${url}/api/getOrders/82`);
        if (response.data.length > 0) {
          console.log(response.data);
          setOrders(response.data)
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchOrders()

  }, [])


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
    <>
      <section className="grid_layout--main orders">
        <ProfileLink handleSidebar={handleSidebar}>
          Історія замовлень
        </ProfileLink>
        {orders.length > 0 && (
          orders.map(el => (
            <div key={el.transaction_id} className="order">
              <div className="order-container">
                <div className="order-info">
                  <div className="order-info__number">
                    <h4>{`Замовлення №${el.transaction_id}`}</h4>
                    <p className="status">{getOrderStatus(el.processing_status)}</p>
                  </div>
                  <div className="order-info__datetime">{el.date_close_date}</div>
                </div>
                <div className="order-details">
                  <h4>{el.payed_sum.slice(0, -2)} ₴</h4>
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
        <OrderModal
          order={selectedOrder}
          isConfirmModalOpen={isConfirmModalOpen}
          openConfirmModal={openConfirmModal}
          closeConfirmModal={closeConfirmModal}
          closeMainModal={closeMainModal}
          isMainModalOpen={isMainModalOpen}
        />
      </section>
    </>
  );
};

export default Orders;
