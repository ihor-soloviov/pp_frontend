import React from 'react';
import Container from '../../components/Container/Container';

import { GoogleMap, MarkerF, PolygonF } from '@react-google-maps/api';
import { center, containerStyle, options } from './data';
import './Contact.scss';
import { polygonPaths } from '../../utils/distance';

const Contact = () => {
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
                <PolygonF
                  paths={polygonPaths}
                  options={{
                    strokeColor: '#ff5124',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '#ff5124',
                    fillOpacity: 0.25,
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
