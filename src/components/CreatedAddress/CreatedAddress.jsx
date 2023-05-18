import React from "react";
import cross from "../../../src/assets/Vector.svg";

const CreatedAddress = ({data, openModal}) => {

  const flat = data?.flatNumber ? ` , кв. ${data?.flatNumber}` : '';

  const street = `${data.streetName}, ${data.homeNumber + flat}`;
  return (
    <div className="addresses_created">
      <div className="addresses_created__container">
        <div className="addresses_created__container--top">
          <div className="top-name">
            <h4>{data.addressName}</h4>
            <button>
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
          <p>{data.comment}</p>
          <button onClick={openModal}>Редагувати</button>
        </div>
      </div>
    </div>
  );
};

export default CreatedAddress;
