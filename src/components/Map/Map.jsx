import React from 'react'
import { GoogleMap, MarkerF, PolygonF } from '@react-google-maps/api';
import { center, containerStyle, options } from '../../Pages/Contact/data';
import { polygonPaths } from '../../utils/distance';

export const Map = ({ poligon = false }) => {
  return (
    <div className='contact__map'>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={16}
        options={options}
      >
        {poligon && (
          <PolygonF
            paths={polygonPaths}
            options={{
              strokeColor: '#ff5124',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#ff5124',
              fillOpacity: 0.25,
            }}
          />
        )}
        <MarkerF position={center} />
      </GoogleMap>
    </div>
  )
}

