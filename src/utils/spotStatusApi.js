import axios from 'axios';

const baseUrl = process.env.REACT_APP_DEV_URL;

export const fetchAllSpotStatuses = async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/api/spots`);

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const fetchSpotStatusById = async (id) => {
  try {
    const { data } = await axios.get(`${baseUrl}/api/isOpen?id=${id}`);

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const fetchIsAnyOpenSpot = async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/api/isAnyOpen`);

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const openSpotStatusById = async (id) => {
  try {
    const { data } = await axios.patch(`${baseUrl}/api/openSpot?id=${id}`);

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const closeSpotStatusById = async (id) => {
  try {
    const { data } = await axios.patch(`${baseUrl}/api/closeSpot?id=${id}`);

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
