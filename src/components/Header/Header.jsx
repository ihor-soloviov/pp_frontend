//Import React
import React from 'react';

//Import components
import Container from '../Container/Container';
import { HeaderLeft } from './HeaderComponents/HeaderLeft';
import { HeaderNavigation } from './HeaderComponents/HeaderNavigation ';
import { HeaderRight } from './HeaderComponents/HeaderRight';
import './header.scss';

const Header = React.memo(() => {
  return (
    <header className='header'>
      <Container>
        <div className='header__content'>
          <HeaderLeft />
          <HeaderNavigation />
          <HeaderRight />
        </div>
      </Container>
    </header>
  );
});

export default Header;
