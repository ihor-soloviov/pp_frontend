const compareDistances = (distance1, distance2) => {
  const value1 = parseFloat(distance1.replace(',', '.').split(' ')[0]);
  const value2 = parseFloat(distance2.replace(',', '.').split(' ')[0]);

  return value1 > value2 ? 2 : value1 < value2 ? 1 : 2;
};

export const calculateDistance = (fullAddress, setSpotOneDistance, setSpotTwoDistance) => {
  const service = new window.google.maps.DistanceMatrixService();

  const spotOne = 'вулиця Маршала Малиновскього, 18, Одеса, Одеська область, Україна, 65000';
  const spotTwo = 'Економічний провулок, 1, Одеса, Одеська область, Україна, 65000';
  service.getDistanceMatrix(
    {
      origins: [spotOne, spotTwo],
      destinations: [fullAddress],
      travelMode: 'DRIVING',
    },
    (response, status) => {
      if (status === 'OK' && response !== null) {
        const distanceOne = response.rows[0].elements[0].distance.text;
        const distanceTwo = response.rows[1].elements[0].distance.text;
        setSpotOneDistance(distanceOne);
        setSpotTwoDistance(distanceTwo);
      } else {
        console.error('Error:', status);
      }
    },
  );
};

export const setSpotIds = (spotOneDistance, spotTwoDistance, handleFormValueChange) => {
  const currentSpot =
    spotOneDistance && spotTwoDistance && compareDistances(spotOneDistance, spotTwoDistance);

  handleFormValueChange('spot_id', currentSpot);
};

export const resetInputFields = (handleFormValueChange, setSpotOneDistance, setSpotTwoDistance) => {
  handleFormValueChange('street', '');
  handleFormValueChange('houseNumber', '');
  handleFormValueChange('howToReciveOrder', '');
  handleFormValueChange('floor', '');
  handleFormValueChange('buildingCode', '');
  handleFormValueChange('entrance', '');
  handleFormValueChange('apartment', '');
  handleFormValueChange('spot_id', '');
  setSpotOneDistance(null);
  setSpotTwoDistance(null);
};

export const pullInputFields = (
  currentAddressInfo,
  handleFormValueChange,
  setSpotOneDistance,
  setSpotTwoDistance,
) => {
  const distance = calculateDistance(
    currentAddressInfo.address,
    setSpotOneDistance,
    setSpotTwoDistance,
  );

  handleFormValueChange('street', currentAddressInfo.streetName);
  handleFormValueChange('houseNumber', currentAddressInfo.homeNumber);
  handleFormValueChange(
    'howToReciveOrder',
    currentAddressInfo.adressType === 'house' ? 'Приватний будинок' : 'До дверей',
  );
  handleFormValueChange('apartment', currentAddressInfo.flatNumber);
  handleFormValueChange('entrance', currentAddressInfo.entranceNumber);
  handleFormValueChange('buildingCode', currentAddressInfo.entranceCode);
  handleFormValueChange('floor', currentAddressInfo.floar);
  handleFormValueChange('spot_id', distance);
};
