import { observer } from 'mobx-react';
import shoppingCartStore from '../../store/shoping-cart-store';
import ProfileLink from '../ProfileLink/ProfileLink';
import './AdminPanel.scss';

const AdminPanel = ({ handleSidebar }) => {
  const spotList = [
    { street: 'Малиновскього, 18', title: 'Заклад 1' },
    { street: 'Економічний провулок, 1', title: 'Заклад 2' },
  ];
  const { spotOneStatus, spotTwoStatus, setSpotOneStatus, setSpotTwoStatus } = shoppingCartStore;

  const closeSpotClick = (spot) => {
    spot === 'Заклад 1' ? setSpotOneStatus(false) : setSpotTwoStatus(false);
  };

  const openSpotClick = (spot) => {
    spot === 'Заклад 1' ? setSpotOneStatus(true) : setSpotTwoStatus(true);
  };

  return (
    <div className='spot-main-wrap'>
      <div className='spot-main-title'>
        <ProfileLink handleSidebar={handleSidebar}>Управління закладами</ProfileLink>
      </div>
      <ul className='spot-list'>
        {spotList.map(({ title, street }) => (
          <li className='spot-item' key={title}>
            <p className='spot-title'>{title}</p>
            <p className='spot-title'>{street}</p>
            <p className='spot-status-text'>
              Статус:
              <span
                className={`spot-status ${
                  title === 'Заклад 1'
                    ? spotOneStatus
                      ? 'opened'
                      : 'closed'
                    : title === 'Заклад 2'
                      ? spotTwoStatus
                        ? 'opened'
                        : 'closed'
                      : ''
                }`}
              >
                {title === 'Заклад 1'
                  ? spotOneStatus
                    ? 'Відчинено'
                    : 'Зачинено'
                  : spotTwoStatus
                    ? 'Відчинено'
                    : 'Зачинено'}
              </span>
            </p>
            <div className='spot-btn-wrap'>
              <button onClick={() => closeSpotClick(title)} type='button' className='spot-btn'>
                Зачинити
              </button>
              <button onClick={() => openSpotClick(title)} type='button' className='spot-btn'>
                Відчинити
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default observer(AdminPanel);
