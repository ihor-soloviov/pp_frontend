import axios from "axios";
import { url } from "../api";

export const deleteAddress = async (token, adress, setIsAdressesUpdating) => {
  try {
    const JSONrequest = JSON.stringify({
      token: token,
      data: adress,
    });
    await axios.post(`${url}/api/deleteAddress`, JSONrequest, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
    setIsAdressesUpdating(true);
  } catch (error) {
    console.log(error);
  }
};
