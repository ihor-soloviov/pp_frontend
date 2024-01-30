import React from "react";
import ProfileLink from "../ProfileLink/ProfileLink";
import { observer } from "mobx-react-lite";
import userStore from "../../store/user-store";

const Bonus = observer(({ handleSidebar }) => {
  const { promocode40 } = userStore
  return (
    <React.Fragment>
      <section
        className="grid_layout--main orders"
      >
        <ProfileLink handleSidebar={handleSidebar}>Бонуси</ProfileLink>
        {promocode40 && <div className="order">
          <div className="order-container">
            <div className="order-info">
              <div className="order-info__number">
                <h4>Перше замовлення - 40% знижка</h4>
                <p className="status">Активна</p>
              </div>
            </div>
          </div>
        </div>}
      </section>
    </React.Fragment>
  );
})

export default Bonus;
