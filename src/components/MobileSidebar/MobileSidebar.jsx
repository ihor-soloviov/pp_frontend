import React from "react";
import SidebarLink from "../SidebarLink/SidebarLink";
import { useSelector } from "react-redux";

const MobileSidebar = ({ closeSidebar }) => {
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
        <div className="profile_info--head__mobile">
          <img
            src="https://via.placeholder.com/70x70"
            alt="profile"
            className="profile_info--head__photo"
          />
          <div className="contacts">
            <div className="contacts_name">{userData.name}</div>
            <div className="contacts_phone">
              {userData.phone}{" "}
              <a href="#" className="button_link">
              </a>
            </div>
            <div className="contacts_bonuses">
            <p>Доступно 23 бонуси</p>
            </div>
          </div>
        </div>
        <ul className="sidebar-mobile__list">
          {sidebar.map((el, index) => (
            <SidebarLink index={index} closeSidebar={closeSidebar}>
              {el}
            </SidebarLink>
          ))}
        </ul>
      </section>
    </>
  );
};

export default MobileSidebar;
