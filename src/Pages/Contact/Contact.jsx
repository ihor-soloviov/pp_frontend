import React from 'react';
import Container from '../../components/Container/Container';

import { GoogleMap, MarkerF, PolygonF } from '@react-google-maps/api';
import { center, containerStyle, options } from './data';
import './Contact.scss';

const Contact = () => {
  const polygonPaths = [
    { lat: 46.45166673859898, lng: 30.768502518442684 },
    { lat: 46.442002530249624, lng: 30.771964651313617 },

    { lat: 46.42316678919593, lng: 30.76792704865653 },

    { lat: 46.41539983373721, lng: 30.761838090430164 },

    { lat: 46.40877854800877, lng: 30.75562931670575 },

    { lat: 46.405671457272895, lng: 30.7306096725362 },

    { lat: 46.40761713782876, lng: 30.729853158039546 },
    { lat: 46.40498354777752, lng: 30.709928576790787 },
    { lat: 46.406971488077765, lng: 30.70582518820819 },
    { lat: 46.40891828049145, lng: 30.704900279321024 },
    { lat: 46.40782741399074, lng: 30.693314578523907 },
    { lat: 46.41178799435908, lng: 30.69277910499714 },

    { lat: 46.419119614120035, lng: 30.70835915895738 },

    { lat: 46.430910710773155, lng: 30.69469284118881 },
    { lat: 46.43570930278756, lng: 30.698458312621103 },

    { lat: 46.437956666674765, lng: 30.695776772996556 },
    { lat: 46.442221001671925, lng: 30.694550747976074 },

    { lat: 46.442221001671925, lng: 30.687161898465458 },

    { lat: 46.44569685315506, lng: 30.686806665315906 },

    { lat: 46.44564789914128, lng: 30.68375166025658 },

    { lat: 46.451571027663135, lng: 30.683112240587395 },

    { lat: 46.457640342586444, lng: 30.68240177431671 },

    { lat: 46.460576864931056, lng: 30.692277255874156 },

    { lat: 46.460858095754745, lng: 30.705969774960003 },
    { lat: 46.460968412072376, lng: 30.713259845881964 },

    { lat: 46.46485080424781, lng: 30.722392196623577 },
    { lat: 46.463780291012405, lng: 30.72979043782668 },

    { lat: 46.46525243525569, lng: 30.735367090146806 },
    { lat: 46.46394795092836, lng: 30.754325672389097 },
    { lat: 46.46097805085998, lng: 30.755937454067467 },

    { lat: 46.4614844664613, lng: 30.758814664207677 },
  ];
  return (
    <div className='contact'>
      <Container>
        <div className='contact__content'>
          <div className='contact__column'>
            <h1 className='title__h1'>Зв’язатися з нами</h1>
            <div className='contact__section'>
              <span className='contact__text'>Оберіть місто:</span>
              <div className='contact__btns'>
                <button className='contact__btn contact__btn-active'>Одеса</button>
              </div>
            </div>
            <ul className='contact__list'>
              <li className='contact__item'>
                <span className='contact__item-title'>Адреса</span>
                <span className='contact__item-link'>вул. Маршала Малиновскього, 18</span>
              </li>
              <li className='contact__item'>
                <span className='contact__item-title'>Телефон</span>
                <a href='tel:+390987271991' className='contact__item-link'>
                  +38 (098) 727 19 91
                </a>
              </li>
              <li className='contact__item'>
                <span className='contact__item-title'>Графік роботи</span>
                <span className='contact__item-link'>Неділя - Четвер: 9:00 - 21:00</span>
                <span className='contact__item-link'>П’ятниця - Субота: 10:00 - 22:00</span>
              </li>
              <li className='contact__item'>
                <span className='contact__item-title'>Email</span>
                <a href='mailto:support@polarpelmeni.com' className='contact__item-link'>
                  support@polarpelmeni.com
                </a>
              </li>
            </ul>
          </div>
          <div className='contact__column'>
            <div className='contact__map'>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={16}
                options={options}
              >
                <PolygonF // Добавляем компонент Polygon
                  paths={polygonPaths} // Передаем ему координаты полигона
                  options={{
                    strokeColor: '#FF0000', // Цвет границы
                    strokeOpacity: 0.8, // Прозрачность границы
                    strokeWeight: 2, // Толщина границы
                    fillColor: '#FF0000', // Цвет заливки
                    fillOpacity: 0.35, // Прозрачность заливки
                  }}
                />
                <MarkerF position={center} />
              </GoogleMap>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Contact;
