//Import React
import React, { useEffect, useState } from 'react';

//Impor Route
import { useNavigate } from 'react-router-dom';

//Import Redux
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../store/userSlice';

//Import Components
import InputNumber from '../Inputs/InputNumber';
import InputCode from '../Inputs/InputCode';
import BtnMain from '../Buttons/BtnMain';

//Import Style
import './singup.scss';

//Import Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import InputText from '../Inputs/InputText';

//Import API
import axios from 'axios';
import { url } from '../../api';

const SingUp = () => {
  //Tools
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user);
  useEffect(() => {
    console.log(userData);
  }, [userData]);

  //User data state
  const [step, setStep] = useState('STEP_01');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [token, setToken] = useState('');
  //Auth
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [verificationCode, setVerificationCode] = useState('');

  //Next step
  const [btnNext, setBtnNext] = useState(true);

  //STEP 01 Validation
  useEffect(() => {
    const cleaned = phoneNumber.replace(/\s|[()]/g, '');
    console.log(cleaned);

    if (!cleaned.includes('_')) {
      setBtnNext(false);
    } else {
      setBtnNext(true);
    }
    setPhoneNumber(cleaned);
  }, [phoneNumber]);

  const handlePhoneNumberSubmit = (event) => {
    const appVerifier = new firebase.auth.RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
        callback: () => {
          // reCAPTCHA solved, continue with phone authentication
        },
      }
    );

    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        setStep('STEP_02');
        setConfirmationResult(confirmationResult);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //STEP 02 Validation
  useEffect(() => {
    if (step === 'STEP_02') {
      setBtnNext(true);
      if (verificationCode.length === 6) {
        setBtnNext(false);
      } else {
        setBtnNext(true);
      }
    }
  }, [verificationCode, step]);

  //STEP 02 Validation
  useEffect(() => {
    if (step === 'STEP_03') {
      setBtnNext(true);
      if (verificationCode.length === 6) {
        setBtnNext(false);
      } else {
        setBtnNext(true);
      }
    }
  }, [verificationCode, step]);

  const handleVerificationCodeSubmit = () => {
    confirmationResult
      .confirm(verificationCode)
      .then((result) => {
        console.log('handleVerificationCodeSubmit:', result);
        const token = result.user.multiFactor.user.accessToken;
        setToken(token.slice(0, 40));
        setStep('STEP_03');
      })
      .catch((error) => {
        console.error('ERROR:', error);
      });
  };

  const registration = () => {
    const userData = {
      name: userName,
      email: userEmail,
      token: token,
      phone: phoneNumber,
    };

    const userDataJSON = JSON.stringify(userData);
    console.log(userDataJSON);
    axios
      .post(`${url}/api/registrate`, userDataJSON)
      .then((response) => {
        const data = response.data;
        if (response.status === 200) {
          console.log(data);
          dispatch(
            userLogin({
              name: userName,
              phone: phoneNumber,
              email: userEmail,
              token: token,
            })
          );
          navigate('/profile/info')
        }
      })
      .catch((err) => console.error(err));
  }; 

  //STEP 03 Validation
  useEffect(() => {
    if (step === 'STEP_03') {
      setBtnNext(true);
      if (userName !== '' && userEmail !== '') {
        setBtnNext(false);
      } else {
        setBtnNext(true);
      }
    }
  }, [step, userName, userEmail]);

  const steps = () => {
    if (step === 'STEP_01') {
      return (
        <>
          <div className='singup__description'>
            <h3 className='singup__title'>Вхід на сайт</h3>
            <p className='singup__text'>
              Вкажіть свій номер телефону, щоб отримати доступ до бонусної
              системи та збереженим адресам доставки
            </p>
          </div>
          <InputNumber onChange={(value) => setPhoneNumber(value)} />

          <BtnMain
            name={'Продовжити'}
            disabled={btnNext}
            onClick={handlePhoneNumberSubmit}
          />
        </>
      );
    }

    if (step === 'STEP_02') {
      return (
        <>
          <div className='singup__description'>
            <h3 className='singup__title'>Вхід на сайт</h3>
            <p className='singup__text'>
              Введіть код підтвердження, який ми відправили на {phoneNumber}{' '}
              <span
                className='singup__text singup__text-action'
                onClick={() => setStep('STEP_01')}
              >
                Змінити
              </span>
            </p>
          </div>
          <form className='singup__form'>
            <InputCode onData={(data) => setVerificationCode(data)} />
          </form>

          <BtnMain
            name={'Продовжити'}
            disabled={btnNext}
            onClick={handleVerificationCodeSubmit}
          />
        </>
      );
    }

    if (step === 'STEP_03') {
      return (
        <>
          <div className='singup__description'>
            <h3 className='singup__title'>Реєстрація</h3>
            <p className='singup__text'>Будь ласка, введіть свої дані</p>
          </div>
          <form className='singup__form'>
            <InputText
              name={`Ім’я`}
              placeholder={`Ім’я`}
              onChange={(value) => setUserName(value)}
            />
            <InputText
              name={`Пошта`}
              placeholder={`xxx@gmail.com`}
              onChange={(value) => setUserEmail(value)}
            />
          </form>
          <BtnMain
            name={'Зареєструватися'}
            disabled={btnNext}
            onClick={() => registration()}
          />
        </>
      );
    }
  };

  return (
    <div className='singup'>
      <div id='recaptcha-container'></div>
      <div className='singup__content'>{steps()}</div>
    </div>
  );
};

export default SingUp;
