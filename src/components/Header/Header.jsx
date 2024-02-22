//Import React
import React, { useEffect, useState } from "react";

//Import Routes
import { useLocation } from "react-router-dom";

//Import Mobx

import { getCategories } from "../../utils/menu";

//Import components
import Container from "../Container/Container";



import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import { HeaderLeft } from "./HeaderComponents/HeaderLeft";
import { HeaderNavigation } from "./HeaderComponents/HeaderNavigation ";
import { HeaderRight } from "./HeaderComponents/HeaderRight";
import { MobileMenu } from "./HeaderComponents/MobileMenu";
import "./header.scss";

const Header = React.memo(() => {
  const location = useLocation();


  const [hamburger, setHamburger] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [categories, setCategories] = useState([]);

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
      <header className="header">
        <Container>
          <div className="header__content">
            <HeaderLeft />
            <HeaderNavigation />
            <HeaderRight setHamburger={setHamburger} hamburger={hamburger} />
          </div>
          {hamburger && (
            <HamburgerMenu setDropdown={setDropdown} dropdown={dropdown} categories={categories} />
          )}
        </Container>
      </header>
    );
  } else {
    return (
        <header className={`header ${hamburger ? "header__fh" : ""}`}>
          <Container>
            <div className="header__content">
              <HeaderLeft />
              <HeaderNavigation />
              <HeaderRight setHamburger={setHamburger} hamburger={hamburger} />
            </div>
            {hamburger && (
              <div className="mobile-menu">
                <MobileMenu/>
              </div>
            )}
          </Container>
        </header>
    );
  }
});

export default Header;