//Import React
import React, { useEffect, useState } from 'react';

//Import Routing
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

//Import Redux
import { useDispatch, useSelector } from 'react-redux';

//Import pages
import Profile from './Pages/Profile/Profile';
import Menu from './Pages/Menu';
import ProductPage from './Pages/ProductPage/ProductPage';

//Import components
import Header from './components/Header/Header';
import Popup from './components/Popup/Popup';

import SingUp from './components/SingUp/SingUp';

//Import Firebase
import { firebaseConfig } from './firebaseConfig';
import firebase from 'firebase/compat/app';

import {
  loadFromLocalStorage,
  updateCity,
  userLogin,
  userLogout,
} from './store/userSlice';
import AboutUs from './Pages/AboutUs/AboutUs';
import Order from './Pages/Order/Order';
import Footer from './components/Footer/Footer';
import SelectCity from './components/SelectCity/SelectCity';
import {
  cityModalUpdateState,
  thanksModalUpdateState,
} from './store/modalsSlice';
import PopupActions from './components/PopupActions/PopupActions';
import Main from './Pages/Main/Main';
import MenuPage from './Pages/MenuPage/MenuPage';

import Thanks from './components/Thanks/Thanks';
import Contact from './Pages/Contact/Contact';
import { getFromLocalStorage } from './store/shoppingCartSlice';

firebase.initializeApp(firebaseConfig);

const App = () => {
  //State

  const modals = useSelector((state) => state.modals);
  const user = useSelector((state) => state.user);

  //Usestate
  const [showHeader, setShowHeader] = useState(true);

  //Tools
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const loadUserDataFromLocalStorage = () => {
    const data = localStorage.getItem('userData');
    const dataParse = JSON.parse(data);
    dispatch(getFromLocalStorage());
    if (data) {
      // dispatch(updateCity({ city: dataParse.city }));

      if (dataParse.isAuthenticated === true) {
        dispatch(updateCity({ city: dataParse.city }));
        dispatch(userLogin(dataParse));
      }
    }
  };

  useEffect(() => {
    loadUserDataFromLocalStorage();
  }, []);

  useEffect(() => {
    const favoritProducts = localStorage.getItem('favoritProducts');
    const dataParse = JSON.parse(favoritProducts);
    console.log('dataParse', dataParse);
    if (dataParse) {
      dispatch(loadFromLocalStorage());
    }
  }, [user.isAuthenticated]);

  useEffect(() => {
    if (location.pathname === '/profile/signout') {
      dispatch(userLogout());
      navigate('/');
    }
  }, [location]);

  useEffect(() => {
    // Функція яка скриває хедер в профілі на мобілках та таблетах
    const handleWindowResize = () => {
      const maxWidth = 768;
      const isProfileItemPage = location.pathname.includes('/profile');

      if (window.innerWidth <= maxWidth && isProfileItemPage) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
    };

    handleWindowResize(); // Check initial state

    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [location]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const action = useSelector((state) => state.popupActions.currentAction);
  const cta = (state) => {
    if (state === 'addToCard') {
      return <PopupActions action={'Блюдо додано у кошик'} />;
    }
    if (state === 'addToFavorit') {
      return <PopupActions action={'Блюдо додано в «Улюблене»'} />;
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (user.city !== null) {
      dispatch(cityModalUpdateState({ isOpen: false }));
    } else {
      dispatch(cityModalUpdateState({ isOpen: true }));
    }
  }, [user]);

  return (
    <>
      {cta(action)}

      {modals.cityModal && (
        <Popup
          small={true}
          closeModal={() => dispatch(cityModalUpdateState({ isOpen: false }))}
        >
          <SelectCity />
        </Popup>
      )}

      {showHeader && <Header />}
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/menu' element={<MenuPage />}>
          <Route path=':id' element={<MenuPage />} />
        </Route>
        <Route path='/product/:id' element={<ProductPage />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/order' element={<Order />} />
        <Route path='/contact' element={<Contact />} />

        <Route path='/profile'>
          <Route index element={<Profile />} />
          <Route path=':item' element={<Profile />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default App;
