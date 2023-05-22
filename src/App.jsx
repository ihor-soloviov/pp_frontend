//Import React
import React from 'react';

//Import Rounting
import { Routes, Route } from 'react-router-dom';
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


firebase.initializeApp(firebaseConfig);

const App = () => {
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
</Popup>

