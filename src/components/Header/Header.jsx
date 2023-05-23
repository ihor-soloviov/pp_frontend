//Import React
import React, { useState } from 'react';

//Import Routes
import { Link, useNavigate } from 'react-router-dom';

//Import Redux
import { useDispatch, useSelector } from 'react-redux';
import { authModalUpdateState } from '../../store/modalsSlice';

//Import components
import Container from '../Container/Container';
import BtnMain from '../Buttons/BtnMain';

//Import style
import './header.scss';

//Import logo
import logo from '../../assets/logo/logo.png';
import Card from '../Card/Card';
import Popup from '../Popup/Popup';
import SingUp from '../SingUp/SingUp';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user);

  //Modal
  const isModalOpen = useSelector((state) => state.modals.authModal);

  return (
    <>
      {isModalOpen && (
        <Popup
          closeModal={() => dispatch(authModalUpdateState({ isOpen: false }))}
        >
          <SingUp />
        </Popup>
      )}

      <header className='header profile-header'>
        <Container>
          <div className='header__content'>
            <Link className='header__logo' to={'/'}>
              <img src={logo} alt='Polar Pelmeni – авторські пельмені' />
            </Link>

            <nav className='header__navigation'>
              <Link to={'/'}>Меню</Link>
              <Link to={'/about-us'}>Про нас</Link>
              <Link to={'/contact'}>Контакти</Link>
              <Link to={'/profile/info'}>Кабінет</Link>
            </nav>
            <div className='header__right'>
              <Card />
              {userData.isAuthenticated ? (
                <div
                  className='header__profile-btn'
                  onClick={() => navigate('/profile/info')}
                >
                  <div className='header__avatar'>
                    <img
                      src={
                        'https://cdn-icons-png.flaticon.com/512/552/552721.png'
                      }
                      alt=''
                    />
                  </div>
                  <span className='header__username'>{userData.name}</span>
                  <svg
                    width='10'
                    height='6'
                    viewBox='0 0 10 6'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M5.00048 3.78132L8.30048 0.481323L9.24315 1.42399L5.00048 5.66666L0.757812 1.42399L1.70048 0.481323L5.00048 3.78132Z'
                      fill='#12130F'
                    />
                  </svg>
                </div>
              ) : (
                <BtnMain
                  name={'Увійти'}
                  onClick={() =>
                    dispatch(authModalUpdateState({ isOpen: true }))
                  }
                />
              )}
            </div>
          </div>
        </Container>
      </header>
    </>
  );
};

export default Header;
