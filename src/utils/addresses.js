import axios from 'axios';
import { url } from '../api';

export const deleteAddress = async (token, adress, setIsAdressesUpdating) => {
  try {
    const JSONrequest = JSON.stringify({
      token: token,
      data: adress,
    });

    await axios.post(`${url}/api/deleteAddress`, JSONrequest, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
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

    await axios.patch(`${url}/api/updateAdress`, JSONrequest, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.log(error);
  }
};
