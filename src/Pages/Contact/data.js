export const containerStyle = {
  height: '100%',
};

export const center = {
  lat: 46.44037226802607,
  lng: 30.721339215781278,
}

export const options = {
  streetViewControl: false,
  // streetView: false,
  mapTypeControl: false,
  zoomControl: false,
  styles: [
    {
      featureType: 'all',
      elementType: 'all',
      stylers: [
        {
          saturation: -100,
        },
        {
          lightness: 20,
        },
        {
          gamma: 1.2,
        },
      ],
    },
  ],
};