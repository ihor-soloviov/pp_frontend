import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import userStore from '../../../store/user-store';
import { observer } from 'mobx-react-lite';
import BtnMain from '../../Buttons/BtnMain';
import modalsStore from '../../../store/modal-store';
import instIcon from '../../../assets/instIcon.svg';
import fbIcon from '../../../assets/fbIcon.svg';
import { MobileLink } from '../../MobileLink/MobileLink';
import menuStore from '../../../store/menu-store';

const citiesInfo = [
  {
    label: 'Одеса',
    phone: '+380 (98) 727-19-91',
    href: 'tel:+380987271991',
    street: 'вулиця Маршала Малиновскього, 18',
  },
];

export const MobileMenu = observer(() => {
  const { categories } = menuStore;
  const { isAuthenticated, name } = userStore;
  const { authModalHandler, isMobileMenu, mobileMenuHandler } = modalsStore;
  const [dropdown, setDropdown] = useState(false);

  const handleDropDown = () => {
    setDropdown(prev => !prev)
  }

  return (
    <div className={`mobile-menu ${isMobileMenu ? 'menu-slide-in' : 'menu-slide-out'}`}>
      <nav className='mobile-menu__navigation'>
        <ul className='mobile-menu__menu'>
          <li className='mobile-menu__link'>
            <MobileLink to={'/'}>Головна</MobileLink>
          </li>
          <li className='mobile-menu__link '>
            <div
              className={`mobile-menu__dropdown`}
              onClick={handleDropDown}
            >
              <span>Меню</span>
              <svg
                width='12'
                height='8'
                viewBox='0 0 12 8'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M5.99959 4.97618L10.1244 0.85141L11.3029 2.02992L5.99959 7.33326L0.696289 2.02992L1.87481 0.85141L5.99959 4.97618Z'
                  fill='black'
                />
              </svg>
            </div>
            {dropdown && (
              <ul className='mobile-menu__submenu'>
                {categories.map(
                  ({ category_id, category_name }) => (
                    <MobileLink
                      key={category_id}
                      id={category_id}
                      className='mobile-menu__sublink'
                      to={`menu/${category_id}`}
                      handleDropDown={handleDropDown}
                    >
                      {category_name}
                    </MobileLink>
                  )
                )}
              </ul>
            )}
          </li>
          <li className='mobile-menu__link'>
            <MobileLink to={'about-us'}>Про нас</MobileLink>
          </li>
          <li className='mobile-menu__link'>
            <MobileLink to={'contact'}>Контакти</MobileLink>
          </li>
        </ul>

        <div className='mobile-menu__auth'>
          {isAuthenticated ? (
            <Link
              to='/profile/info'
              className='mobile-menu__profile-btn'
              onClick={mobileMenuHandler}
            >
              <div className='mobile-menu__avatar'>
                <img
                  src={'https://cdn-icons-png.flaticon.com/512/552/552721.png'}
                  alt='usersPhoto'
                />
              </div>
              <div>
                <span className='mobile-menu__username'>{name}</span>
                <div className='mobile-menu__goto'>Перейти в профіль</div>
              </div>
            </Link>
          ) : (
            <BtnMain
              onClick={() => authModalHandler(true)}
              fullWide
            >
              Увійти в особистий кабінет
            </BtnMain>
          )}
        </div>
        <div className='mobile-menu__footer'>
          <div className='menu-footer'>
            <div className='menu-footer__langs'>
              <p className='lang lang-active'>UA</p>
              <p style={{cursor: "help"}} title='Demnächst verfügbar' className='lang '>DE</p>
            </div>
            <div className='menu-footer__cities'>
              {citiesInfo.map(({ label, href, street, phone }) => (
                <div key={label} className='city'>
                  <span>{label}:</span>
                  <a href={href}>{phone}</a>
                  <p>{street}</p>
                </div>
              ))}
            </div>
            <div className='menu-footer__links'>
              <a
                className='footer__links'
                href='https://www.instagram.com/polar.pelmeni?utm_source=qr'
                target='_blank'
                rel='noreferrer'
              >
                <img className='smm-link' src={instIcon} alt='instagram link' />
              </a>
              <a
                className='footer__links'
                href='https://www.facebook.com/polarpelmeni/'
                target='_blank'
                rel='noreferrer'
              >
                <img className='smm-link' src={fbIcon} alt='facebook link' />
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
});
