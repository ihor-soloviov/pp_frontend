import React from 'react';
import img01 from '../../../src/assets/images/about/about-1-desc.png';
import img02 from '../../../src/assets/images/about/about-2-desc.png';
import img03 from '../../../src/assets/images/about/about-3-desc.png';
import img07 from '../../assets/images/about/about-7-mobile.jpg';
import img07desc from '../../assets/images/about/about-7-desc.jpg';
import img08 from '../../assets/images/about/about-8-mobile.jpg';
import img08desc from '../../assets/images/about/about-8-desc.jpg';
import img09 from '../../assets/images/about/about-9-mobile.jpg';
import img09desc from '../../assets/images/about/about-9-desc.jpg';
import img10 from '../../assets/images/about/about-10-mobile.jpg';
import img10desc from '../../assets/images/about/about-10-desc.jpg';
import img11 from '../../assets/images/about/about-11-mobile.jpg';
import img11desc from '../../assets/images/about/about-11-desc.jpg';
import img12 from '../../assets/images/about/about-12-mobile.jpg';
import img12desc from '../../assets/images/about/about-12-desc.jpg';
import img13 from '../../assets/images/about/about-13-mobile.jpg';
import img13desc from '../../assets/images/about/about-13-desc.jpg';
import img14 from '../../assets/images/about/about-14-mobile.jpg';
import img14desc from '../../assets/images/about/about-14-desc.jpg';
import img15 from '../../assets/images/about/about-15-mobile.jpg';
import img15desc from '../../assets/images/about/about-15-desc.jpg';
import svg1 from './sprite.svg';

import './AboutUs.scss';
import { useLocation } from 'react-router-dom';

const AboutUsPictures = () => {
  const location = useLocation();

  return (
    <>
      <section className='about-section'>
        <div className='about-container container'>
          <div className='about-top-wrap'>
            <ul className='about-top-list list'>
              <li className='about-top-item'>
                <p className='about-top-subtitle'>Наша історія</p>
                <h2 className='about-top-title title'>З чого все почалося?</h2>
              </li>
              <li className='about-top-item'>
                <p className='about-top-text text'>
                  Засновник Polar — європеєць з українським корінням — кілька років тому відвідав
                  Україну. А Одесу, його жителів і колорит ви знаєте — не закохатися неможливо.
                </p>
              </li>
              <li className='about-top-item'>
                <p className='about-top-text text'>
                  Іскра, буря, божевілля, і от наш Костя вирішив залишитися в Україні, аби радувати
                  людей вишуканими пельменями й піднімати економіку нашої країни.
                </p>
              </li>
              <li className='about-top-item'>
                <p className='about-top-text text'>
                  Піца, суші, бургери, рамен… А де ж пельмені, які точно займають окреме місце в
                  сердечку кожного українця?
                </p>
              </li>
              <li className='about-top-item'>
                <p className='about-top-text text'>
                  Це питання поставив собі засновник Polar, який не побачив на ринку доставки цієї
                  страви і смачних соусів до неї. І понеслася…
                </p>
              </li>
            </ul>
            <img src={img01} alt='women' className='about-top-img first' />
          </div>
          <svg className='about-icon first'>
            <use href={`${svg1}#icon-arrow-1`}></use>
          </svg>
          <div className='about-wrap'>
            <ul className='about-list list'>
              <li className='about-item'>
                <h2 className='about-title title'>
                  Як все
                  <br />
                  призупинилося?
                </h2>
              </li>
              <li className='about-item'>
                <p className='about-text text'>
                  23 лютого була пре-паті дегустація в Одесі:люди гідно оцінили наші старання, смак
                  пельменів, різноманітність вибору і швидкість приготування.
                </p>
              </li>
              <li className='about-item'>
                <p className='about-text text'>Наступного дня почалася війна.</p>
              </li>
              <li className='about-item'>
                <p className='about-text text'>
                  Ми, як і будь-який бізнес в Україні, не могли працювати як раніше.
                </p>
              </li>
              <li className='about-item'>
                <p className='about-text text'>
                  Команда Polar не здалася і прийняла рішення відчинитися в більш безпечному місті
                  України — Ужгороді.
                </p>
              </li>
              <li className='about-item'>
                <p className='about-text text'>
                  Створили цех у Закарпатті, поліпшили рецептуру і зробили пельмені ще кращими з
                  ідеальним тістом і начинками!
                </p>
              </li>
            </ul>
            <img src={img02} alt='dishes' className='about-img second' />
          </div>
          <svg className='about-icon second'>
            <use href={`${svg1}#icon-arrow-2`}></use>
          </svg>
          <div className='about-bottom-wrap'>
            <ul className='about-bottom-list list'>
              <li className='about-bottom-item'>
                <h2 className='about-bottom-title title'>
                  Ми продумали все
                  <br />
                  до дрібниць
                </h2>
              </li>
              <li className='about-bottom-item'>
                <p className='about-bottom-text text'>
                  У терміновому порядку (мова ж не просто про їжу, а про ПЕЛЬМЕНІ) зібралася сильна
                  команда на чолі із шеф-кухарем.
                </p>
              </li>
              <li className='about-bottom-item'>
                <p className='about-bottom-text text'>
                  Днями й ночами ми розробляли стратегію, особливу рецептуру, концепцію меню з
                  професіоналами, щоби насолоджуватися пельменями міг кожен.
                </p>
              </li>
              <li className='about-bottom-item'>
                <p className='about-bottom-text text'>Не залишили без уваги нікого.</p>
              </li>
              <li className='about-bottom-item'>
                <p className='about-bottom-text text'>
                  І вегетаріанці, і вегани, і переконані м’ясоїди, і любителі рибки, овочів, навіть
                  солодощів точно знайдуть порцію улюблених пельменів для себе в Polar
                </p>
              </li>
            </ul>

            <img src={img03} alt='women' className='about-bottom-img' />
          </div>
        </div>
      </section>
      <section className='facts-section'>
        <div className='facts-container container'>
          <h2 className='facts-main-title title'>Важливі факти про Polar</h2>
          <div className='facts-list-wrap'>
            <ul className='facts-list list'>
              <li className='facts-item'>
                <div className='facts-icon-wrap'>
                  <svg className='facts-icon'>
                    <use href={`${svg1}#icon-facts-1`}></use>
                  </svg>
                </div>
                <h3 className='facts-title'>Ми самі виробляємо все</h3>
                <p className='facts-text'>
                  фарш, бульйони, соуси. І це з найякісніших продуктів від перевірених
                  постачальників. Тому що, хороші пельмені починаються зі свіжих продуктів
                </p>
              </li>
              <li className='facts-item'>
                <div className='facts-icon-wrap'>
                  <svg className='facts-icon'>
                    <use href={`${svg1}#icon-facts-2`}></use>
                  </svg>
                </div>

                <h3 className='facts-title'>10 видів різних пельменів</h3>

                <p className='facts-text'>
                  І вегетаріанці, і вегани, і переконані м’ясоїди, і любителі рибки, овочів, навіть
                  солодощів точно знайдуть порцію улюблених пельменів
                </p>
              </li>
              <li className='facts-item'>
                <div className='facts-icon-wrap'>
                  <svg className='facts-icon'>
                    <use href={`${svg1}#icon-facts-3`}></use>
                  </svg>
                </div>
                <h3 className='facts-title'>4 хвилини</h3>
                <p className='facts-text'>
                  Мало що можна встигнути зробити за цей час, але ми точно знаємо, що пельмені від
                  Polar вже будуть готові
                </p>
              </li>
              <li className='facts-item'>
                <div className='facts-icon-wrap'>
                  <svg className='facts-icon'>
                    <use href={`${svg1}#icon-facts-4`}></use>
                  </svg>
                </div>
                <h3 className='facts-title'>Polar з екологією</h3>
                <p className='facts-text'>
                  На всіх етапах виробництва й доставки ми намагаємося мінімізувати використання
                  пластику
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>
      {location.pathname !== '/about-us' && (
        <section className='gallery-section'>
          <div className='gallery-container container'>
            <picture>
              <source srcSet={img08desc} type='image/jpeg' media='(min-width:768px)' />
              <img src={img08} alt='' className='gallery-img' />
            </picture>

            <div className='gallery-img-wrap'>
              <picture>
                <source srcSet={img07desc} type='image/jpeg' media='(min-width:768px)' />
                <img src={img07} alt='' className='gallery-img' />
              </picture>

              <picture>
                <source srcSet={img13desc} type='image/jpeg' media='(min-width:768px)' />
                <img src={img13} alt='' className='gallery-img' />
              </picture>
            </div>

            <div className='gallery-img-wrap'>
              <picture>
                <source srcSet={img09desc} type='image/jpeg' media='(min-width:768px)' />
                <img src={img09} alt='' className='gallery-img' />
              </picture>

              <picture>
                <source srcSet={img15desc} type='image/jpeg' media='(min-width:768px)' />
                <img src={img15} alt='' className='gallery-img' />
              </picture>
            </div>

            <div className='gallery-img-wrap'>
              <picture>
                <source srcSet={img12desc} type='image/jpeg' media='(min-width:768px)' />
                <img src={img12} alt='' className='gallery-img' />
              </picture>

              <picture>
                <source srcSet={img14desc} type='image/jpeg' media='(min-width:768px)' />
                <img src={img14} alt='' className='gallery-img' />
              </picture>
            </div>

            <div className='gallery-img-wrap'>
              <picture>
                <source srcSet={img11desc} type='image/jpeg' media='(min-width:768px)' />
                <img src={img11} alt='' className='gallery-img' />
              </picture>
              <picture>
                <source srcSet={img10desc} type='image/jpeg' media='(min-width:768px)' />
                <img src={img10} alt='' className='gallery-img' />
              </picture>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default AboutUsPictures;
