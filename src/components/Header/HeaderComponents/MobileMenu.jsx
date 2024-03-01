import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import userStore from '../../../store/user-store';
import { observer } from 'mobx-react-lite';
import BtnMain from '../../Buttons/BtnMain';
import modalsStore from '../../../store/modal-store';
import instIcon from "../../../assets/instIcon.svg";
import fbIcon from "../../../assets/fbIcon.svg";
import { MobileLink } from '../../MobileLink/MobileLink';
import menuStore from '../../../store/menu-store';

const citiesInfo = [
  {
    label: "Одеса",
    phone: "+380 (98) 727-19-91",
    href: 'tel:+380987271991',
    street: "вул. Лентейнанта Шмідта 25"
  },
  {
    label: "Ужгород",
    phone: "+380 (67) 714-96-59",
    href: "tel:+380677149659",
    street: "вул. Капушанська, 7а"
  }
]

export const MobileMenu = observer(() => {
  const { categories } = menuStore;
  const { isAuthenticated, name } = userStore;
  const { authModalHandler, isMobileMenu, mobileMenuHandler } = modalsStore;
  const [dropdown, setDropdown] = useState(false);

  return (
    <div className={`mobile-menu ${isMobileMenu ? 'menu-slide-in' : 'menu-slide-out'}`}>
      <nav className="mobile-menu__navigation">
        <ul className="mobile-menu__menu">
          <li className="mobile-menu__link">
            <MobileLink to={"/"} >Головна</MobileLink>
          </li>
          <li className="mobile-menu__link ">
            <div
              className={`mobile-menu__dropdown`}
              onClick={() => {
                setDropdown(!dropdown);
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
                {categories.map((el) => {
                  return (
                    <MobileLink
                      key={el.category_id}
                      className="mobile-menu__sublink"
                      to={`menu/${el.category_id}`}
                      setDropdown={setDropdown}
                    >
                      {el.category_name}
                    </MobileLink>
                  );
                })}
              </ul>
            )}
          </li>
          <li className="mobile-menu__link">
            <MobileLink to={"about-us"}>Про нас</MobileLink>
          </li>
          <li className="mobile-menu__link">
            <MobileLink to={"contact"}>Контакти</MobileLink>
          </li>
        </ul>

        <div className="mobile-menu__auth">
          {isAuthenticated ? (
            <Link to="/profile/info"
              className="mobile-menu__profile-btn"
              onClick={mobileMenuHandler}
            >
              <div className="mobile-menu__avatar">
                <img
                  src={
                    "https://cdn-icons-png.flaticon.com/512/552/552721.png"
                  }
                  alt="usersPhoto"
                />
              </div>
              <div>
                <span className="mobile-menu__username">{name}</span>
                <div className="mobile-menu__goto">
                  Перейти в профіль
                </div>
              </div>
            </Link>
          ) : (
            <BtnMain
              name={"Увійти в особистий кабінет"}
              onClick={() => authModalHandler(true)}
              fullWide

            />
          )}
        </div>
        <div className="mobile-menu__footer">
          <div className="menu-footer">
            <div className="menu-footer__langs">
              <p className='lang lang-active'>UA</p>
              <p className='lang '>DE</p>
            </div>
            <div className="menu-footer__cities">
              {citiesInfo.map(el => (
                <div key={el.label} className='city'>
                  <span>{el.label}:</span>
                  <a href={el.href}>{el.phone}</a>
                  <p>{el.street}</p>
                </div>
              ))}
            </div>
            <div className="menu-footer__links">
              <a
                className="footer__links"
                href="https://www.instagram.com/polarpelmeni/"
                target="_blank"
                rel="noreferrer"
              >
                <img className='smm-link' src={instIcon} alt='instagram link' />
              </a>
              <a
                className="footer__links"
                href="https://www.facebook.com/polarpelmeni/"
                target="_blank"
                rel="noreferrer"
              >
                <img className='smm-link' src={fbIcon} alt='facebook link' />
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
})

