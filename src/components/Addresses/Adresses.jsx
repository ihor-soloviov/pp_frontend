import React, { useEffect, useState } from "react";
import "../ProfileGrid/ProfileGrid.scss";
import "./Addresses.scss";
import AddressModal from "../AddressModal/AddressModal";
import NewAddress from "../NewAddress/NewAddress";
import CreatedAddress from "../CreatedAddress/CreatedAddress";
import ProfileLink from "../ProfileLink/ProfileLink";
import axios from "axios";
import { useSelector } from "react-redux";
import { url } from "../../api";

const Addresses = ({ handleSidebar }) => {
  const userData = useSelector((state) => state.user);

  const [isModalOpen, setModalOpen] = useState(false);
  const [adresses, setAdresses] = useState([]);
  const [isAdressesUpdating, setIsAdressesUpdating] = useState(false);

  useEffect(() => {
    const fetchAdresses = async () => {
      try {
        const JSONtoken = JSON.stringify({ token: userData.token });
        const response = await axios.post(`${url}/api/auth`, JSONtoken, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        });

        setAdresses(response.data.addresses);
      } catch (error) {
        console.log(error);
      } finally {
        setIsAdressesUpdating(false);
      }
    };

    fetchAdresses();
  }, [userData.token, isAdressesUpdating]);

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
          setIsAdressesUpdating={setIsAdressesUpdating}
        />
        {userData.adresses !== null &&
          userData.adresses.map((adress) => (
            <CreatedAddress
              key={adress.addressName}
              adress={adress}
              openModal={handleModal}
              setIsAdressesUpdating={setIsAdressesUpdating}
            />
          ))}
      </div>
    </section>
  );
};

export default Addresses;
