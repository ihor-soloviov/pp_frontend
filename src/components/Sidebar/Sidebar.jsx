/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./Sidebar.scss";
import { Link } from "react-router-dom";
import SidebarList from "../SidebarList/SudebarList";

const Sidebar = () => {
  const sidebar = ["Інформація", "Улюблені блюда", "Збережені адреси", "Історія замовлень", "Бонуси", "Вихід"]
  return (
    <aside className="grid_layout--side profile_sidebar">
      <h3 className="profile_sidebar--header">Особистий кабінет</h3>
      <ul className="profile_sidebar--nav">
        {sidebar.map(el => (
          <SidebarList>{el}</SidebarList>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
