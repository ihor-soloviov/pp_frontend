import React from 'react';
import { Link } from 'react-router-dom';
import userStore from '../../store/user-store';

import SidebarLink from '../SidebarLink/SidebarLink';
import cross from '../../../src/assets/Vector.svg';
import { observer } from 'mobx-react-lite';

const MobileSidebar = observer(({ handleSidebar }) => {
  const { name, phone, avatar } = userStore;

  const sidebarLinks = [
    'Інформація',
    'Улюблені блюда',
    'Збережені адреси',
    'Історія замовлень',
    'Бонуси',
    'Вихід',
  ];
  return (
    <>
      <section className='sidebar-mobile animate'>
        <div className='profile_info--head__mobile sidebar-mobile__header'>
          <div className='mobile-inner'>
            <img src={avatar} alt='profile' className='profile_info--head__photo' />
            <div className='contacts'>
              <div className='contacts_name'>{name}</div>
              <div className='contacts_phone mobile'>{phone}</div>
              <div className='contacts_bonuses'></div>
            </div>
          </div>
          <div className='mobile-inner'>
            <Link
              to='/'
              className='profile_link--mobile--button mobile-inner__cross'
              onClick={handleSidebar}
            >
              <img src={cross} alt='cross' />
            </Link>
          </div>
        </div>
        <ul className='sidebar-mobile__list'>
          {sidebarLinks.map((el, index) => (
            <SidebarLink key={index} index={index} handleSidebar={handleSidebar}>
              {el}
            </SidebarLink>
          ))}
        </ul>
      </section>
    </>
  );
});

export default MobileSidebar;
