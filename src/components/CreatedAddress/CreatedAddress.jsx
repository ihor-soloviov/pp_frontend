import React from "react";
import cross from "../../../src/assets/Vector.svg";
import { useSelector } from "react-redux";
import axios from "axios";

const CreatedAddress = ({ address, openModal, setIsAddressesUpdating }) => {
  const userData = useSelector((state) => state.user);

  const deleteAddress = async () => {
    try {
      const JSONrequest = JSON.stringify({
        token: userData.token,
        data: address,
      });
      await axios.post(
        "https://api.polarpelmeni.com.ua/api/deleteAddress",
        JSONrequest,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );
      setIsAddressesUpdating(true);
    } catch (error) {
      console.log(error);
    }
  };

  const flat = address?.flatNumber ? ` , кв. ${address?.flatNumber}` : "";

  const street = `${address.streetName}, ${address.homeNumber + flat}`;
  return (
    <div className="addresses_created">
      <div className="addresses_created__container">
        <div className="addresses_created__container--top">
          <div className="top-name">
            <h4>{address.addressName}</h4>
            <button onClick={deleteAddress}>
              <img src={cross} alt="cross" />
            </button>
          </div>
          <div className="top-street">
            <p>
              <span>Вулиця</span> {street}
            </p>
          </div>
        </div>
        <div className="addresses_created__container--bot">
          <span>Комментар:</span>
          <p>{address.comment}</p>
          <button onClick={openModal}>Редагувати</button>
        </div>
      </div>
    </div>
  );
};

export default CreatedAddress;
