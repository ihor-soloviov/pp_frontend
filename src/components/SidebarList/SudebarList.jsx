/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const SidebarList = ({children}) => {
  return (
    <li className="profile_sidebar--nav__item">
      <a href="#" className="profile_sidebar--nav__link">
        {children}
      </a>
    </li>
  );
};

export default SidebarList;
