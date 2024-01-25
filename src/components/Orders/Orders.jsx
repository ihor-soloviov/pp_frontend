/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { m } from "framer-motion"
import OrderModal from "../OrderModal/OrderModal";
import ProfileLink from "../ProfileLink/ProfileLink";
import "./Orders.scss";
import { animationLinks } from "../../animations/profile";

const Orders = ({ handleSidebar }) => {
  const [isMainModalOpen, setMainModalOpen] = useState(false);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);

  useEffect(() => {

  }, [])


  const openMainModal = () => {
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
      <m.section
        initial="hidden"
        animate="visible"
        variants={animationLinks}
        transition={{ type: 'linear' }}
        className="grid_layout--main orders">
        <ProfileLink handleSidebar={handleSidebar}>
          Історія замовлень
        </ProfileLink>
        <div className="order">
          <div className="order-container">
            <div className="order-info">
              <div className="order-info__number">
                <h4>Замовлення №2323</h4>
                <p className="status">Виконане</p>
              </div>
              <div className="order-info__datetime">05.01.2023, 12:30</div>
            </div>
            <div className="order-details">
              <h4>496 ₴</h4>
              <button
                onClick={openMainModal}
                className="order-details__modal-link"
              >
                Детальніше
              </button>
            </div>
          </div>
        </div>
        <OrderModal
          isConfirmModalOpen={isConfirmModalOpen}
          openConfirmModal={openConfirmModal}
          closeConfirmModal={closeConfirmModal}
          closeMainModal={closeMainModal}
          isMainModalOpen={isMainModalOpen}
        />
      </m.section>
    </>
  );
};

export default Orders;
