//Import React
import React, { useEffect, useState } from 'react';

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



const SingUp = () => {
  const [step, setStep] = useState('STEP_01');
  const [phoneNumber, setPhoneNumber] = useState('+380985299485');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [verificationCode, setVerificationCode] = useState('');

  useEffect(() => {
    const cleaned = phoneNumber.replace(/\s|[()]/g, '');
    console.log(cleaned);
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

  const handleVerificationCodeSubmit = () => {
    confirmationResult
      .confirm(verificationCode)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        error.log(error);
      });
  };

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
            disabled={false}
            onClick={handlePhoneNumberSubmit}
          />
        </>
      );
    }

    if (step === 'STEP_02') {
      return (
        <>
          <InputCode onData={(data) => setVerificationCode(data)} />

          <BtnMain
            name={'Продовжити'}
            disabled={false}
            onClick={handleVerificationCodeSubmit}
          />
        </>
      );
    }
    if (step === 'STEP_03') {
      return (
        <>
          <InputNumber onChange={(value) => setPhoneNumber(value)} />
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
