//Import React
import React from "react";

//Import Routes

//Import Mobx

import { getCategories } from "../../utils/menu";

//Import components
import Container from "../Container/Container";



import { HeaderLeft } from "./HeaderComponents/HeaderLeft";
import { HeaderNavigation } from "./HeaderComponents/HeaderNavigation ";
import { HeaderRight } from "./HeaderComponents/HeaderRight";
import "./header.scss";

const Header = React.memo(() => {

  // useEffect(() => {
  //   if (location.pathname !== "/") {
  //     setHamburger(false);
  //     setDropdown(false);
  //   }
  // }, [location]);

  // useEffect(() => {
  //   getCategories(setCategories);
  // }, []);

  return (
    <header className="header">
      <Container>
        <div className="header__content">
          <HeaderLeft />
          <HeaderNavigation />
          <HeaderRight/>
        </div>
      </Container>
    </header>
  )


});

export default Header;


// if (location.pathname === "/profile/info") {
//   return (
//     <header className="header">
//       <Container>
//         <div className="header__content">
//           <HeaderLeft />
//           <HeaderNavigation />
//           <HeaderRight />
//         </div>
// {hamburger && (
//           <HamburgerMenu setDropdown={setDropdown} dropdown={dropdown} categories={categories} />
// )}
//       </Container>
//     </header>
//   );
// } else {
//   return (
//     <header className='header'>
//       <Container>
//         <div className="header__content">
//           <HeaderLeft />
//           <HeaderNavigation />
//           <HeaderRight />
//         </div>

//       </Container>
//     </header>
//   );
// }