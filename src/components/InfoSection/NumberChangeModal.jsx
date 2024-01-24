import React, { useEffect, useState } from "react";

import InputNumber from "../Inputs/InputNumber";
import Popup from "../Popup/Popup";
import BtnMain from "../Buttons/BtnMain";
import { observer } from "mobx-react-lite";
import userStore from "../../store/user-store";
import { setUpRecaptcha, onSetNewPhone, onVerifNewNumber } from "../../utils/firebase";
import InputCode from "../Inputs/InputCode";

const NumberChangeModal = observer(({ setIsNumberChanging }) => {
  const [step, setStep] = useState("STEP_01")
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verifId, setVerifId] = useState("")
  const [verificationCode, setVerificationCode] = useState("")


  const { phone, token } = userStore;

  useEffect(() => {
    setUpRecaptcha();

  }, [phone]);

  const steps = () => {
    if (step === "STEP_01") {
      return (
        <React.Fragment>
          <div className="singup__description">
            <h3 className="singup__title">Змінити номер</h3>
            <p className="singup__text">Вкажіть свій новий номер телефону</p>
          </div>
          <InputNumber onChange={(value) => setPhoneNumber(value)} />

          <BtnMain name={"Продовжити"} onClick={() => onSetNewPhone(phoneNumber, setVerifId, setStep)} />
        </React.Fragment>
      );
    }

    if (step === "STEP_02") {
      return (
        <React.Fragment>
          <div className="singup__description">
            <h3 className="singup__title">Підтвердження нового номеру</h3>
            <p className="singup__text">
              Введіть код підтвердження, який ми відправили на {phoneNumber}{" "}
              <span
                className="singup__text singup__text-action"
                onClick={() => setStep("STEP_01")}
              >
                Змінити
              </span>
            </p>
          </div>
          <form className="singup__form">
            <InputCode onData={(data) => setVerificationCode(data)} />
          </form>

          <BtnMain
            name={"Продовжити"}
            onClick={() => onVerifNewNumber(verifId, verificationCode, setIsNumberChanging, phoneNumber, token)}
          />
        </React.Fragment>
      );
    }
  };

  return (
    <Popup closeModal={() => setIsNumberChanging(false)}>
      <div className="singup">
        <div id="recaptcha-container" />
        <div className="singup__content">{steps()}</div>
      </div>
    </Popup>
  );
});

export default NumberChangeModal;
