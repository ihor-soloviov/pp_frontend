import React, { useEffect, useState } from 'react';

import { useInView, InView } from 'react-intersection-observer';

import Banner from '../Banner/Banner';
import './Slider.scss';
//Banners imges
import banner01 from '../../assets/images/banner1.png';
import banner02 from '../../assets/images/banner2.png';
import banner03 from '../../assets/images/banner3.png';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    console.log(currentSlide);
  }, [currentSlide]);

  return (
    <div className='slider'>
      <div className='slider__wrapper'>
        <div className='slider__track'>
          <InView
            threshold={0.2}
            as='div'
            onChange={(inView, entry) => {
              if (inView) {
                setCurrentSlide(entry.target.firstChild.dataset.index);
              }
            }}
            style={{ flexShrink: 0 }}
          >
            <Banner
              title={'Polar Доставка'}
              desc={
                'Необов’язково покидати улюблене ліжко або ж взагалі виходити з дому, аби поласувати улюбленими пельменями!'
              }
              image={banner01}
              index={0}
            />
          </InView>
          <InView
            threshold={0.2}
            style={{ flexShrink: 0 }}
            as='div'
            onChange={(inView, entry) => {
              if (inView) {
                setCurrentSlide(entry.target.firstChild.dataset.index);
              }
            }}
          >
            <Banner
              title={'Любов з першого погляду існує... '}
              desc={
                'Насолоджуйтесь смачною їжею та будьте коханими в будь-який день'
              }
              image={banner02}
              index={1}
            />
          </InView>
          <InView
            threshold={0.2}
            style={{ flexShrink: 0 }}
            as='div'
            onChange={(inView, entry) => {
              if (inView) {
                setCurrentSlide(entry.target.firstChild.dataset.index);
              }
            }}
          >
            <Banner
              title={'Замовляй смаколики від Полар додому'}
              desc={'Швидко, яксіно і смачно'}
              image={banner03}
              index={2}
            />
          </InView>
        </div>
        <div className='slider__dots'>
          <div
            className={`slider__dot ${
              currentSlide == 0 && 'slider__dot-active'
            }`}
          ></div>
          <div
            className={`slider__dot ${
              currentSlide == 1 && 'slider__dot-active'
            }`}
          ></div>
          <div
            className={`slider__dot ${
              currentSlide == 2 && 'slider__dot-active'
            }`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
