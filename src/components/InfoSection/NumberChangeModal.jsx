import React, { useState } from "react";

import firebase from "firebase/compat/app";

import InputNumber from "../Inputs/InputNumber";
import Popup from "../Popup/Popup";
import BtnMain from "../Buttons/BtnMain";
import { observer } from "mobx-react-lite";
import userStore from "../../store/user-store";
import firebaseStore from "../../store/firebase-store";

const NumberChangeModal = observer(({ setIsNumberChanging }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  // const [verificationCode, setVerificationCode] = useState("");

  const { token, phone } = userStore;
  const { app } = firebaseStore;

  // const sendVerificationCode = async () => {
  //   const appVerifier = new firebase.auth.RecaptchaVerifier(
  //     "recaptcha-container",
  //     {
  //       size: "invisible",
  //     }
  //   );
  //   await firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier);
  //   // Показати поле для вводу коду підтвердження
  // };

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

  async function save(phoneNumber) {
    const { currentUser } = firebase.auth();
    if (currentUser && currentUser.phoneNumber !== phoneNumber) {
      try {
        const verifier = new firebase.auth.RecaptchaVerifier(
          "recaptcha-container",
          {
            callback: (response) => console.log("callback", response),
            size: "invisible",
          }
        );
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        const id = await phoneProvider.verifyPhoneNumber(phoneNumber, verifier);
        const code = window.prompt("Bitte zugeschickten Code eingeben");
        const cred = firebase.auth.PhoneAuthProvider.credential(id, code);
        await currentUser.updatePhoneNumber(cred);
        console.log("phone number changed", id, cred, currentUser);
      } catch (e) {
        console.error(e);
      }
    } else {
      console.log(currentUser);
    }
  }

  return (
    <Popup closeModal={() => setIsNumberChanging(false)}>
      <div className="singup">
        <div id="recaptcha-container"></div>
        <div className="singup__description">
          <h3 className="singup__title">Змінити номер</h3>
          <p className="singup__text">Вкажіть свій новий номер телефону</p>
        </div>
        <InputNumber onChange={(value) => setPhoneNumber(value)} />

        <BtnMain name={"Продовжити"} onClick={save} />
      </div>
    </Popup>
  );
});

export default NumberChangeModal;
