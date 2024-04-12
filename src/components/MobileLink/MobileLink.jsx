import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import modalsStore from '../../store/modal-store';
import menuStore from '../../store/menu-store';

export const MobileLink = observer(({ children, to, id, handleDropDown = () => { } }) => {
  const { mobileMenuHandler } = modalsStore;
  const { handleMenuCategory } = menuStore;

  return (
    <Link to={to}
      onClick={() => {
        handleMenuCategory(handleDropDown, id)
        if (window.innerWidth < 1000) {
          mobileMenuHandler();
        }
      }}
    >
      {children}
    </Link>
  )
})

