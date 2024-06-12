import { observer } from 'mobx-react';
import { ThreeDots } from 'react-loader-spinner';
import {
  fetchAllSpotStatuses,
  openSpotStatusById,
  closeSpotStatusById,
} from '../../utils/spotStatusApi';
import ProfileLink from '../ProfileLink/ProfileLink';
import './AdminPanel.scss';
import { useEffect, useState } from 'react';

const AdminPanel = ({ handleSidebar }) => {
  const [statusResponse, setStatusResponse] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDataAndUpdateState = async () => {
      setIsLoading(true);
      const response = await fetchAllSpotStatuses();
      setStatusResponse(response);
      setIsLoading(false);
    };

    fetchDataAndUpdateState();
  }, []);

  console.log('response', statusResponse);

  const closeSpotClick = async (id) => {
    try {
      setIsLoading(true);
      await closeSpotStatusById(id);
      const response = await fetchAllSpotStatuses();
      setStatusResponse(response);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const openSpotClick = async (id) => {
    try {
      setIsLoading(true);
      await openSpotStatusById(id);
      const response = await fetchAllSpotStatuses();
      setStatusResponse(response);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className='spot-main-wrap'>
      <div className='spot-main-title'>
        <ProfileLink handleSidebar={handleSidebar}>Управління закладами</ProfileLink>
      </div>
      <ul className='spot-list'>
        {statusResponse &&
          statusResponse.map(({ id, title, street, isOpen }) => (
            <li className='spot-item' key={id}>
              <p className='spot-title'>{title}</p>
              <p className='spot-title'>{street}</p>
              <p className='spot-status-text'>
                Статус:
                <span className={`spot-status ${isOpen ? 'opened' : 'closed'}`}>
                  {isOpen ? 'відчинено' : 'зачинено'}
                </span>
              </p>
              <div className='spot-btn-wrap'>
                <button onClick={() => closeSpotClick(id)} type='button' className='spot-btn'>
                  Зачинити
                </button>
                <button onClick={() => openSpotClick(id)} type='button' className='spot-btn'>
                  Відчинити
                </button>
              </div>
            </li>
          ))}
      </ul>
      {isLoading && (
        <ThreeDots
          visible={true}
          height='50'
          width='50'
          color='#f32c40'
          radius='9'
          ariaLabel='three-dots-loading'
          wrapperStyle={{}}
          wrapperClass='loader'
        />
      )}
    </div>
  );
};

export default observer(AdminPanel);
