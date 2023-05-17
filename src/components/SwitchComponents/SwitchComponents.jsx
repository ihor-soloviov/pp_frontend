import React from 'react'
import InfoSection from '../InfoSection/InfoSection';
import Addresses from '../Addresses/Adresses';

export const SwitchComponents = ({ pathlink }) => {
  const renderComponent = () => {
    switch (pathlink) {
      case 'info':
        return <InfoSection />;
      case 'addresses':
        return <Addresses />;
      default:
        return ':)';
    }
  };

  return <>{renderComponent()}</>;
}
