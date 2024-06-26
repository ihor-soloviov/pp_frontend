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
import { fetchIsAnyOpenSpot } from './utils/spotStatusApi';
import userStore from './store/user-store';
import { DiscountModal } from './components/DiscountModal/DiscountModal';
import { LoadScript } from '@react-google-maps/api';
import { places, googleMapsApiKey } from './utils/googleMap';
import PopupActions from './components/PopupActions/PopupActions';
import RegistrationThanks from './components/Thanks/RegistrationThanks';
import WorkModal from './components/WorkModal/WorkModal';
import { shouldShowTimePopup } from './utils/getWorkTime';
const tagManagerArgs = {
  gtmId: 'GTM-WPHZCLVL',
};

const App = observer(() => {
  const location = useLocation();
  const navigate = useNavigate();

  //Store
  const {
    authModalHandler,
    authModal,
    timeModal,
    lightModal,
    isLoader,
    setLoader,
    isDiscountModal,
    isDiscountHandler,
    thanksRegModal,
    lightModalHandler,
    timeModalHandler,
    thanksRegModalHandler,
  } = modalsStore;
  const { userLogout } = userStore;

  const [promotionPopup, setPromotionPopup] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [showLightModal, setShowLightModal] = useState(false);
  const [statusResponse, setStatusResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Проверяем рабочие часы при загрузке компонента, если нерабочее время - сохраняем стейт в MobX и показываем модалку времени
  useEffect(() => {
    if (shouldShowTimePopup()) {
      timeModalHandler(true);
      setShowTimeModal(true);
    }
  }, []);

  // Проверяем, если идет загрузка- скрываем по дефолту модалку света, если все споты закрыты- сохраняем стейт в MobX и показываем модалку света
  useEffect(() => {
    if (isLoading) {
      lightModalHandler(false);
    } else {
      if (!isLoading && statusResponse === false) {
        lightModalHandler(!statusResponse);
        setShowLightModal(!statusResponse);
      }
    }
  }, [statusResponse, isLoading]);

  // Делаем запрос для получение статусов заведений при рендере компонента
  useEffect(() => {
    const fetchDataAndUpdateState = async () => {
      setIsLoading(true);
      try {
        const { isAnySpotOpen } = await fetchIsAnyOpenSpot();
        setStatusResponse(isAnySpotOpen);
      } catch (error) {
        console.error('Failed to fetch spot status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataAndUpdateState();
  }, []);

  const [error, setError] = useState({ status: false, currentError: '' });

  useEffect(() => {
    let timer;
    if (error.status) {
      timer = setTimeout(() => {
        handleError({
          status: false,
          currentError: '',
        });
      }, 2000);
    }

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
      {thanksRegModal && (
        <Popup closeModal={() => thanksRegModalHandler(false)}>
          <RegistrationThanks />
        </Popup>
      )}
      <Header setShowTimeModal={setShowTimeModal} setShowLightModal={setShowLightModal} />
      <MobileMenu />
      <ActionPopup />

      {error.status && (
        <PopupActions
          onOrderPage={{ location: location.pathname }}
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
      {lightModal && !shouldShowTimePopup() && (
        <WorkModal showModal={showLightModal} setShowModal={setShowLightModal} modalType='light' />
      )}
      {timeModal && (
        <WorkModal showModal={showTimeModal} setShowModal={setShowTimeModal} modalType='time' />
      )}
      {promotionPopup && (
        <PopupActions
          action={'Ваш промокод застосован'}
          onClick={() => {
            setPromotionPopup(false);
          }}
        />
      )}
      {isLoader && <Loader />}
      {isDiscountModal && (
        <Popup
          closeModal={() => {
            isDiscountHandler(false);
            navigate('/order');
          }}
        >
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
          element={
            <Order
              setStatusResponseApp={setStatusResponse}
              setShowTimeModal={setShowTimeModal}
              setShowLightModal={setShowLightModal}
              handleError={handleError}
              setPromotionPopup={setPromotionPopup}
            />
          }
        />
        <Route path='/contact' element={<Contact />} />
        <Route path='/offero' element={<Offero />} />
        <Route path='/payment-and-delivery' element={<PaymentAndDelivery />} />
        <Route path='/profile/*' element={<Profile handleError={handleError} />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </LoadScript>
  );
});

export default App;
