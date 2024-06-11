import './Sidebar.scss';
import React from 'react';
import { observer } from 'mobx-react-lite';
import SidebarLink from '../SidebarLink/SidebarLink';
import userStore from '../../store/user-store';

const Sidebar = observer(({ pathlink }) => {
  const { isAdmin } = userStore;

  const sidebar = [
    'Інформація',
    'Улюблені блюда',
    'Збережені адреси',
    'Історія замовлень',
    'Управління закладами',
    'Вихід',
  ];

  return (
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
  );
});

export default Sidebar;
