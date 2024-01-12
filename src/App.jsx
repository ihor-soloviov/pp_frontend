//Import React
import React, { useEffect, useState } from "react";

//Import Routing
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

//Import Redux
import { useDispatch, useSelector } from "react-redux";

import modalsStore from "./store/modal-store";
import userStore from "./store/user-store";
import shoppingCartStore from "./store/shoping-cart-store";

//Import pages
import Profile from "./Pages/Profile/Profile";
import ProductPage from "./Pages/ProductPage/ProductPage";

//Import components
import Header from "./components/Header/Header";
import Popup from "./components/Popup/Popup";

//Import Firebase
import { firebaseConfig } from "./firebaseConfig";
import firebase from "firebase/compat/app";

import {
  loadFromLocalStorage,
  loadFromLocalStorageAdress,
  updateCity,
  userLogin,
  userLogout,
} from "./store/userSlice";

import AboutUs from "./Pages/AboutUs/AboutUs";
import Order from "./Pages/Order/Order";

import Footer from "./components/Footer/Footer";
import SelectCity from "./components/SelectCity/SelectCity";
import { cityModalUpdateState } from "./store/modalsSlice";
import PopupActions from "./components/PopupActions/PopupActions";
import Main from "./Pages/Main/Main";
import MenuPage from "./Pages/MenuPage/MenuPage";

import Contact from "./Pages/Contact/Contact";
import { getFromLocalStorage } from "./store/shoppingCartSlice";
import Loader from "./components/Loader/Loader";

import TagManager from "react-gtm-module";
import PaymentAndDelivery from "./Pages/PaymentAndDelivery/PaymentAndDelivery";
import { observer } from "mobx-react-lite";

const tagManagerArgs = {
  gtmId: "GTM-5CBQPKC",
};

TagManager.initialize(tagManagerArgs);

firebase.initializeApp(firebaseConfig);

const App = observer(() => {
  //State

  const {
    updateCity,
    loadFromLocalStorageAdress,
    loadFromLocalStorage,
    userLogout,
  } = userStore;
  const { authModal, cityModal, thanksModal, cityModalHandler } = modalsStore;
  const { getFromLocalStorage } = shoppingCartStore;

  const modals = useSelector((state) => state.modals);
  const user = useSelector((state) => state.user);
  const [isLoader, setIsLoader] = useState(false);
  //Usestate
  const [showHeader, setShowHeader] = useState(true);

  //Tools
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const action = useSelector((state) => state.popupActions.currentAction);

  const loadUserDataFromLocalStorage = () => {
    const data = localStorage.getItem("userData");
    const dataParse = JSON.parse(data);

    if (data) {
      getFromLocalStorage();

      if (dataParse.isAuthenticated === true) {
        updateCity(dataParse.city);
        userLogin(dataParse);
      }
    }
  };

  useEffect(() => {
    loadUserDataFromLocalStorage();
    loadFromLocalStorage();
    loadFromLocalStorageAdress();
  }, []);

  useEffect(() => {
    const favoritProducts = localStorage.getItem("favoritProducts");
    const dataParse = JSON.parse(favoritProducts);

    if (dataParse) {
      loadFromLocalStorage();
    }
  }, [user.isAuthenticated]);

  useEffect(() => {
    if (location.pathname === "/profile/signout") {
      userLogout();
      navigate("/");
    }
  }, [location.pathname]);

  useEffect(() => {
    // Функція яка скриває хедер в профілі на мобілках та таблетах
    const handleWindowResize = () => {
      const maxWidth = 768;
      const isProfileItemPage = location.pathname.includes("/profile");

      if (window.innerWidth <= maxWidth && isProfileItemPage) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
    };

    handleWindowResize(); // Check initial state

    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [location]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoader(true);
    setTimeout(() => {
      setIsLoader(false);
    }, 1500);
  }, [location]);

  const cta = (state) => {
    if (state === "addToCard") {
      return <PopupActions action={"Блюдо додано у кошик"} />;
    }
    if (state === "addToFavorit") {
      return <PopupActions action={"Блюдо додано в «Улюблене»"} />;
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
        <Popup small={true} closeModal={() => cityModalHandler(false)}>
          <SelectCity />
        </Popup>
      )}

      {showHeader && <Header />}

      {isLoader && (
        <div className="loader__wrapper">
          <Loader />
        </div>
      )}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/menu" element={<MenuPage />}>
          <Route path=":id" element={<MenuPage />} />
        </Route>
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/order" element={<Order />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/payment-and-delivery" element={<PaymentAndDelivery />} />
        <Route path="/profile">
          <Route index element={<Profile />} />
          <Route path=":item" element={<Profile />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
});

export default App;
