import { observer } from 'mobx-react';
import shoppingCartStore from '../../store/shoping-cart-store';
import ProfileLink from '../ProfileLink/ProfileLink';
import './AdminPanel.scss';

const AdminPanel = ({ handleSidebar }) => {
  const spotList = ['Заклад 1', 'Заклад 2'];
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
        {spotList.map((spot) => (
          <li className='spot-item' key={spot}>
            <p className='spot-title'>{spot}</p>
            <p className='spot-status-text'>
              Статус:
              <span
                className={`spot-status ${
                  spot === 'Заклад 1'
                    ? spotOneStatus
                      ? 'opened'
                      : 'closed'
                    : spot === 'Заклад 2'
                      ? spotTwoStatus
                        ? 'opened'
                        : 'closed'
                      : ''
                }`}
              >
                {spot === 'Заклад 1'
                  ? spotOneStatus
                    ? 'Відчинено'
                    : 'Зачинено'
                  : spotTwoStatus
                    ? 'Відчинено'
                    : 'Зачинено'}
              </span>
            </p>
            <div className='spot-btn-wrap'>
              <button onClick={() => closeSpotClick(spot)} type='button' className='spot-btn'>
                Зачинити
              </button>
              <button onClick={() => openSpotClick(spot)} type='button' className='spot-btn'>
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
