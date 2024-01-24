import axios from "axios";
import { url } from "../api";
import userStore from "../store/user-store";
import { auth } from "../firebaseConfig";
import {
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithCredential,
  signInWithPhoneNumber,
} from "firebase/auth";



const { setUserDataToStore } = userStore;

const setUpRecaptcha = () => {
  window.recaptchaVerifier = new RecaptchaVerifier(
    "recaptcha-container",
    {
      size: "invisible"
    }, auth
  );
};

const onSendOtp = async (phoneNumber, setVerifId, setStep) => {
  // Ensure that the phone number is valid before sending OTP
  if (!phoneNumber) {
    console.error("Invalid phone number");
    return;
  }

  if (!window.recaptchaVerifier) {
    setUpRecaptcha();
  }

  try {
    const result = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      window.recaptchaVerifier
    );
    console.log(result.verificationId)
    console.log("OTP sent successfully");
    setVerifId(result.verificationId);
    setStep("STEP_02")
  } catch (error) {
    console.error("Error sending OTP:", error);
  }
};

const authentication = (
  accessToken,
  authModalHandler,
  navigate,
  setStep
) => {
  const data = {
    token: accessToken,
  };

  console.log("AUTH TOKEN in AUTH:", data);
  const tokenJSON = JSON.stringify(data);
  console.log("tokenJSON:", tokenJSON);
  axios
    .post(`${url}/api/auth`, tokenJSON, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log(response);
      if (response.status === 200) {
        setUserDataToStore({
          name: response.data.name,
          phone: response.data.phone,
          email: response.data.email,
          token: response.data.token,
          promocode40: response.data.promocode40,
          favorites: response.data.favorites,
          addresses: response.data.addresses,
          dateOfBirth: response.data.dateOfBirth,
        });
        authModalHandler(false);
        navigate("/profile/info");
      }
    })
    .catch((error) => {
      console.error(error);
      setStep("STEP_03");
      // registration(accessToken);
    });
};

const registration = (
  userName,
  userEmail,
  token,
  phoneNumber,
  authModalHandler,
  navigate
) => {
  const userData = {
    name: userName,
    email: userEmail,
    token: token,
    phone: phoneNumber,
  };

  const userDataJSON = JSON.stringify(userData);
  console.log(userDataJSON);

  axios
    .post(`${url}/api/registrate`, userDataJSON, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      const data = response.data;

      if (response.status === 200) {
        console.log(data);
        console.log("user data", {
          name: userName,
          phone: phoneNumber,
          email: userEmail,
          token: token,
        });
        setUserDataToStore({
          name: userName,
          phone: phoneNumber,
          email: userEmail,
          token: token,
          promocode40: data.promocode40,
          dateOfBirth: data.date_of_birth
        });
        authModalHandler(false);
        navigate("/profile/info");
      }
    })
    .catch((err) => console.error(err));
};

export { setUpRecaptcha, onSendOtp, registration, authentication }