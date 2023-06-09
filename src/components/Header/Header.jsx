//Import React
import React, { useEffect, useState } from 'react';

//Import Routes
import { Link, useLocation, useNavigate } from 'react-router-dom';

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
import axios from 'axios';

const Header = () => {
  const location = useLocation();
  const [hamburger, setHamburger] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user);

  useEffect(() => {
    if (location.pathname !== '/') {
      setHamburger(false);
      setDropdown(false);
    }
  }, [location]);

  //Modal
  const isModalOpen = useSelector((state) => state.modals.authModal);

  const getCategories = () => {
    axios
      .get(`https://polarpelmeni-api.work-set.eu/api/menu`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log('start');

        const data = res.data.response;

        const filteredCat = data.filter((obj) =>
          obj.category_name.startsWith('onlineOrder:')
        );
        const mapCat = filteredCat.map((el) => {
          return {
            category_name: el.category_name.replace(/onlineOrder: /, ''),
            category_id: el.category_id,
          };
        });

        setCategories(mapCat);
        console.log('categories', categories);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getCategories();
  }, []);
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
              {/* <Link to={'/profile/info'}>Кабінет</Link> */}
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
              <div
                className={`header__hamburger ${
                  hamburger && 'header__hamburger--active'
                }`}
                onClick={() => setHamburger(!hamburger)}
              >
                <span></span>
              </div>
            </div>
          </div>
          {hamburger && (
            <div className='mobile-menu'>
              <nav className='mobile-menu__navigation'>
                <ul className='mobile-menu__menu'>
                  <li className='mobile-menu__link'>
                    <Link>Головна</Link>
                  </li>
                  <li className='mobile-menu__link '>
                    <div
                      className={`mobile-menu__dropdown`}
                      onClick={() => {
                        setDropdown(!dropdown);
                      }}
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
                        {categories.map((el) => {
                          return (
                            <Link
                              key={el.category_id}
                              className='mobile-menu__sublink'
                              to={`menu/${el.category_id}`}
                            >
                              {el.category_name}
                            </Link>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                  <li className='mobile-menu__link'>
                    <Link>Про нас</Link>
                  </li>
                  <li className='mobile-menu__link'>
                    <Link>Контакти</Link>
                  </li>
                </ul>

                <div className='mobile-menu__auth'>
                  {userData.isAuthenticated ? (
                    <div
                      className='mobile-menu__profile-btn'
                      onClick={() => navigate('/profile/info')}
                    >
                      <div className='mobile-menu__avatar'>
                        <img
                          src={
                            'https://cdn-icons-png.flaticon.com/512/552/552721.png'
                          }
                          alt=''
                        />
                      </div>
                      <div>
                        <span className='mobile-menu__username'>
                          {userData.name}
                        </span>
                        <div className='mobile-menu__goto'>Перейти в профіль</div>
                      </div>
                    </div>
                  ) : (
                    <BtnMain
                      name={'Увійти в особистий кабінет'}
                      onClick={() =>
                        dispatch(authModalUpdateState({ isOpen: true }))
                      }
                    />
                  )}
                </div>
              </nav>
            </div>
          )}
        </Container>
      </header>
    </>
  );
};

export default Header;
