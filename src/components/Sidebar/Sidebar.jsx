/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './Sidebar.scss';
import SidebarLink from '../SidebarLink/SidebarLink';
import userStore from '../../store/user-store';
const sidebar = [
  'Інформація',
  'Улюблені блюда',
  'Збережені адреси',
  'Історія замовлень',
  'Управління закладами',
  'Вихід',
];

const { isAdmin } = userStore;

const Sidebar = React.memo(({ pathlink }) => (
  <aside className='grid_layout--side profile_sidebar'>
    <h3 className='profile_sidebar--header'>Особистий кабінет</h3>
    <ul className='profile_sidebar--nav'>
      {sidebar.map((el, index) =>
        el === 'Управління закладами' && !isAdmin ? null : (
          <SidebarLink key={index} pathlink={pathlink} index={index}>
            {el}
          </SidebarLink>
        ),
      )}
    </ul>
  </aside>
));

export default Sidebar;
