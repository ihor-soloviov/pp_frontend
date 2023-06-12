//Import React
import React, { useEffect, useState } from "react";

//Import Routing
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

//Import Redux
import { useDispatch, useSelector } from "react-redux";

//Import pages
import Profile from "./Pages/Profile/Profile";
import Menu from "./Pages/Menu";
import ProductPage from "./Pages/ProductPage/ProductPage";

//Import components
import Header from "./components/Header/Header";
import Popup from "./components/Popup/Popup";

import SingUp from "./components/SingUp/SingUp";

//Import Firebase
import { firebaseConfig } from "./firebaseConfig";
import firebase from "firebase/compat/app";

import { userLogin, userLogout } from "./store/userSlice";
import AboutUs from "./Pages/AboutUs/AboutUs";
import Order from "./Pages/Order/Order";
import Footer from "./components/Footer/Footer";
import SelectCity from "./components/SelectCity/SelectCity";
import { cityModalUpdateState } from "./store/modalsSlice";

firebase.initializeApp(firebaseConfig);

const App = () => {
  const [showHeader, setShowHeader] = useState(true);
  const city = useSelector((state) => state.modals.cityModal);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const loadUserDataFromLocalStorage = () => {
    const data = localStorage.getItem("userData");
    if (data) {
      const dataParse = JSON.parse(data);
      dispatch(userLogin(dataParse));
    }
  };

  useEffect(() => {
    loadUserDataFromLocalStorage();
  }, []);

  useEffect(() => {
    if (location.pathname === "/profile/signout") {
      dispatch(userLogout());
      navigate("/");
    }
  }, [location]);

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

  return (
    <>
      {city && (
        <Popup
          small={true}
          closeModal={() => dispatch(cityModalUpdateState({ isOpen: false }))}
        >
          <SelectCity />
        </Popup>
      )}

      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/menu/:id" element={<Menu />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/order" element={<Order />} />

        <Route path="/profile">
          <Route index element={<Profile />} />
          <Route path=":item" element={<Profile />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default App;
