import React from 'react';
import { Link } from 'react-router-dom';

//Import components
import Container from '../Container/Container';

//Import Images
import logo from '../../assets/logo/logoBlackText.svg';
import mastercardIco from '../../assets/logo/mastercard.svg';
import visaIco from '../../assets/logo/visa.svg';
import liqpayIco from '../../assets/logo/liqpay.svg';

import '../Footer/Footer.scss';
import { observer } from 'mobx-react-lite';
import menuStore from '../../store/menu-store';

const Footer = observer(() => {
  const { categories, setCurrentCategoryId } = menuStore;
  const contacts = [
    {
      city: 'Одеса',
      telephoneNumber: '+380 (98) 727-19-91',
      href: 'tel:+380987271991',
      address: 'вул. Маршала Малиновскього, 18',
    },
  ];

  return (
    <footer className='footer'>
      <Container>
        <div className='footer__content'>
          <div className='footer__top'>
            <div className='footer__logo'>
              <img
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                src={logo}
                alt=''
              />
            </div>
            <nav className='footer__column'>
              <p className='footer__title'>Меню:</p>
              <ul className='footer__menu'>
                {categories &&
                  categories.map((item) => {
                    return (
                      <li className='footer__link' key={item.category_id}>
                        <Link
                          to={`/menu/${item.category_id}`}
                          onClick={() => setCurrentCategoryId(item.category_id)}
                        >
                          {item.category_name}
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </nav>
            <div className='footer__column'>
              {contacts.map((contact) => (
                <div className='footer__contact' key={contact.city}>
                  <p className='footer__title contact'>{contact.city} :</p>
                  <ul className='footer__contacts'>
                    <a href={contact.href}>{contact.telephoneNumber}</a>
                    <p>{contact.address}</p>
                  </ul>
                </div>
              ))}
            </div>
            <div className='footer__column'>
              <div className='footer__contact'>
                <p className='footer__title_time contact'>Графік роботи:</p>
                <p className='footer__time-text'>Пн-Нд: 9:30-21:00</p>
              </div>
            </div>
          </div>
          <div className='footer__bottom'>
            <ul className='footer__bottom-nav'>
              <li>
                <Link>© 2023 Polar Pelmeni</Link>
              </li>
              <li>
                <Link to={'/about-us'}>Про нас</Link>
              </li>
              <li>
                <Link to={'/contact'}>Контакти</Link>
              </li>
              <li>
                <Link to={'/offero'}>Публічний договір</Link>
              </li>
              <li>
                <Link to={'/payment-and-delivery'}>Оплата і доставка</Link>
              </li>
            </ul>
            <div className='footer__bottom-contacts'>
              <a href='mailto:polarpelmeni.od@gmail.com'>polarpelmeni.od@gmail.com</a>
              <div className='footer__social-icons'>
                <a
                  className='footer__social'
                  href='https://www.instagram.com/polarpelmeni/'
                  target='_blank'
                  rel='noreferrer'
                >
                  <svg
                    width='16'
                    height='16'
                    viewBox='0 0 16 16'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <g opacity='0.8' clipPath='url(#clip0_588_31750)'>
                      <path
                        d='M7.99908 6.18163C7.51687 6.18163 7.05441 6.37319 6.71343 6.71417C6.37246 7.05514 6.1809 7.5176 6.1809 7.99982C6.1809 8.48203 6.37246 8.94449 6.71343 9.28546C7.05441 9.62644 7.51687 9.818 7.99908 9.818C8.48129 9.818 8.94376 9.62644 9.28473 9.28546C9.62571 8.94449 9.81726 8.48203 9.81726 7.99982C9.81726 7.5176 9.62571 7.05514 9.28473 6.71417C8.94376 6.37319 8.48129 6.18163 7.99908 6.18163ZM7.99908 4.96951C8.80277 4.96951 9.57354 5.28878 10.1418 5.85707C10.7101 6.42536 11.0294 7.19613 11.0294 7.99982C11.0294 8.8035 10.7101 9.57427 10.1418 10.1426C9.57354 10.7109 8.80277 11.0301 7.99908 11.0301C7.1954 11.0301 6.42463 10.7109 5.85633 10.1426C5.28804 9.57427 4.96878 8.8035 4.96878 7.99982C4.96878 7.19613 5.28804 6.42536 5.85633 5.85707C6.42463 5.28878 7.1954 4.96951 7.99908 4.96951ZM11.9385 4.818C11.9385 5.01892 11.8587 5.21161 11.7166 5.35368C11.5745 5.49576 11.3818 5.57557 11.1809 5.57557C10.98 5.57557 10.7873 5.49576 10.6452 5.35368C10.5031 5.21161 10.4233 5.01892 10.4233 4.818C10.4233 4.61708 10.5031 4.42438 10.6452 4.28231C10.7873 4.14024 10.98 4.06042 11.1809 4.06042C11.3818 4.06042 11.5745 4.14024 11.7166 4.28231C11.8587 4.42438 11.9385 4.61708 11.9385 4.818ZM7.99908 3.15133C6.49969 3.15133 6.25484 3.15557 5.55726 3.18648C5.08211 3.20891 4.76333 3.27254 4.46757 3.38769C4.20454 3.48951 4.01484 3.61133 3.81302 3.81375C3.62333 3.99703 3.47748 4.22077 3.38636 4.4683C3.2712 4.76527 3.20757 5.08345 3.18575 5.558C3.15423 6.22709 3.1506 6.46103 3.1506 7.99982C3.1506 9.49921 3.15484 9.74406 3.18575 10.4416C3.20817 10.9162 3.27181 11.2356 3.38636 11.5307C3.48939 11.7944 3.6106 11.9841 3.81181 12.1853C4.01605 12.3889 4.20575 12.5107 4.46636 12.6113C4.76575 12.7271 5.08454 12.7913 5.55726 12.8131C6.22636 12.8447 6.46029 12.8483 7.99908 12.8483C9.49848 12.8483 9.74332 12.8441 10.4409 12.8131C10.9148 12.7907 11.2342 12.7271 11.53 12.6125C11.7924 12.5101 11.9833 12.3883 12.1845 12.1871C12.3888 11.9828 12.5106 11.7931 12.6112 11.5325C12.7264 11.2338 12.7906 10.9144 12.8124 10.4416C12.8439 9.77254 12.8476 9.5386 12.8476 7.99982C12.8476 6.50042 12.8433 6.25557 12.8124 5.558C12.79 5.08406 12.7264 4.76406 12.6112 4.4683C12.5199 4.22103 12.3743 3.99737 12.1851 3.81375C12.002 3.62396 11.7782 3.4781 11.5306 3.38709C11.2336 3.27194 10.9148 3.2083 10.4409 3.18648C9.77181 3.15497 9.53787 3.15133 7.99908 3.15133ZM7.99908 1.93921C9.64575 1.93921 9.8512 1.94527 10.4973 1.97557C11.1427 2.00588 11.5821 2.10709 11.9688 2.25739C12.3688 2.41133 12.7057 2.61982 13.0427 2.95618C13.3509 3.25915 13.5894 3.62563 13.7415 4.03012C13.8912 4.41618 13.993 4.85618 14.0233 5.50163C14.0518 6.14769 14.0597 6.35315 14.0597 7.99982C14.0597 9.64648 14.0536 9.85194 14.0233 10.498C13.993 11.1435 13.8912 11.5828 13.7415 11.9695C13.5898 12.3742 13.3513 12.7408 13.0427 13.0435C12.7397 13.3515 12.3732 13.59 11.9688 13.7422C11.5827 13.8919 11.1427 13.9938 10.4973 14.0241C9.8512 14.0525 9.64575 14.0604 7.99908 14.0604C6.35242 14.0604 6.14696 14.0544 5.5009 14.0241C4.85545 13.9938 4.41605 13.8919 4.02939 13.7422C3.62473 13.5904 3.25819 13.3519 2.95545 13.0435C2.64721 12.7405 2.40874 12.374 2.25666 11.9695C2.10636 11.5835 2.00514 11.1435 1.97484 10.498C1.94636 9.85194 1.93848 9.64648 1.93848 7.99982C1.93848 6.35315 1.94454 6.14769 1.97484 5.50163C2.00514 4.85557 2.10636 4.41678 2.25666 4.03012C2.40832 3.62538 2.64684 3.2588 2.95545 2.95618C3.25828 2.64783 3.6248 2.40935 4.02939 2.25739C4.41605 2.10709 4.85484 2.00588 5.5009 1.97557C6.14696 1.94709 6.35242 1.93921 7.99908 1.93921Z'
                        fill='#FF5124'
                      />
                    </g>
                    <defs>
                      <clipPath id='clip0_588_31750'>
                        <rect
                          width='14.5455'
                          height='14.5455'
                          fill='white'
                          transform='translate(0.727539 0.727539)'
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </a>
                <a
                  className='footer__social'
                  href='https://www.facebook.com/polarpelmeni/'
                  target='_blank'
                  rel='noreferrer'
                >
                  <svg
                    width='16'
                    height='16'
                    viewBox='0 0 16 16'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <g clipPath='url(#clip0_588_31755)'>
                      <path
                        d='M7.99908 1.93921C4.65181 1.93921 1.93848 4.65254 1.93848 7.99981C1.93848 11.0247 4.15484 13.5319 7.05242 13.9871V9.75133H5.51302V7.99981H7.05242V6.66466C7.05242 5.14588 7.95666 4.30709 9.34151 4.30709C10.0045 4.30709 10.6979 4.42527 10.6979 4.42527V5.91618H9.93423C9.1809 5.91618 8.94636 6.38345 8.94636 6.86285V7.99981H10.627L10.3585 9.75133H8.94636V13.9871C11.8433 13.5325 14.0597 11.0241 14.0597 7.99981C14.0597 4.65254 11.3464 1.93921 7.99908 1.93921Z'
                        fill='#FF5124'
                      />
                    </g>
                    <defs>
                      <clipPath id='clip0_588_31755'>
                        <rect
                          width='14.5455'
                          height='14.5455'
                          fill='white'
                          transform='translate(0.727539 0.727539)'
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </a>
              </div>
              <div className='footer__payment-icons'>
                <div className='footer__payment-ico'>
                  <img src={visaIco} alt='' />
                </div>
                <div className='footer__payment-ico'>
                  <img src={mastercardIco} alt='' />
                </div>
                <div className='footer__payment-ico'>
                  <img src={liqpayIco} alt='' />
                </div>
              </div>
              <li className='pp-mob'>
                <Link to='/' onClick={() => window.screenTop({ top: 0, behavior: 'smooth' })}>
                  © 2023 Polar Pelmeni
                </Link>
              </li>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
});

export default Footer;
