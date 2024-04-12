import React from 'react';
import img01 from '../../../src/assets/images/about/about-1-desc.png';
import img02 from '../../../src/assets/images/about/about-2-desc.png';
import img03 from '../../../src/assets/images/about/about-3-desc.png';
import img07 from '../../assets/images/about/about-7-mobile.jpg';
import img07desc from '../../assets/images/about/about-7-desc.jpg';
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
import img16 from '../../assets/images/about/about-16-mobile.jpg';
import img16desc from '../../assets/images/about/about-16-desc.jpg';
import img17 from '../../assets/images/about/about-17-mobile.jpg';
import img17desc from '../../assets/images/about/about-17-desc.jpg';
import img18 from '../../assets/images/about/about-18-mobile.jpg';
import img18desc from '../../assets/images/about/about-18-desc.jpg';
import img19 from '../../assets/images/about/about-19-mobile.jpg';
import img19desc from '../../assets/images/about/about-19-desc.jpg';
import img20 from '../../assets/images/about/about-20-mobile.jpg';
import img20desc from '../../assets/images/about/about-20-desc.jpg';
import img21 from '../../assets/images/about/about-21-mobile.jpg';
import img21desc from '../../assets/images/about/about-21-desc.jpg';
import img22 from '../../assets/images/about/about-22-mobile.jpg';
import img22desc from '../../assets/images/about/about-22-desc.jpg';
import img23 from '../../assets/images/about/about-23-mobile.jpg'
import img23desc from '../../assets/images/about/about-23-desc.jpg';

import svg1 from './sprite.svg';

import './AboutUs.scss';
import { useLocation } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const AboutUsPictures = () => {
  const location = useLocation();

  return (
    <>
      <section
        className='about-section'
        style={{ marginTop: location.pathname !== '/about-us' ? 120 : 0 }}
      >
        <div className='about-container container'>
          <div className='about-top-wrap'>
            <ul className='about-top-list list'>
              <li className='about-top-item'>
                <p className='about-top-subtitle'>Наша історія</p>
                <h2 className='about-top-title title'>З чого все почалось?</h2>
              </li>
              <li className='about-top-item'>
                <p className='about-top-text text'>
                  Засновник Polar — європеєць з українським корінням — Костя.
                </p>
              </li>
              <li className='about-top-item'>
                <p className='about-top-text text'>
                  Костя приїхав в Україну декілька років тому і відвідав Одесу. Краса міста та неповторний колорит оселились у серці Кості. Бажаючи дарувати радість людям, Костя залишився в Одесі з бажанням годувати українців смачною їжею
                </p>
              </li>
              <li className='about-top-item'>
                <p className='about-top-text text'>
                  Спостерігаючи за популярністю піци, суші, бургерів та рамену, Костя запитав себе: <b>чому ж домашня їжа, така улюблена серцем кожного українця, не займає належного місця на ринку доставки?</b> Він помітив відсутність якісних пельменів, котлет, а тим паче різноманітних смачних соусів до них.
                </p>
              </li>

              <li className='about-top-item'>
                <p className='about-top-text text'>
                  Так була народжена ідея Polar. Було вирішено створити сервіс, де кожен зможе насолодитися пельменями з начинками, натхненними кулінарними традиціями різних країн, доповненими оригінальними соусами. Таким чином, Polar відкрив для українців і гостей країни нові гастрономічні горизонти, сприяючи культурному обміну та економічному розвитку.

                </p>
              </li>
            </ul>
            <LazyLoadImage effect='blur' src={img01} alt='women' className='about-top-img first' />
          </div>
          <div className='about-wrap'>
            <ul className='about-list list'>
              <li className='about-item'>
                <h2 className='about-title title'>
                  Як все
                  <br />
                  призупинилось?
                </h2>
              </li>
              <li className='about-item'>
                <p className='about-text text'>
                  23-го лютого було гучне пре-паті в Одесі. Одесити високо оцінили наші старання: смак їжі, різноманітність вибору, швидкість приготування.
                </p>
              </li>
              <li className='about-item'>
                <p className='about-text text'>Але наступного дня почалася війна…</p>
              </li>
              <li className='about-item'>
                <p className='about-text text'>
                  Ми, як і будь-який бізнес в Україні, не могли працювати як раніше.
                </p>
              </li>
              <li className='about-item'>
                <p className='about-text text'>
                  Команда Polar не здалася і прийняла рішення відчинитися в більш безпечному місті України.

                </p>
              </li>
              <li className='about-item'>
                <p className='about-text text'>
                  Створили цех у Закарпатті, поліпшили рецептуру і зробили пельмені ще кращими з ідеальним тістом і начинками!
                </p>
              </li>
            </ul>
            <LazyLoadImage src={img02} alt='dishes' className='about-img second' />
          </div>
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
                  У терміновому порядку (мова ж не просто про їжу, а про ПЕЛЬМЕНІ) зібралася сильна команда на чолі із шеф-кухарем.
                </p>
              </li>
              <li className='about-bottom-item'>
                <p className='about-bottom-text text'>
                  Днями й ночами, ми з професіоналами розробляли особливу рецептуру. Ми намагалися знайти підхід до кожного поціновувача стріт фуду.
                </p>
              </li>
              <li className='about-bottom-item'>
                <p className='about-bottom-text text'>
                  Вегетаріанці і вегани, переконані м’ясоїди, любителі рибки та овочів, (навіть солодощів!):  кожен знайде порцію пельменів для себе.
                </p>
              </li>
              <li className='about-bottom-item'>
                <p className='about-bottom-text text'>
                  Ми з командою Polar вклали свою душу та серце для того, щоб Ви могли переусвідомити “традиційні” домашні страви зовсім по новому!
                </p>
              </li>
            </ul>

            <LazyLoadImage effect='blur' src={img03} alt='women' className='about-bottom-img' />
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
                <h3 className='facts-title'>Власне виробництво</h3>
                <p className='facts-text'>
                  Фарш, бульйони, соуси. Все з якісних продуктів від перевірених постачальників. Хороші пельмені починаються зі свіжих продуктів.
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
                  Вегетаріанці і вегани, переконані м’ясоїди, любителі рибки та овочів, (навіть солодощів!):  кожен знайде порцію пельменів для себе.
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
                  Мало що можна встигнути за цей час, але ми точно знаємо, що пельмені від Polar вже будуть готові.
                </p>
              </li>
              <li className='facts-item'>
                <div className='facts-icon-wrap'>
                  <svg className='facts-icon'>
                    <use href={`${svg1}#icon-facts-4`}></use>
                  </svg>
                </div>
                <h3 className='facts-title'>Eco-Friendly Polar</h3>
                <p className='facts-text'>
                  На всіх етапах виробництва й доставки ми намагаємося мінімізувати використання пластику
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>
      {location.pathname !== '/about-us' && (
        <section className='gallery-section'>
          <div className='gallery-container'>
            <div className='gallery-img-wrap'>
              <LazyLoadImage
                className='gallery-img-mob desc'
                src={img07desc}
                type='image/jpeg'
                media='(min-width:768px)'
              />
              <LazyLoadImage width={162} effect='blur' src={img07} alt='' className='gallery-img-mob' />

              <LazyLoadImage
                className='gallery-img-mob desc'
                srcSet={img13desc}

                type='image/jpeg'
                media='(min-width:768px)'
              />
              <LazyLoadImage width={162} effect='blur' src={img13} alt='' className='gallery-img-mob' />
            </div>

            <div className='gallery-img-wrap'>
              <LazyLoadImage
                className='gallery-img-mob desc'
                src={img09desc}

                type='image/jpeg'
                media='(min-width:768px)'
              />
              <LazyLoadImage width={162} effect='blur' src={img09} alt='' className='gallery-img-mob' />

              <LazyLoadImage
                className='gallery-img-mob desc'
                srcSet={img15desc}

                type='image/jpeg'
                media='(min-width:768px)'
              />
              <LazyLoadImage width={162} effect='blur' src={img15} alt='' className='gallery-img-mob' />
            </div>

            <div className='gallery-img-wrap'>
              <LazyLoadImage
                className='gallery-img-mob desc'
                src={img12desc}

                type='image/jpeg'
                media='(min-width:768px)'
              />
              <LazyLoadImage width={162} effect='blur' src={img12} alt='' className='gallery-img-mob' />

              <LazyLoadImage
                className='gallery-img-mob desc'
                src={img14desc}

                type='image/jpeg'
                media='(min-width:768px)'
              />
              <LazyLoadImage width={162} effect='blur' src={img14} alt='' className='gallery-img-mob' />
            </div>

            <div className='gallery-img-wrap'>
              <LazyLoadImage
                className='gallery-img-mob desc'
                src={img11desc}

                type='image/jpeg'
                media='(min-width:768px)'
              />
              <LazyLoadImage width={162} effect='blur' src={img11} alt='' className='gallery-img-mob' />

              <LazyLoadImage
                className='gallery-img-mob desc'
                src={img10desc}

                type='image/jpeg'
                media='(min-width:768px)'
              />
              <LazyLoadImage width={162} effect='blur' src={img10} alt='' className='gallery-img-mob' />
            </div>

            <div className='gallery-img-wrap'>
              <LazyLoadImage
                className='gallery-img-mob desc'

                src={img16desc}
                type='image/jpeg'
                media='(min-width:768px)'
              />
              <LazyLoadImage width={162} effect='blur' src={img16} alt='' className='gallery-img-mob' />

              <LazyLoadImage
                className='gallery-img-mob desc'
                srcSet={img18desc}

                type='image/jpeg'
                media='(min-width:768px)'
              />
              <LazyLoadImage width={162} effect='blur' src={img18} alt='' className='gallery-img-mob' />
            </div>

            <div className='gallery-img-wrap'>
              <LazyLoadImage
                className='gallery-img-mob desc'
                src={img17desc}

                type='image/jpeg'
                media='(min-width:768px)'
              />
              <LazyLoadImage width={162} effect='blur' src={img17} alt='' className='gallery-img-mob' />

              <LazyLoadImage
                className='gallery-img-mob desc'
                srcSet={img19desc}

                type='image/jpeg'
                media='(min-width:768px)'
              />
              <LazyLoadImage width={162} effect='blur' src={img19} alt='' className='gallery-img-mob' />
            </div>

            <div className='gallery-img-wrap'>
              <LazyLoadImage
                className='gallery-img-mob desc'

                src={img20desc}
                type='image/jpeg'
                media='(min-width:768px)'
              />
              <LazyLoadImage width={162} effect='blur' src={img20} alt='' className='gallery-img-mob' />

              <LazyLoadImage
                className='gallery-img-mob desc'
                srcSet={img22desc}

                type='image/jpeg'
                media='(min-width:768px)'
              />
              <LazyLoadImage width={162} effect='blur' src={img22} alt='' className='gallery-img-mob' />
            </div>

            <div className='gallery-img-wrap'>
              <LazyLoadImage
                className='gallery-img-mob desc'
                src={img21desc}

                type='image/jpeg'
                media='(min-width:768px)'
              />
              <LazyLoadImage width={162} effect='blur' src={img21} alt='' className='gallery-img-mob' />

              <LazyLoadImage
                className='gallery-img-mob desc'
                srcSet={img23desc}

                type='image/jpeg'
                media='(min-width:768px)'
              />
              <LazyLoadImage width={162} effect='blur' src={img23} alt='' className='gallery-img-mob' />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default AboutUsPictures;
