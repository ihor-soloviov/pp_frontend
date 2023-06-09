import React, { useState } from "react";
import "../ProfileGrid/ProfileGrid.scss";
import "./Addresses.scss";
import AddressModal from "../AddressModal/AddressModal";
import NewAddress from "../NewAddress/NewAddress";
import CreatedAddress from "../CreatedAddress/CreatedAddress";
import ProfileLink from "../ProfileLink/ProfileLink";
import axios from "axios";
import { useSelector } from "react-redux";

const Addresses = ({ openSidebar }) => {
  const userData = useSelector((state) => state.user);
  const [isModalOpen, setModalOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);

  const createAddress = (data) => {
    axios
      .post(
        "https://polarpelmeni-api.work-set.eu/api/auth",
        JSON.stringify(userData.token)
      )
      .then((response) => setAddresses((prev) => [...prev, response.addresses]))
      .catch((error) => console.log(error));
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <section className="grid_layout--main addresses">
      <ProfileLink openSidebar={openSidebar}>Збережені адреси</ProfileLink>
      <NewAddress openModal={openModal} />
      <AddressModal
        closeModal={closeModal}
        isModalOpen={isModalOpen}
        createAddress={createAddress}
      />
      {addresses.length > 0 &&
        addresses.map((data) => (
          <CreatedAddress
            key={data.addressName}
            data={data}
            openModal={openModal}
          />
        ))}
    </section>
  );
};

export default Addresses;
