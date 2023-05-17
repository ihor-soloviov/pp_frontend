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
import SingUp from './components/SIngUp/SingUp';

//Import Firebase
import { firebaseConfig } from './firebaseConfig';
import firebase from 'firebase/compat/app';
import Profile from './Pages/Profile/Profile';


firebase.initializeApp(firebaseConfig);

const App = () => {
  return (
    <>
      <Header />
      <Popup>
        <SingUp />
      </Popup>
      <Routes>
        <Route path='/' element={<Menu />} />
      </Routes>


    </>
  );
};

export default App;


// <>
// <Header />
// {/* <Popup>
//   <SingUp />
// </Popup> */}
// <Routes>
//   <Route path='/' element={<Menu />} />
// </Routes>


// </>