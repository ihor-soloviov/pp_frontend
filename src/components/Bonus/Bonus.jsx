import React from "react";
import ProfileLink from "../ProfileLink/ProfileLink";

const Bonus = ({ handleSidebar }) => {
  return (
    <>
      <section
        className="grid_layout--main orders"
      >
        <ProfileLink handleSidebar={handleSidebar}>Бонуси</ProfileLink>
        <div className="order">
          <div className="order-container">
            <div className="order-info">
              <div className="order-info__number">
                <h4>Перше замовлення - 40% знижка</h4>
                <p className="status">Активна</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Bonus;
