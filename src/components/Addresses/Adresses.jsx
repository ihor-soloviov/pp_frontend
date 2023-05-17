import React, { useState } from "react";
import "../ProfileGrid/ProfileGrid.scss";
import plus from "../../../src/assets/add.svg";
import "./Addresses.scss";
import AddressModal from "../AddressModal/AddressModal";

const Addresses = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    console.log('opened')
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <section className="grid_layout--main addresses">
      <div className="addresses_new">
        <div className="addresses_new__inner">
          <button onClick={openModal}>
            <img className="addresses_new__inner--icon" src={plus} alt="add" />
          </button>
          <p className="addresses_new__inner--text">Додати адресу</p>
        </div>
      </div>
      <AddressModal closeModal={closeModal} isModalOpen={isModalOpen} />
    </section>
  );
};

export default Addresses;
