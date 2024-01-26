//Import React
import React, { useEffect, useState } from "react";

//Import Routes
import { Link, useLocation, useNavigate } from "react-router-dom";

//Import Mobx
import { observer } from "mobx-react-lite";
import modalStore from "../../store/modal-store";
import userStore from "../../store/user-store";

import { getCategories } from "../../utils/menu";


//Import components
import Container from "../Container/Container";
import BtnMain from "../Buttons/BtnMain";
import Popup from "../Popup/Popup";
import SignUp from "../SignUp/SignUp";
import Cart from "../Cart/Cart";

//Import logo
import logo from "../../assets/logo/logo.svg";

//Import style
import "./header.scss";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";

const Header = observer(() => {
  const { authModalHandler, authModal } = modalStore;
  const { isAuthenticated, name, avatar } = userStore;

  const [hamburger, setHamburger] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
      setHamburger(false);
      setDropdown(false);
    }
  }, [location]);

  useEffect(() => {
    getCategories(setCategories);
  }, []);

  if (location.pathname === "/profile/info") {
    return (
      <React.Fragment>
        {authModal && (
          <Popup closeModal={() => authModalHandler(false)}>
            <SignUp />
          </Popup>
        )}

        <header className="header">
          <Container>
            <div className="header__content">
              <div className="header__left">
                <Link className="header__logo" to={"/"}>
                  <img src={logo} alt="Polar Pelmeni – авторські пельмені" />
                </Link>
                <div className="header__selectors">
                  <div className="header__selector header__selector-city">
                    <svg
                      width="12"
                      height="15"
                      viewBox="0 0 12 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.2427 10.576L6 14.8187L1.75734 10.576C0.918228 9.73687 0.346791 8.66777 0.115286 7.50389C-0.11622 6.34 0.00260456 5.13361 0.456732 4.03726C0.91086 2.9409 1.6799 2.00384 2.66659 1.34455C3.65328 0.685266 4.81332 0.333374 6 0.333374C7.18669 0.333374 8.34672 0.685266 9.33342 1.34455C10.3201 2.00384 11.0891 2.9409 11.5433 4.03726C11.9974 5.13361 12.1162 6.34 11.8847 7.50389C11.6532 8.66777 11.0818 9.73687 10.2427 10.576ZM6 7.66666C6.35362 7.66666 6.69276 7.52618 6.94281 7.27613C7.19286 7.02608 7.33334 6.68694 7.33334 6.33332C7.33334 5.9797 7.19286 5.64056 6.94281 5.39051C6.69276 5.14046 6.35362 4.99999 6 4.99999C5.64638 4.99999 5.30724 5.14046 5.05719 5.39051C4.80715 5.64056 4.66667 5.9797 4.66667 6.33332C4.66667 6.68694 4.80715 7.02608 5.05719 7.27613C5.30724 7.52618 5.64638 7.66666 6 7.66666Z"
                        fill="#12130F"
                      />
                    </svg>
                    <span>Одеса</span>
                    <svg
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 3.78132L8.3 0.481323L9.24267 1.42399L5 5.66666L0.757332 1.42399L1.7 0.481323L5 3.78132Z"
                        fill="#12130F"
                      />
                    </svg>
                  </div>
                  <div className="header__selector header__selector-lang">
                    <span>UA</span>
                    <svg
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 3.78132L8.3 0.481323L9.24267 1.42399L5 5.66666L0.757332 1.42399L1.7 0.481323L5 3.78132Z"
                        fill="#12130F"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <nav className="header__navigation">
                <Link to={"/"}>Головна</Link>
                <Link to={"/menu"}>Меню</Link>
                <Link to={"/about-us"}>Про нас</Link>
                <Link to={"/contact"}>Контакти</Link>
                {/* <Link to={'/profile/info'}>Кабінет</Link> */}
              </nav>
              <div className="header__right">
                <Cart />
                {isAuthenticated ? (
                  <div
                    className="header__profile-btn"
                    onClick={() => navigate("/profile/info")}
                  >
                    <div className="header__avatar">
                      <img
                        src={avatar}
                        alt="avatar"
                      />
                    </div>
                    <span className="header__username">{name}</span>
                    <svg
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.00048 3.78132L8.30048 0.481323L9.24315 1.42399L5.00048 5.66666L0.757812 1.42399L1.70048 0.481323L5.00048 3.78132Z"
                        fill="#12130F"
                      />
                    </svg>
                  </div>
                ) : (
                  <BtnMain
                    name={"Увійти"}
                    onClick={() => authModalHandler(true)}
                  />
                )}
                <div
                  className={`header__hamburger ${hamburger && "header__hamburger--active"
                    }`}
                  onClick={() => setHamburger(!hamburger)}
                ></div>
              </div>
            </div>
            {hamburger && (
              <HamburgerMenu setDropdown={setDropdown} dropdown={dropdown} categories={categories} />
            )}
          </Container>
        </header>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        {authModal && (
          <Popup closeModal={() => authModalHandler(false)}>
            <SignUp />
          </Popup>
        )}

        <header className={`header ${hamburger && "header__fh"}`}>
          <Container>
            <div className="header__content">
              <div className="header__left">
                <Link className="header__logo" to={"/"}>
                  <img src={logo} alt="Polar Pelmeni – авторські пельмені" />
                </Link>
                <div className="header__selectors">
                  <div
                    className="header__selector header__selector-city"
                  >
                    <svg
                      width="12"
                      height="15"
                      viewBox="0 0 12 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.2427 10.576L6 14.8187L1.75734 10.576C0.918228 9.73687 0.346791 8.66777 0.115286 7.50389C-0.11622 6.34 0.00260456 5.13361 0.456732 4.03726C0.91086 2.9409 1.6799 2.00384 2.66659 1.34455C3.65328 0.685266 4.81332 0.333374 6 0.333374C7.18669 0.333374 8.34672 0.685266 9.33342 1.34455C10.3201 2.00384 11.0891 2.9409 11.5433 4.03726C11.9974 5.13361 12.1162 6.34 11.8847 7.50389C11.6532 8.66777 11.0818 9.73687 10.2427 10.576ZM6 7.66666C6.35362 7.66666 6.69276 7.52618 6.94281 7.27613C7.19286 7.02608 7.33334 6.68694 7.33334 6.33332C7.33334 5.9797 7.19286 5.64056 6.94281 5.39051C6.69276 5.14046 6.35362 4.99999 6 4.99999C5.64638 4.99999 5.30724 5.14046 5.05719 5.39051C4.80715 5.64056 4.66667 5.9797 4.66667 6.33332C4.66667 6.68694 4.80715 7.02608 5.05719 7.27613C5.30724 7.52618 5.64638 7.66666 6 7.66666Z"
                        fill="#12130F"
                      />
                    </svg>
                    <span>Одеса</span>
                    <svg
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 3.78132L8.3 0.481323L9.24267 1.42399L5 5.66666L0.757332 1.42399L1.7 0.481323L5 3.78132Z"
                        fill="#12130F"
                      />
                    </svg>
                  </div>
                  <div className="header__selector header__selector-lang">
                    <span>UA</span>
                    <svg
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 3.78132L8.3 0.481323L9.24267 1.42399L5 5.66666L0.757332 1.42399L1.7 0.481323L5 3.78132Z"
                        fill="#12130F"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <nav className="header__navigation">
                <Link to={"/"}>Головна</Link>
                <Link to={"/menu"}>Меню</Link>
                <Link to={"/about-us"}>Про нас</Link>
                <Link to={"/contact"}>Контакти</Link>
                {/* <Link to={'/profile/info'}>Кабінет</Link> */}
              </nav>
              <div className="header__right">
                <Cart />
                {isAuthenticated ? (
                  <div
                    className="header__profile-btn"
                    onClick={() => navigate("/profile/info")}
                  >
                    <div className="header__avatar">
                      <img
                        src={
                          "https://cdn-icons-png.flaticon.com/512/552/552721.png"
                        }
                        alt=""
                      />
                    </div>
                    <span className="header__username">{name}</span>
                    <svg
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.00048 3.78132L8.30048 0.481323L9.24315 1.42399L5.00048 5.66666L0.757812 1.42399L1.70048 0.481323L5.00048 3.78132Z"
                        fill="#12130F"
                      />
                    </svg>
                  </div>
                ) : (
                  <BtnMain
                    name={"Увійти"}
                    onClick={() => authModalHandler(true)}
                  />
                )}
                <div
                  className={`header__hamburger ${hamburger && "header__hamburger--active"
                    }`}
                  onClick={() => setHamburger(!hamburger)}
                >
                  <span></span>
                </div>
              </div>
            </div>
            {hamburger && (
              <div className="mobile-menu">
                <nav className="mobile-menu__navigation">
                  <ul className="mobile-menu__menu">
                    <li className="mobile-menu__link">
                      <Link to={"/"} onClick={() => setHamburger(false)}>Головна</Link>
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
                            src={
                              "https://cdn-icons-png.flaticon.com/512/552/552721.png"
                            }
                            alt=""
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
            )}
          </Container>
        </header>
      </React.Fragment>
    );
  }
});

export default Header;
