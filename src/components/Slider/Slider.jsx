import React, { useEffect, useState, useRef } from 'react';

import { InView } from 'react-intersection-observer';

import Banner from '../Banner/Banner';
import './Slider.scss';
//Banners imges
import banner01 from '../../assets/images/banner1.png';
import banner02 from '../../assets/images/banner2.png';
import banner03 from '../../assets/images/banner3.png';

import banner01__mob from '../../assets/images/banner1_mob.png';
import banner02__mob from '../../assets/images/banner2_mob.png';
import banner03__mob from '../../assets/images/banner3_mob.png';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollDirection, setScrollDirecrtion] = useState('right');
  const slider__track = useRef(null);

  useEffect(() => {
    if (slider__track.current) {
      if (scrollDirection === 'right') {
        const scrollInterval = setInterval(() => {
          slider__track.current.scrollBy({ left: 100, behavior: 'smooth' });
        }, 7000);

        return () => {
          clearInterval(scrollInterval);
        };
      }
      if (scrollDirection === 'left') {
        const scrollInterval = setInterval(() => {
          slider__track.current.scrollBy({ left: -100, behavior: 'smooth' });
        }, 7000);

        return () => {
          clearInterval(scrollInterval);
        };
      }
    }
  }, [scrollDirection]);

  return (
    <div className='slider'>
      <div className='slider__wrapper'>
        <div className='slider__track' ref={slider__track}>
          <InView
            threshold={0.2}
            as='div'
            onChange={(inView, entry) => {
              if (inView) {
                setCurrentSlide(entry.target.firstChild.dataset.index);
                setScrollDirecrtion('right');
              }
            }}
            style={{ flexShrink: 0 }}
          >
            <Banner
              title={'Polar Доставка'}
              desc={
                'Необов’язково покидати улюблене ліжко або ж взагалі виходити з дому, аби поласувати улюбленими пельменями!'
              }
              image_mob={banner01__mob}
              image_desktop={banner01}
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
              image_mob={banner02__mob}
              image_desktop={banner02}
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
                setScrollDirecrtion('left');
              }
            }}
          >
            <Banner
              title={'Замовляй смаколики від Полар додому'}
              desc={'Швидко, яксіно і смачно'}
              image_mob={banner03__mob}
              image_desktop={banner03}
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
