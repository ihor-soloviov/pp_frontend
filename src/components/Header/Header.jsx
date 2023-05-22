//Import React
import React, { useState } from 'react';

//Import Routes
import { Link } from 'react-router-dom';

//Import components
import Container from '../Container/Container';
import BtnMain from '../Buttons/BtnMain';

//Import style
import './header.scss';

//Import logo
import logo from '../../assets/logo/logo.png';
import Card from '../Card/Card';
import Popup from '../Popup/Popup';
import SingUp from '../SIngUp/SingUp';

const Header = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      {isModalOpen && (
        <Popup>
          <SingUp />
        </Popup>
      )}

      <header className='header'>
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
              <BtnMain name={'Увійти'} onClick={() => setModalOpen(true)} />
            </div>
          </div>
        </Container>
      </header>
    </>
  );
};

export default Header;
