import React, { useEffect, useState } from "react";
import userStore from "../../store/user-store";

import AddressModal from "../AddressModal/AddressModal";
import NewAddress from "../NewAddress/NewAddress";
import CreatedAddress from "../CreatedAddress/CreatedAddress";
import ProfileLink from "../ProfileLink/ProfileLink";

import axios from "axios";
import { url } from "../../api";

import "../ProfileGrid/ProfileGrid.scss";
import "./Addresses.scss";
import { observer } from "mobx-react-lite";

const Addresses = observer(({ handleSidebar }) => {
  const { token, adresses, addToAdresses } = userStore;

  const [isModalOpen, setModalOpen] = useState(false);
  const [isAdressesUpdating, setIsAdressesUpdating] = useState(false);

  useEffect(() => {
    const fetchAdresses = async () => {
      try {
        const JSONtoken = JSON.stringify({ token: token });
        const response = await axios.post(`${url}/api/auth`, JSONtoken, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        });
        if (response?.data?.addresses === null) {
          return
        }
        console.log(response.data.addresses)
        addToAdresses(response.data.addresses);
      } catch (error) {
        console.log(error);
      } finally {
        setIsAdressesUpdating(false);
      }
    };

    fetchAdresses();
  }, [token, isAdressesUpdating, addToAdresses]);

  const handleModal = () => {
    setModalOpen((prev) => !prev);
  };
  return (
    <section
      className="grid_layout--main addresses">
      <ProfileLink handleSidebar={handleSidebar}>Збережені адреси</ProfileLink>
      <div className="addresses_inner">
        <NewAddress openModal={handleModal} />
        <AddressModal
          closeModal={handleModal}
          isModalOpen={isModalOpen}
          setIsAdressesUpdating={setIsAdressesUpdating}
        />
        {adresses !== null &&
          adresses.map((adress) => (
            <React.Fragment key={adress.addressName}>
              <CreatedAddress
                adress={adress}
                openModal={handleModal}
                setIsAdressesUpdating={setIsAdressesUpdating}
              />
            </React.Fragment>
          ))}
      </div>
    </section>
  );
});

export default Addresses;
