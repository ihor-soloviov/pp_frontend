import React from 'react';
import './AboutUs.scss';

//Images
//    src='./images/about/about-1-desc.png'
import img01 from '../../../src/assets/images/about/about-1-desc.png';
import img02 from '../../../src/assets/images/about/about-2-desc.png';
import img03 from '../../../src/assets/images/about/about-3-desc.png';

const AboutUs = () => {
  return (
    <main>
      <section class='about-section'>
        <div class='about-container container'>
          <div class='about-top-wrap'>
            <ul class='about-top-list list'>
              <li class='about-top-item'>
                <p class='about-top-subtitle'>Наша історія</p>
                <h2 class='about-top-title title'>З чого все почалося?</h2>
              </li>
              <li class='about-top-item'>
                <p class='about-top-text text'>
                  Засновник Polar — європеєць з українським корінням — кілька
                  років тому відвідав Україну. А Одесу, його жителів і колорит
                  ви знаєте — не закохатися неможливо.
                </p>
              </li>
              <li class='about-top-item'>
                <p class='about-top-text text'>
                  Іскра, буря, божевілля, і от наш Костя вирішив залишитися в
                  Україні, аби радувати людей вишуканими пельменями й піднімати
                  економіку нашої країни.
                </p>
              </li>
              <li class='about-top-item'>
                <p class='about-top-text text'>
                  Піца, суші, бургери, рамен… А де ж пельмені, які точно
                  займають окреме місце в сердечку кожного українця?
                </p>
              </li>
              <li class='about-top-item'>
                <p class='about-top-text text'>
                  Це питання поставив собі засновник Polar, який не побачив на
                  ринку доставки цієї страви і смачних соусів до неї. І
                  понеслася…
                </p>
              </li>
            </ul>
            <img src={img01} alt='women' class='about-top-img first' />
          </div>
          <svg class='about-icon first'>
            <use href='./src/images/index/sprite.svg#icon-arrow-1'></use>
          </svg>
          <div class='about-wrap'>
            <ul class='about-list list'>
              <li class='about-item'>
                <h2 class='about-title title'>
                  Як все
                  <br />
                  призупинилося?
                </h2>
              </li>
              <li class='about-item'>
                <p class='about-text text'>
                  23 лютого була пре-паті дегустація в Одесі:люди гідно оцінили
                  наші старання, смак пельменів, різноманітність вибору і
                  швидкість приготування.
                </p>
              </li>
              <li class='about-item'>
                <p class='about-text text'>Наступного дня почалася війна.</p>
              </li>
              <li class='about-item'>
                <p class='about-text text'>
                  Ми, як і будь-який бізнес в Україні, не могли працювати як
                  раніше.
                </p>
              </li>
              <li class='about-item'>
                <p class='about-text text'>
                  Команда Polar не здалася і прийняла рішення відчинитися в
                  більш безпечному місті України — Ужгороді.
                </p>
              </li>
              <li class='about-item'>
                <p class='about-text text'>
                  Створили цех у Закарпатті, поліпшили рецептуру і зробили
                  пельмені ще кращими з ідеальним тістом і начинками!
                </p>
              </li>
            </ul>
            <img src={img02} alt='dishes' class='about-img second' />
          </div>
          <svg class='about-icon second'>
            <use href='./src/images/index/sprite.svg#icon-arrow-2'></use>
          </svg>
          <div class='about-bottom-wrap'>
            <ul class='about-bottom-list list'>
              <li class='about-bottom-item'>
                <h2 class='about-bottom-title title'>
                  Ми продумали все
                  <br />
                  до дрібниць
                </h2>
              </li>
              <li class='about-bottom-item'>
                <p class='about-bottom-text text'>
                  У терміновому порядку (мова ж не просто про їжу, а про
                  ПЕЛЬМЕНІ) зібралася сильна команда на чолі із шеф-кухарем.
                </p>
              </li>
              <li class='about-bottom-item'>
                <p class='about-bottom-text text'>
                  Днями й ночами ми розробляли стратегію, особливу рецептуру,
                  концепцію меню з професіоналами, щоби насолоджуватися
                  пельменями міг кожен.
                </p>
              </li>
              <li class='about-bottom-item'>
                <p class='about-bottom-text text'>
                  Не залишили без уваги нікого.
                </p>
              </li>
              <li class='about-bottom-item'>
                <p class='about-bottom-text text'>
                  І вегетаріанці, і вегани, і переконані м’ясоїди, і любителі
                  рибки, овочів, навіть солодощів точно знайдуть порцію
                  улюблених пельменів для себе в Polar
                </p>
              </li>
            </ul>

            <img src={img03} alt='women' class='about-bottom-img' />
          </div>
        </div>
      </section>
      <section class='facts-section'>
        <div class='facts-container container'>
          <h2 class='facts-main-title title'>Важливі факти про Polar</h2>
          <div class='facts-list-wrap'>
            <ul class='facts-list list'>
              <li class='facts-item'>
                <div class='facts-icon-wrap'>
                  <svg class='facts-icon'>
                    <use href='./src/images/index/sprite.svg#icon-facts-1'></use>
                  </svg>
                </div>
                <h3 class='facts-title'>Ми самі виробляємо все</h3>
                <p class='facts-text'>
                  фарш, бульйони, соуси. І це з найякісніших продуктів від
                  перевірених постачальників. Тому що, хороші пельмені
                  починаються зі свіжих продуктів
                </p>
              </li>
              <li class='facts-item'>
                <div class='facts-icon-wrap'>
                  <svg class='facts-icon'>
                    <use href='./src/images/index/sprite.svg#icon-facts-2'></use>
                  </svg>
                </div>

                <h3 class='facts-title'>10 видів різних пельменів</h3>

                <p class='facts-text'>
                  І вегетаріанці, і вегани, і переконані м’ясоїди, і любителі
                  рибки, овочів, навіть солодощів точно знайдуть порцію
                  улюблених пельменів
                </p>
              </li>
              <li class='facts-item'>
                <div class='facts-icon-wrap'>
                  <svg class='facts-icon'>
                    <use href='./src/images/index/sprite.svg#icon-facts-3'></use>
                  </svg>
                </div>
                <h3 class='facts-title'>4 хвилини</h3>
                <p class='facts-text'>
                  Мало що можна встигнути зробити за цей час, але ми точно
                  знаємо, що пельмені від Polar вже будуть готові
                </p>
              </li>
              <li class='facts-item'>
                <div class='facts-icon-wrap'>
                  <svg class='facts-icon'>
                    <use href='./src/images/index/sprite.svg#icon-facts-4'></use>
                  </svg>
                </div>
                <h3 class='facts-title'>Polar з екологією</h3>
                <p class='facts-text'>
                  На всіх етапах виробництва й доставки ми намагаємося
                  мінімізувати використання пластику
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section class='gallery-section'>
        <div class='gallery-container container'>
          <picture>
            <source
              srcset='./images/about/about-8-desc.jpg'
              type='image/jpeg'
              media='(min-width:768px)'
            />
            <img
              src='./images/about/about-8-mobile.jpg'
              alt=''
              class='gallery-img'
            />
          </picture>

          <div class='gallery-img-wrap'>
            <picture>
              <source
                srcset='./images/about/about-7-desc.jpg'
                type='image/jpeg'
                media='(min-width:768px)'
              />
              <img
                src='./images/about/about-7-mobile.jpg'
                alt=''
                class='gallery-img'
              />
            </picture>

            <picture>
              <source
                srcset='./images/about/about-13-desc.jpg'
                type='image/jpeg'
                media='(min-width:768px)'
              />
              <img
                src='./images/about/about-13-mobile.jpg'
                alt=''
                class='gallery-img'
              />
            </picture>
          </div>

          <div class='gallery-img-wrap'>
            <picture>
              <source
                srcset='./images/about/about-9-desc.jpg'
                type='image/jpeg'
                media='(min-width:768px)'
              />
              <img
                src='./images/about/about-9-mobile.jpg'
                alt=''
                class='gallery-img'
              />
            </picture>

            <picture>
              <source
                srcset='./images/about/about-15-desc.jpg'
                type='image/jpeg'
                media='(min-width:768px)'
              />
              <img
                src='./images/about/about-15-mobile.jpg'
                alt=''
                class='gallery-img'
              />
            </picture>
          </div>

          <div class='gallery-img-wrap'>
            <picture>
              <source
                srcset='./images/about/about-12-desc.jpg'
                type='image/jpeg'
                media='(min-width:768px)'
              />
              <img
                src='./images/about/about-12-mobile.jpg'
                alt=''
                class='gallery-img'
              />
            </picture>

            <picture>
              <source
                srcset='./images/about/about-14-desc.jpg'
                type='image/jpeg'
                media='(min-width:768px)'
              />
              <img
                src='./images/about/about-14-mobile.jpg'
                alt=''
                class='gallery-img'
              />
            </picture>
          </div>

          <div class='gallery-img-wrap'>
            <picture>
              <source
                srcset='./images/about/about-11-desc.jpg'
                type='image/jpeg'
                media='(min-width:768px)'
              />
              <img
                src='./images/about/about-11-mobile.jpg'
                alt=''
                class='gallery-img'
              />
            </picture>
            <picture>
              <source
                srcset='./images/about/about-10-desc.jpg'
                type='image/jpeg'
                media='(min-width:768px)'
              />
              <img
                src='./images/about/about-10-mobile.jpg'
                alt=''
                class='gallery-img'
              />
            </picture>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUs;
