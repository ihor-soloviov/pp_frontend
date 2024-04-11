export const polygonPaths = [
  { lat: 46.45166673859898, lng: 30.768502518442684 },
  { lat: 46.442002530249624, lng: 30.771964651313617 },
  { lat: 46.42316678919593, lng: 30.76792704865653 },
  { lat: 46.41539983373721, lng: 30.761838090430164 },
  { lat: 46.40877854800877, lng: 30.75562931670575 },
  { lat: 46.405671457272895, lng: 30.7306096725362 },
  { lat: 46.40761713782876, lng: 30.729853158039546 },
  { lat: 46.40498354777752, lng: 30.709928576790787 },
  { lat: 46.406971488077765, lng: 30.70582518820819 },
  { lat: 46.40891828049145, lng: 30.704900279321024 },
  { lat: 46.40782741399074, lng: 30.693314578523907 },
  { lat: 46.41178799435908, lng: 30.69277910499714 },
  { lat: 46.419119614120035, lng: 30.70835915895738 },
  { lat: 46.430910710773155, lng: 30.69469284118881 },
  { lat: 46.43570930278756, lng: 30.698458312621103 },
  { lat: 46.437956666674765, lng: 30.695776772996556 },
  { lat: 46.442221001671925, lng: 30.694550747976074 },
  { lat: 46.442221001671925, lng: 30.687161898465458 },
  { lat: 46.44569685315506, lng: 30.686806665315906 },
  { lat: 46.44564789914128, lng: 30.68375166025658 },
  { lat: 46.451571027663135, lng: 30.683112240587395 },
  { lat: 46.457640342586444, lng: 30.68240177431671 },
  { lat: 46.460576864931056, lng: 30.692277255874156 },
  { lat: 46.460858095754745, lng: 30.705969774960003 },
  { lat: 46.460968412072376, lng: 30.713259845881964 },
  { lat: 46.46485080424781, lng: 30.722392196623577 },
  { lat: 46.463780291012405, lng: 30.72979043782668 },
  { lat: 46.46525243525569, lng: 30.735367090146806 },
  { lat: 46.46394795092836, lng: 30.754325672389097 },
  { lat: 46.46097805085998, lng: 30.755937454067467 },
  { lat: 46.4614844664613, lng: 30.758814664207677 },
];

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
    currentAddressInfo.fullAddress,
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
