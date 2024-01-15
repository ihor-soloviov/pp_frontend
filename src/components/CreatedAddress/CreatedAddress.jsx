import React from "react";
import cross from "../../../src/assets/Vector.svg";
import userStore from "../../store/user-store";
import axios from "axios";
import { url } from "../../api";

const CreatedAddress = ({ adress, openModal, setIsAdressesUpdating }) => {
  const {token, removeAdresses} = userStore;

  const deleteAddress = async () => {
    try {
      const JSONrequest = JSON.stringify({
        token: token,
        data: adress,
      });
      await axios.post(`${url}/api/deleteAddress`, JSONrequest, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
      setIsAdressesUpdating(true);
    } catch (error) {
      console.log(error);
    }
  };

  const flat = adress?.flatNumber ? ` , кв. ${adress?.flatNumber}` : "";

  const street = `${adress.streetName}, ${adress.homeNumber + flat}`;
  return (
    <div className="addresses_created">
      <div className="addresses_created__container">
        <div className="addresses_created__container--top">
          <div className="top-name">
            <h4>{adress.addressName}</h4>
            <button
              onClick={() => {
                removeAdresses(adress.addressName);
                deleteAddress();
              }}
            >
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
          <p>{adress.comment}</p>
          <button onClick={openModal}>Редагувати</button>
        </div>
      </div>
    </div>
  );
};

export default CreatedAddress;
