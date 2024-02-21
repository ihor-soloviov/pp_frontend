/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from "classnames";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import arrow from "../../assets/arrow-left.svg";
import { observer } from "mobx-react-lite";
import userStore from "../../store/user-store";

const SidebarLink = observer(({
  children,
  index,
  pathlink,
  handleSidebar,
}) => {

  const { userLogout } = userStore;
  const navigate = useNavigate()

  const links = [
    "info",
    "favourite",
    "addresses",
    "history",
    "bonuses",
    "signout",
  ];


  return (
    <li className="profile_sidebar--nav__item sidebar-mobile__item--mobile">
      <Link
        to={`/profile/${links[index]}`}
        onClick={() => {
          if (children === "Вихід") {
            userLogout();
            navigate('/')
            return
          }
          
          handleSidebar()
        }}
        className={classNames(
          "profile_sidebar--nav__link sidebar-mobile__link",
          { sign_out: children === "Вихід" },
          { active: pathlink === links[index] }
        )}
      >
        {children}
      </Link>

      <img className="sidebar-mobile__item--arrow" src={arrow} alt="left" />
    </li>
  );
});

export default SidebarLink;
