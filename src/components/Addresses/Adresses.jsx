import React, { useEffect, useState } from "react";
import "../ProfileGrid/ProfileGrid.scss";
import "./Addresses.scss";
import AddressModal from "../AddressModal/AddressModal";
import NewAddress from "../NewAddress/NewAddress";
import CreatedAddress from "../CreatedAddress/CreatedAddress";
import ProfileLink from "../ProfileLink/ProfileLink";
import axios from "axios";
import { useSelector } from "react-redux";

const Addresses = ({ handleSidebar }) => {
  const userData = useSelector((state) => state.user);
  const [isModalOpen, setModalOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [isAddressesUpdating, setIsAddressesUpdating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const JSONtoken = JSON.stringify({ token: userData.token });
        const response = await axios.post(
          "https://api.polarpelmeni.com.ua/api/auth",
          JSONtoken,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
          }
        );

        setAddresses(response.data.addresses);
      } catch (error) {
        console.log(error);
      } finally {
        setIsAddressesUpdating(false);
      }
    };

    fetchData();
  }, [userData.token, isAddressesUpdating, addresses]);

  const handleModal = () => {
    setModalOpen((prev) => !prev);
  };
  return (
    <section className="grid_layout--main addresses">
      <ProfileLink handleSidebar={handleSidebar}>Збережені адреси</ProfileLink>
      <div className="addresses_inner">
        <NewAddress openModal={handleModal} />
        <AddressModal
          closeModal={handleModal}
          isModalOpen={isModalOpen}
          setIsAddressesUpdating={setIsAddressesUpdating}
        />
        {addresses.length > 0 &&
          addresses.map((address) => (
            <CreatedAddress
              key={address.addressName}
              address={address}
              openModal={handleModal}
              setIsAddressesUpdating={setIsAddressesUpdating}
            />
          ))}
      </div>
    </section>
  );
};

export default Addresses;
