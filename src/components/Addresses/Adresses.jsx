import React, { useState } from "react";
import "../ProfileGrid/ProfileGrid.scss";
import "./Addresses.scss";
import AddressModal from "../AddressModal/AddressModal";
import NewAddress from "../NewAddress/NewAddress";
import CreatedAddress from "../CreatedAddress/CreatedAddress";

const arr = [];

const Addresses = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const createAddress = (data) => {
    arr.push(data);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <section className="grid_layout--main addresses">
      <NewAddress openModal={openModal}/>
      <AddressModal
        closeModal={closeModal}
        isModalOpen={isModalOpen}
        createAddress={createAddress}
      />
      {arr.length > 0 && (
        arr.map(data => (
          <CreatedAddress key={data.addressName} data={data} openModal={openModal}/>
        ))
      )}
    </section>
  );
};

export default Addresses;
