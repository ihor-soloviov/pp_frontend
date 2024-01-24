import React, { useEffect, useState } from "react";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import InputNumber from "../Inputs/InputNumber";
import Popup from "../Popup/Popup";
import BtnMain from "../Buttons/BtnMain";
import { observer } from "mobx-react-lite";
import userStore from "../../store/user-store";

const NumberChangeModal = observer(({ setIsNumberChanging }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);

  const { token, phone } = userStore;

  useEffect(() => {
    // Переконайтесь, що елемент 'recaptcha-container' існує в DOM
    if (document.getElementById('recaptcha-container')) {
      const verifier = new firebase.auth.RecaptchaVerifier("recaptcha-container", {
        size: "invisible",
      });
      verifier.render().then(() => {
        setRecaptchaVerifier(verifier);
      });
    }
  }, []);


  const sendVerificationCode = async (phoneNumber, recaptchaVerifier) => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    return phoneProvider.verifyPhoneNumber(phoneNumber, recaptchaVerifier);
  };

  const handlePhoneNumberSubmit = async () => {
    if (!recaptchaVerifier) {
      console.error('RecaptchaVerifier is not initialized');
      return;
    }
    try {
      const result = await firebase.auth().signInWithPhoneNumber(phoneNumber, recaptchaVerifier);
      setConfirmationResult(result);
    } catch (error) {
      console.error('Error during phone number submission:', error);
    }
  };

  const handleVerificationCodeSubmit = async () => {
    try {
      if (!confirmationResult)
        throw new Error("No confirmationResult available");
      const result = await confirmationResult.confirm(verificationCode);
      console.log("Phone number is verified, user:", result.user);
      // Additional actions after phone number verification
    } catch (error) {
      console.error("Error during verification code submission:", error);
    }
  };

  // const handlePhoneNumberChange = async () => {
  //   try {
  //     const user = firebase.auth().currentUser;
  //     if (!user) {
  //       alert("Користувач не авторизований");
  //       return;
  //     }

  //     if (!verificationCode) {
  //       alert("Будь ласка, введіть код підтвердження");
  //       return;
  //     }

  //     // Створення об'єкта credential
  //     const credential = firebase.auth.PhoneAuthProvider.credential(
  //       userStore.confirmationResult.verificationId,
  //       verificationCode
  //     );

  //     // Оновлення номеру телефону
  //     await user.updatePhoneNumber(credential);

  //     alert("Номер телефону успішно змінено");
  //   } catch (error) {
  //     console.error("Помилка при зміні номеру телефону: ", error);
  //     alert("Помилка при зміні номеру телефону");
  //   }
  // };

  // async function save(phoneNumber) {
  //   const { currentUser } = firebase.auth();
  //   if (currentUser && currentUser.phoneNumber !== phoneNumber) {
  //     try {
  //       const verifier = new firebase.auth.RecaptchaVerifier(
  //         "recaptcha-container",
  //         {
  //           callback: (response) => console.log("callback", response),
  //           size: "invisible",
  //         }
  //       );
  //       const phoneProvider = new firebase.auth.PhoneAuthProvider();
  //       const id = await phoneProvider.verifyPhoneNumber(phoneNumber, verifier);
  //       const code = window.prompt("Bitte zugeschickten Code eingeben");
  //       const cred = firebase.auth.PhoneAuthProvider.credential(id, code);
  //       await currentUser.updatePhoneNumber(cred);
  //       console.log("phone number changed", id, cred, currentUser);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   } else {
  //     console.log(currentUser);
  //   }
  // }

  return (
    <Popup closeModal={() => setIsNumberChanging(false)}>
      <div className="singup">
        <div id="recaptcha-container" />
        <div className="singup__description">
          <h3 className="singup__title">Змінити номер</h3>
          <p className="singup__text">Вкажіть свій новий номер телефону</p>
        </div>
        <InputNumber onChange={(value) => setPhoneNumber(value)} />

        <BtnMain name={"Продовжити"} onClick={sendVerificationCode} />
      </div>
    </Popup>
  );
});

export default NumberChangeModal;
