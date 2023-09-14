import React from "react";
import plus from "../../../src/assets/add.svg";

const NewAddress = ({ openModal }) => (
  <div className="addresses_new">
    <div className="addresses_new__inner">
      <button onClick={openModal}>
        <img className="addresses_new__inner--icon" src={plus} alt="add" />
      </button>
      <p className="addresses_new__inner--text">Додати адресу</p>
    </div>
  </div>
);

export default NewAddress;
