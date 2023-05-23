//Import React
import React, { useEffect } from 'react';

//Import Routing
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

//Import Redux
import { useDispatch } from 'react-redux';

//Import pages
import Menu from './Pages/Menu';

//Import components
import Header from './components/Header/Header';
import Popup from './components/Popup/Popup';

//Import Reset Styles
import './reset.scss';
import SingUp from './components/SingUp/SingUp';

//Import Firebase
import { firebaseConfig } from './firebaseConfig';
import firebase from 'firebase/compat/app';
import Profile from './Pages/Profile/Profile';
import { userLogin, userLogout } from './store/userSlice';

firebase.initializeApp(firebaseConfig);

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const loadUserDataFromLocalStorage = () => {
    const data = localStorage.getItem('userData');
    if (data) {
      const dataParse = JSON.parse(data);
      dispatch(userLogin(dataParse));
    }
  };
  useEffect(() => {
    loadUserDataFromLocalStorage();
  }, []);

  useEffect(() => {
    if (location.pathname === '/profile/signout') {
      dispatch(userLogout());
      navigate('/');
    }
  }, [location]);
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Menu />} />
        <Route path='/profile'>
          <Route index element={<Profile />} />
          <Route path=':item' element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;

<Popup>
  <SingUp />
</Popup>;
