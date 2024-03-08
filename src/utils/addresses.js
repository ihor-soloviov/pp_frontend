import axios from 'axios';
import { url } from '../api';
import { headers } from './menu';
export const deleteAddress = async (token, adress, setIsAdressesUpdating) => {
  try {
    const JSONrequest = JSON.stringify({
      token: token,
      data: adress,
    });

    await axios.post(`${url}/api/deleteAddress`, JSONrequest, {
      headers,
    });
    setIsAdressesUpdating((prev) => !prev);
  } catch (error) {
    console.log(error);
  }
};
export const updateAddress = async (token, adress) => {
  try {
    const JSONrequest = JSON.stringify({
      token: token,
      address: adress,
    });

    const response = await axios.patch(`${url}/api/updateAdress`, JSONrequest, {
      headers,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
