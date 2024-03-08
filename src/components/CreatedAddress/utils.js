export const getStreet = (streetName, homeNumber, flat) => {
  return `${streetName}, ${homeNumber + flat}`;
};

export const getFlat = (adress) => {
  return adress?.flatNumber ? ` , кв. ${adress?.flatNumber}` : '';
};
