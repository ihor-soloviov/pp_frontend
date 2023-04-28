//Import Reacr
import React from 'react';

//Import components
import Header from './components/Header/Header';
import Popup from './components/Popup/Popup';

//Import Reset Styles
import './reset.scss';
import SingUp from './components/SIngUp/SingUp';

//Import Firebase
import { firebaseConfig } from './firebaseConfig';
import firebase from 'firebase/compat/app';
firebase.initializeApp(firebaseConfig);

const App = () => {
  return (
    <>
      <Header />
      <Popup>
        <SingUp />
      </Popup>
    </>
  );
};

export default App;
