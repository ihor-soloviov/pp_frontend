/* eslint-disable react-hooks/exhaustive-deps */
//Import React
import React, { useEffect, useState } from 'react';

//Import Routing
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

//Import MOBX
import { observer } from 'mobx-react-lite';
import modalsStore from './store/modal-store';

//Import pages
import Profile from './Pages/Profile/Profile';
import ProductPage from './Pages/ProductPage/ProductPage';
import AboutUs from './Pages/AboutUs/AboutUs';
import Order from './Pages/Order/Order';
import { Main } from './Pages/Main/Main';
import MenuPage from './Pages/MenuPage/MenuPage';
import Contact from './Pages/Contact/Contact';
import { PaymentAndDelivery } from './Pages/PaymentAndDelivery/PaymentAndDelivery';
import Offero from './Pages/Offero/Offero';
import NotFound from './Pages/NotFound/NotFound';
//Import components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Popup from './components/Popup/Popup';
import SignUp from './components/SignUp/SignUp';
import { MobileMenu } from './components/Header/HeaderComponents/MobileMenu';
import { ActionPopup } from './components/ActionPopup/ActionPopup';
import { Loader } from './components/Loader/Loader';
//Import Utils
import TagManager from 'react-gtm-module';
import userStore from './store/user-store';
import { DiscountModal } from './components/DiscountModal/DiscountModal';

import { LoadScript } from '@react-google-maps/api';
import { places, googleMapsApiKey } from './utils/googleMap';
import PopupActions from './components/PopupActions/PopupActions';
const tagManagerArgs = {
  gtmId: 'GTM-WPHZCLVL',
};

const App = observer(() => {
  const location = useLocation();
  const navigate = useNavigate();

  //Store
  const { authModalHandler, authModal, isLoader, setLoader, isDiscountModal, isDiscountHandler } =
    modalsStore;
  const { userLogout } = userStore;

  const [promotionPopup, setPromotionPopup] = useState(false);
  const [error, setError] = useState({ status: false, currentError: '' });

  useEffect(() => {
    const timer = setTimeout(() => {
      handleError({
        status: false,
        currentError: '',
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [error]);
  const handleError = (newErrorState) => setError(newErrorState);
  useEffect(() => {
    TagManager.initialize(tagManagerArgs);
    setLoader();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (location.pathname === '/profile/signout') {
      userLogout();
      navigate('/');
    }
  }, [location.pathname]);

  useEffect(() => {
    const isOrderPage = location.pathname.startsWith('/order');
    const isAddressPage = location.pathname.startsWith('/profile/addresses');

    if (isOrderPage) {
      document.body.classList.add('order-page');
    } else {
      document.body.classList.remove('order-page');
    }

    if (isAddressPage) {
      document.body.classList.add('address-page');
    } else {
      document.body.classList.remove('address-page');
    }

    return () => {
      document.body.classList.remove('order-page');
      document.body.classList.remove('address-page');
    };
  }, [location.pathname]);

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey} language='uk' libraries={places}>
      {authModal && (
        <Popup closeModal={() => authModalHandler(false)}>
          <SignUp />
        </Popup>
      )}
      <Header />
      <MobileMenu />
      <ActionPopup />
      {isLoader && <Loader />}
      {isDiscountModal && (
        <Popup closeModal={() => {
          isDiscountHandler(false)
          navigate('/order')
        }}>
          <DiscountModal />
        </Popup>
      )}
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/menu' element={<MenuPage />}>
          <Route path=':id' element={<MenuPage />} />
        </Route>
        <Route path='/product/:id' element={<ProductPage />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route
          path='/order'
          element={<Order handleError={handleError} setPromotionPopup={setPromotionPopup} />}
        />
        <Route path='/contact' element={<Contact />} />
        <Route path='/offero' element={<Offero />} />
        <Route path='/payment-and-delivery' element={<PaymentAndDelivery />} />
        <Route path='/profile/*' element={<Profile handleError={handleError} />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />

      {error.status && (
        <PopupActions
          action={error.currentError}
          onClick={() =>
            setError({
              status: false,
              currentError: '',
            })
          }
          error
        />
      )}

      {promotionPopup && (
        <PopupActions
          action={'Ваш промокод застосован'}
          onClick={() => {
            setPromotionPopup(false);
          }}
        />
      )}
    </LoadScript>
  );
});

export default App;
