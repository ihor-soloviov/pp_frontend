import React from "react";
import SidebarLink from "../SidebarLink/SidebarLink";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import cross from "../../../src/assets/Vector.svg";

const MobileSidebar = ({ handleSidebar }) => {
  const userData = useSelector((state) => state.user);
  const sidebar = [
    "Інформація",
    "Улюблені блюда",
    "Збережені адреси",
    "Історія замовлень",
    "Бонуси",
    "Вихід",
  ];
  return (
    <>
      <section className="sidebar-mobile">
        <div className="profile_info--head__mobile sidebar-mobile__header">
          <div className="mobile-inner">
            <img
              src="https://via.placeholder.com/70x70"
              alt="profile"
              className="profile_info--head__photo"
            />
            <div className="contacts">
              <div className="contacts_name">{userData.name}</div>
              <div className="contacts_phone mobile">{userData.phone}</div>
              <div className="contacts_bonuses">
                <p>Доступно 23 бонуси</p>
              </div>
            </div>
          </div>
          <div className="mobile-inner">
            <Link
              to="/"
              className="profile_link--mobile--button mobile-inner__cross"
              onClick={handleSidebar}
            >
              <img src={cross} alt="cross" />
            </Link>
          </div>
        </div>
        <ul className="sidebar-mobile__list">
          {sidebar.map((el, index) => (
            <SidebarLink key={index} index={index} handleSidebar={handleSidebar}>
              {el}
            </SidebarLink>
          ))}
        </ul>

        <div className="sidebar-mobile__footer">
          <ul className="sidebar-mobile__footer--list">
            <Link to={"/"}>Головна</Link>
            <Link to={"/"}>Меню</Link>
            <Link to={"/about-us"}>Про нас</Link>
            <Link to={"/contact"}>Контакти</Link>
          </ul>
        </div>
      </section>
    </>
  );
};

export default MobileSidebar;
