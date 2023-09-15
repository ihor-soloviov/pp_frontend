import axios from "axios";
import { url } from "../api";

export const sendFavsToServer = async (token, favoritList) => {
  try {
    const link = url + "/api/updateFavorites";
    const JSONdata = JSON.stringify({ token, favorites: favoritList });
    const response = await axios.post(link, JSONdata, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });

    console.log(response);
  } catch (error) {
    console.log(error);
  }
};