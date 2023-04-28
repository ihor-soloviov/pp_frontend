//Import React
import React from 'react';

//Import components
import Container from '../Container/Container';
import BtnMain from '../Buttons/BtnMain';

//Import style
import './header.scss';

//Import logo
import logo from '../../assets/logo/logo.png';

const Header = () => {
  return (
    <header className='header'>
      <Container>
        <div className='header__content'>
          <a className='header__logo'>
            <img src={logo} alt='Polar Pelmeni – авторські пельмені' />
          </a>
          <BtnMain name={'Увійти'} onClick={() => console.log('Click')} />
        </div>
      </Container>
    </header>
  );
};

export default Header;
