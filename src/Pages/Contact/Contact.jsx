import React from 'react';
import Container from '../../components/Container/Container';

import {GoogleMap, LoadScript, MarkerF} from '@react-google-maps/api';
import './Contact.scss';

const Contact = () => {
    const containerStyle = {
        height: '100%',
        // width: '100%',
    };
    const center = {
        lat: 46.44037226802607,
        lng: 30.721339215781278,
    }
    const options = {
        streetViewControl: false,
        // streetView: false,
        mapTypeControl: false,
        zoomControl: false,
        styles: [
            {
                featureType: 'all',
                elementType: 'all',
                stylers: [
                    {
                        saturation: -100,
                    },
                    {
                        lightness: 20,
                    },
                    {
                        gamma: 1.2,
                    },
                ],
            },
        ],
    };


    return (
        <div className='contact'>
            <Container>
                <div className='contact__content'>
                    <div className='contact__column'>
                        <h1 className='title__h1'>Зв’язатися з нами</h1>
                        <div className='contact__section'>
                            <span className='contact__text'>Оберіть місто:</span>
                            <div className='contact__btns'>
                                <button className='contact__btn contact__btn-active'>
                                    Одеса
                                </button>
                                <button className='contact__btn ' disabled>
                                    Ужгород
                                </button>
                            </div>
                        </div>
                        <ul className='contact__list'>
                            <li className='contact__item'>
                                <span className='contact__item-title'>Адреса</span>
                                <span className='contact__item-link'>
                                    вул. Маршала Малиновскього 18
                </span>
                            </li>
                            <li className='contact__item'>
                                <span className='contact__item-title'>Телефон</span>
                                <a href='tel:+390987271991' className='contact__item-link'>
                                    +39 (098) 727 19 91
                                </a>
                            </li>
                            <li className='contact__item'>
                                <span className='contact__item-title'>Графік роботи</span>
                                <span className='contact__item-link'>
                  Неділя - Четвер: 9:00 - 21:00
                </span>
                                <span className='contact__item-link'>
                  П’ятниця - Субота: 10:00 - 22:00
                </span>
                            </li>
                            <li className='contact__item'>
                                <span className='contact__item-title'>Email</span>
                                <a
                                    href='mailto:support@polarpelmeni.com'
                                    className='contact__item-link'
                                >
                                    support@polarpelmeni.com
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className='contact__column'>
                        <div className='contact__map'>
                            <LoadScript googleMapsApiKey='AIzaSyCFu2436NGhyXMBwq8mLiAhsl_SSYYRhvI'>
                                <GoogleMap
                                    mapContainerStyle={containerStyle}
                                    center={center}
                                    zoom={16}
                                    options={options}
                                >
                                    <MarkerF position={center}/>
                                </GoogleMap>
                            </LoadScript>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Contact;
