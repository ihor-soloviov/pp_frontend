//Import React
import React, { useEffect, useState } from "react";

//Impor Route
import { useNavigate } from "react-router-dom";

//Import Mobx
import { observer } from "mobx-react-lite";
import modalsStore from "../../store/modal-store";
import { onSendOtp, onVerify, registration, setUpRecaptcha } from "../../utils/firebase";

//Import Components
import InputText from "../Inputs/InputText";
import InputNumber from "../Inputs/InputNumber";
import InputCode from "../Inputs/InputCode";
import BtnMain from "../Buttons/BtnMain";

//Import Style
import "./singup.scss";

const SignUp = observer(() => {
  //Tools
  const { authModalHandler } = modalsStore;
  const navigate = useNavigate();

  //User data state
  const [step, setStep] = useState("STEP_01");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [token, setToken] = useState("");

  //Auth
  const [verificationCode, setVerificationCode] = useState("");
  const [verifId, setVerifId] = useState("")

  //Next step
  const [btnNext, setBtnNext] = useState(true);
  const [isButtonLoading, setIsButtonLoading] = useState(false)

  useEffect(() => {
    setUpRecaptcha()
  }, [])

  const stepButtonHandler = () => {
    if (step === "STEP_01") {
      setIsButtonLoading(true)
      onSendOtp(phoneNumber, setVerifId, setStep)
    } else if (step === 'STEP_02') {
      setIsButtonLoading(true)
      onVerify(verifId, verificationCode, setStep, setToken, navigate, authModalHandler)
    } else {
      setIsButtonLoading(true)
      registration(
        userName,
        userEmail,
        token,
        phoneNumber,
        navigate,
        authModalHandler
      )
    }
  }

  //STEP 01 Validation
  useEffect(() => {
    const cleaned = phoneNumber.replace(/\s|[()]/g, "");

    if (!cleaned.includes("_")) {
      setBtnNext(false);
    } else {
      setBtnNext(true);
    }
    setPhoneNumber(cleaned);
  }, [phoneNumber]);

  //STEP 02 Validation
  useEffect(() => {
    if (step === "STEP_02") {
      setIsButtonLoading(false)
      setBtnNext(true);
      if (verificationCode.length === 6) {
        setBtnNext(false);
      } else {
        setBtnNext(true);
      }
    }
  }, [verificationCode, step]);

  //STEP 03 Validation
  useEffect(() => {
    if (step === "STEP_03") {
      setIsButtonLoading(false)
      setBtnNext(true);
      if (userName !== "" && userEmail !== "") {
        setBtnNext(false);
      } else {
        setBtnNext(true);
      }
    }
  }, [step, userName, userEmail]);

  const steps = () => {
    if (step === "STEP_01") {
      return (
        <React.Fragment>
          <div className="singup__description">
            <h3 className="singup__title">Вхід на сайт</h3>
            <p className="singup__text">
              Вкажіть свій номер телефону, щоб отримати доступ до бонусної
              системи та збереженим адресам доставки
            </p>
          </div>
          <InputNumber onChange={(value) => setPhoneNumber(value)} />

          <BtnMain
            disabled={btnNext}
            onClick={stepButtonHandler}
          >
            {isButtonLoading ? <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div> : "Продовжити"}
          </BtnMain>
          <div className="loader"></div>
        </React.Fragment>
      );
    }

    if (step === "STEP_02") {
      return (
        <React.Fragment>
          <div className="singup__description">
            <h3 className="singup__title">Вхід на сайт</h3>
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
            disabled={btnNext}
            onClick={stepButtonHandler}
          >
            {isButtonLoading ? <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div> : "Продовжити"}
          </BtnMain>
        </React.Fragment>
      );
    }

    if (step === "STEP_03") {
      return (
        <React.Fragment>
          <div className="singup__description">
            <h3 className="singup__title">Реєстрація</h3>
            <p className="singup__text">Будь ласка, введіть свої дані</p>
          </div>
          <form className="singup__form">
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
            disabled={btnNext}
            onClick={stepButtonHandler}
          >
            {isButtonLoading ? <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div> : "Продовжити"}
          </BtnMain>
        </React.Fragment>
      );
    }
  };

  return (
    <div className="singup">
      <div id="recaptcha-container"></div>
      <div className="singup__content">{steps()}</div>
    </div>
  );
});

export default SignUp;
