import React from 'react'
import { Link } from 'react-router-dom'
import BtnMain from '../Buttons/BtnMain'

import userStore from '../../store/user-store';
import modalsStore from '../../store/modal-store';
import { useNavigate } from 'react-router-dom';

const HamburgerMenu = (setHamburger, setDropdown, dropdown, categories) => {
  const { isAuthenticated, name, avatar } = userStore;
  const { authModalHandler } = modalsStore
  const navigate = useNavigate();

  return (
    <div
      className="mobile-menu"
    >
      <nav className="mobile-menu__navigation">
        <ul className="mobile-menu__menu">
          <li className="mobile-menu__link">
            <Link to={"/"} onClick={() => setHamburger(false)}>Головна</Link>
          </li>
          <li className="mobile-menu__link ">
            <div
              className={`mobile-menu__dropdown`}
              onClick={() => {
                setDropdown(prev => !prev);
              }}
            >
              <span>Меню</span>
              <svg
                width="12"
                height="8"
                viewBox="0 0 12 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.99959 4.97618L10.1244 0.85141L11.3029 2.02992L5.99959 7.33326L0.696289 2.02992L1.87481 0.85141L5.99959 4.97618Z"
                  fill="black"
                />
              </svg>
            </div>
            {dropdown && (
              <ul className="mobile-menu__submenu">
                {categories && categories.map((el) => {
                  return (
                    <Link
                      key={el.category_id}
                      className="mobile-menu__sublink"
                      to={`menu/${el.category_id}`}
                    >
                      {el.category_name}
                    </Link>
                  );
                })}
              </ul>
            )}
          </li>
          <li className="mobile-menu__link">
            <Link to={"about-us"}>Про нас</Link>
          </li>
          <li className="mobile-menu__link">
            <Link to={"contact"}>Контакти</Link>
          </li>
        </ul>

        <div className="mobile-menu__auth">
          {isAuthenticated ? (
            <div
              className="mobile-menu__profile-btn"
              onClick={() => navigate("/profile/info")}
            >
              <div className="mobile-menu__avatar">
                <img
                  src={avatar}
                  alt="аватар"
                />
              </div>
              <div>
                <span className="mobile-menu__username">{name}</span>
                <div className="mobile-menu__goto">
                  Перейти в профіль
                </div>
              </div>
            </div>
          ) : (
            <BtnMain
              name={"Увійти в особистий кабінет"}
              onClick={() => authModalHandler(true)}
            />
          )}
        </div>
      </nav>
    </div>
  )
}

export default HamburgerMenu
