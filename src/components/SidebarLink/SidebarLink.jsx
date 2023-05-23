/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';

const SidebarLink = ({ children, index, pathlink }) => {
  const links = [
    'info',
    'favourite',
    'addresses',
    'history',
    'bonuses',
    'signout',  
  ];
  return (
    <li className='profile_sidebar--nav__item'>
      <Link
        to={`/profile/${links[index]}`}
        className={classNames(
          'profile_sidebar--nav__link',
          {
            sign_out: children === 'Вихід',
          },
          { active: pathlink === links[index] }
        )}
      >
        {children}
      </Link>
    </li>
  );
};

export default SidebarLink;
