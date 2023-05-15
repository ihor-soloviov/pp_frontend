/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./Sidebar.scss";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="grid_layout--side profile_sidebar">
      <h3 className="profile_sidebar--header">Особистий кабінет</h3>
      <ul className="profile_sidebar--nav">
        <li className="profile_sidebar--nav__item">
          <a href="#" className="profile_sidebar--nav__link">
            Інформація
          </a>
        </li>
        <li className="profile_sidebar--nav__item">
          <a href="#" className="profile_sidebar--nav__link">
            Улюблені блюда
          </a>
        </li>
        <li className="profile_sidebar--nav__item">
          <a href="#" className="profile_sidebar--nav__link">
            Збережені адреси
          </a>
        </li>
        <li className="profile_sidebar--nav__item">
          <a href="#" className="profile_sidebar--nav__link">
            Історія замовлень
          </a>
        </li>
        <li className="profile_sidebar--nav__item">
          <a href="#" className="profile_sidebar--nav__link">
            Бонуси
          </a>
        </li>
        <li className="profile_sidebar--nav__item sign_out">
          <a href="#" className="profile_sidebar--nav__link">
            Вихід
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
