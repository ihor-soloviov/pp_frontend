import axios from "axios";
import { url } from "../api";
import userStore from "../store/user-store";
import { auth } from "../firebaseConfig";
import {
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithCredential,
  signInWithPhoneNumber,
  updatePhoneNumber,
} from "firebase/auth";

const { setUserDataToStore, changePhoneNumber } = userStore;

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
    console.log(result)
    console.log("OTP sent successfully");
    setVerifId(result.verificationId);
    setStep("STEP_02")
  } catch (error) {
    console.error("Error sending OTP:", error);
  }
};

const onVerify = async (verifId, verificationCode, setStep, setToken, navigate, authModalHandler) => {
  if (!verifId || !verificationCode) {
    console.error("Invalid verification ID or OTP");
    return;
  }

  try {
    const credential = PhoneAuthProvider.credential(verifId, verificationCode);
    const userCredentials = await signInWithCredential(auth, credential);
    console.log("Successfully signed in with OTP", userCredentials);

    const accessToken = userCredentials.user.uid;
    console.log(accessToken)

    setToken(accessToken);
    authentication(accessToken, navigate, setStep, authModalHandler);

  } catch (error) {
    console.error("Error signing in with OTP:", error);
    setStep("STEP_03")
  }
};

const onSetNewPhone = async (phoneNumber, setVerifId, setStep) => {
  if (!phoneNumber) {
    console.error("Invalid phone number");
    return
  }

  if (!window.recaptchaVerifier) {
    setUpRecaptcha();
  }

  try {
    const provider = new PhoneAuthProvider(auth);
    const verificationId = await provider.verifyPhoneNumber(phoneNumber, window.recaptchaVerifier);
    if (verificationId) {
      setVerifId(verificationId)
      setStep("STEP_02")
    }

  } catch (error) {
    console.log(error);
  }
}

const onVerifNewNumber = async (verificationId, verificationCode, setIsNumberChanging, phoneNumber, token) => {
  const user = auth.currentUser;
  const formatedPhone = phoneNumber.replace(/[\s()]/g, '');

  if (!user) {
    console.log("шото нахуй не так")
  }

  try {
    const phoneCredential = PhoneAuthProvider.credential(verificationId, verificationCode);
    await updatePhoneNumber(user, phoneCredential);

    changePhoneNumber(phoneNumber)

    try {
      const response = await axios.put(`${url}/api/updatePhone`, { token: token, phone: formatedPhone })
      console.log(response)
    } catch (error) {
      console.log(error)
    }


    setIsNumberChanging(false)
  } catch (error) {
    console.error(error)
  }

}

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

export { setUpRecaptcha, onSendOtp, onVerify, registration, authentication, onSetNewPhone, onVerifNewNumber }