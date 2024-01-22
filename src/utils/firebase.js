import axios from "axios";
import { url } from "../api";

import userStore from "../store/user-store";

const { setUserDataToStore } = userStore;

export const authentication = (
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

export const registration = (
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
        });
        authModalHandler(false);
        navigate("/profile/info");
      }
    })
    .catch((err) => console.error(err));
};
