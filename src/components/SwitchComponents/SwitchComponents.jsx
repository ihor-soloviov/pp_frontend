import React from "react";
import InfoSection from "../InfoSection/InfoSection";
import Addresses from "../Addresses/Adresses";
import Orders from "../Orders/Orders";

export const SwitchComponents = ({ pathlink }) => {
  const renderComponent = () => {
    switch (pathlink) {
      case "info":
        return <InfoSection />;
      case "addresses":
        return <Addresses />;
      case "history":
        return <Orders />;
      default:
        return ":)";
    }
  };

  return <>{renderComponent()}</>;
};
