import React, { useEffect, useState } from "react";
import ProfileLink from "../ProfileLink/ProfileLink";
import { observer } from "mobx-react-lite";
import userStore from "../../store/user-store";
import classNames from "classnames";

const Bonus = observer(({ handleSidebar }) => {
  const { promocode40 } = userStore;
  const [status, setStatus] = useState("Активна");

  useEffect(() => {
    if (!promocode40) {
      setStatus("Деактивована")
    }
  }, [promocode40])


  return (
    <React.Fragment>
      <section
        className="grid_layout--main orders"
      >
        <ProfileLink handleSidebar={handleSidebar}>Бонуси</ProfileLink>
        <div className="order">
          <div className="order-container">
            <div className="order-info">
              <div className="order-info__number">
                <h4>Перше замовлення - 40% знижка</h4>
                {promocode40
                  ?
                  <p className={classNames("status", { processing: !promocode40 })}>{status}</p>
                  :
                  <p className="status">Використана</p>

                }
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
})

export default Bonus;
