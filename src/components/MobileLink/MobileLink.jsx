import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import modalsStore from '../../store/modal-store';

export const MobileLink = observer(({ children, to }) => {
  const { mobileMenuHandler } = modalsStore
  return (
    <Link to={to}
      onClick={() => {
        if (window.innerWidth < 1000) {
          mobileMenuHandler()
        }
      }}
    >
      {children}
    </Link>
  )
})

