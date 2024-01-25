import React from "react";
import ProfileLink from "../ProfileLink/ProfileLink";
import { m } from "framer-motion"
import { animationLinks } from "../../animations/profile";

const Bonus = ({ handleSidebar }) => {
  return (
    <>
      <m.section
        initial="hidden"
        animate="visible"
        variants={animationLinks}
        transition={{ type: 'linear' }}
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
      </m.section>
    </>
  );
};

export default Bonus;
