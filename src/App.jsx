//Import React
import React, { useEffect } from 'react';

//Import Routing
import { Routes, Route } from 'react-router-dom';

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
import { userLogin } from './store/userSlice';

firebase.initializeApp(firebaseConfig);

const App = () => {
  const dispatch = useDispatch();

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
