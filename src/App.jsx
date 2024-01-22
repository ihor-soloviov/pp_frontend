/* eslint-disable react-hooks/exhaustive-deps */
//Import React
import React, { useCallback, useEffect, useState } from "react";

//Import Routing
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

//Import MOBX
import { observer } from "mobx-react-lite";
import modalsStore from "./store/modal-store";
import userStore from "./store/user-store";
import shoppingCartStore from "./store/shoping-cart-store";
import popupActionsStore from "./store/popup-action-store";

//Import pages
import Profile from "./Pages/Profile/Profile";
import ProductPage from "./Pages/ProductPage/ProductPage";
import AboutUs from "./Pages/AboutUs/AboutUs";
import Order from "./Pages/Order/Order";
import Main from "./Pages/Main/Main";
import MenuPage from "./Pages/MenuPage/MenuPage";
import Contact from "./Pages/Contact/Contact";

//Import components
import Header from "./components/Header/Header";
import Popup from "./components/Popup/Popup";
import Footer from "./components/Footer/Footer";
import SelectCity from "./components/SelectCity/SelectCity";
import PopupActions from "./components/PopupActions/PopupActions";
import Loader from "./components/Loader/Loader";

//Import Utils
import TagManager from "react-gtm-module";
import PaymentAndDelivery from "./Pages/PaymentAndDelivery/PaymentAndDelivery";
import Offero from "./Pages/Offero/Offero";

const tagManagerArgs = {
  gtmId: "GTM-5CBQPKC",
};

TagManager.initialize(tagManagerArgs);

const App = observer(() => {
  //Store
  const {
    city,
    loadFromLocalStorageAdress,
    getFavoritesFromLS,
    userLogout,
    setUserDataToStore,
  } = userStore;

  const { cityModal, cityModalHandler } = modalsStore;
  const { getCartProductsFromLS } = shoppingCartStore;
  const { currentAction } = popupActionsStore;

  //Usestate
  const [isLoader, setIsLoader] = useState(false);
  const [showHeader, setShowHeader] = useState(true);

  //Tools
  const location = useLocation();
  const navigate = useNavigate();

  const loadUserDataFromLocalStorage = useCallback(() => {
    const userData = localStorage.getItem("userData");
    const dataParse = JSON.parse(userData);

    if (!userData) {
      return;
    }

    getCartProductsFromLS();

    if (dataParse.isAuthenticated === true) {
      setUserDataToStore(dataParse);
    }
  }, [getCartProductsFromLS, setUserDataToStore]);

  useEffect(() => {
    loadUserDataFromLocalStorage();
    getFavoritesFromLS();
    loadFromLocalStorageAdress();
  }, []);

  const cta = useCallback(() => {
    if (currentAction === "addToCard") {
      return <PopupActions action={"Блюдо додано у кошик"} />;
    }
    if (currentAction === "addToFavorit") {
      return <PopupActions action={"Блюдо додано в «Улюблене»"} />;
    } else {
      return null;
    }
  }, [currentAction]);

  useEffect(() => {
    if (location.pathname === "/profile/signout") {
      userLogout();
      navigate("/");
    }
  }, [location.pathname, userLogout, navigate]);

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

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  //   setIsLoader(true);
  //   setTimeout(() => {
  //     setIsLoader(false);
  //   }, 1500);
  // }, [location]);

  useEffect(() => {
    if (city !== null) {
      cityModalHandler(false);
    } else {
      cityModalHandler(true);
    }
  }, [city, cityModalHandler]);

  return (
    <React.Fragment>
      {cta()}

      {cityModal && (
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
        <Route path="/offero" element={<Offero />} />
        <Route path="/payment-and-delivery" element={<PaymentAndDelivery />} />
        <Route path="/profile">
          <Route index element={<Profile />} />
          <Route path=":item" element={<Profile />} />
        </Route>
      </Routes>
      <Footer />
    </React.Fragment>
  );
});

export default App;
