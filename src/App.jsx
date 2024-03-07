/* eslint-disable react-hooks/exhaustive-deps */
//Import React
import React, { useCallback, useEffect, useState } from 'react';

//Import Routing
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

//Import MOBX
import { observer } from 'mobx-react-lite';
import modalsStore from './store/modal-store';
import userStore from './store/user-store';
import popupActionsStore from './store/popup-action-store';

//Import pages
import Profile from './Pages/Profile/Profile';
import ProductPage from './Pages/ProductPage/ProductPage';
import AboutUs from './Pages/AboutUs/AboutUs';
import Order from './Pages/Order/Order';
import { Main } from './Pages/Main/Main';
import MenuPage from './Pages/MenuPage/MenuPage';
import Contact from './Pages/Contact/Contact';

//Import components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import PopupActions from './components/PopupActions/PopupActions';
import Loader from './components/Loader/Loader';

//Import Utils
import TagManager from 'react-gtm-module';
import PaymentAndDelivery from './Pages/PaymentAndDelivery/PaymentAndDelivery';
import Offero from './Pages/Offero/Offero';
import NotFound from './Pages/NotFound/NotFound';
import Popup from './components/Popup/Popup';
import SignUp from './components/SignUp/SignUp';
import { MobileMenu } from "./components/Header/HeaderComponents/MobileMenu";

const tagManagerArgs = {
  gtmId: 'GTM-5CBQPKC',
};

TagManager.initialize(tagManagerArgs);

const App = observer(() => {
  //Store
  const { userLogout } = userStore;
  const { authModalHandler, authModal } = modalsStore;
  const { currentAction } = popupActionsStore;

  //Tools
  const location = useLocation();
  const navigate = useNavigate();

  const actionPopupHandler = useCallback(() => {
    if (currentAction === 'addToCard') {
      return <PopupActions action={'Блюдо додано у кошик'} />;
    }
    if (currentAction === 'addToFavorit') {
      return <PopupActions action={'Блюдо додано в «Улюблене»'} />;
    } else {
      return false;
    }
  }, [currentAction]);

  useEffect(() => {
    if (location.pathname === '/profile/signout') {
      userLogout();
      navigate('/');
    }
  }, [location.pathname, userLogout, navigate]);

  return (
    <React.Fragment>
      {actionPopupHandler()}
      {authModal && (
        <Popup closeModal={() => authModalHandler(false)}>
          <SignUp />
        </Popup>
      )}
      <Header />
      <MobileMenu />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/menu' element={<MenuPage />}>
          <Route path=':id' element={<MenuPage />} />
        </Route>
        <Route path='/product/:id' element={<ProductPage />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/order' element={<Order />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/offero' element={<Offero />} />
        <Route path='/payment-and-delivery' element={<PaymentAndDelivery />} />
        <Route path='/profile'>
          <Route index element={<Profile />} />
          <Route path=':item' element={<Profile />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </React.Fragment>
  );
});

export default App;
