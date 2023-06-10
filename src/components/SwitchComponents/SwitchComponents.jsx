import React from "react";
import InfoSection from "../InfoSection/InfoSection";
import Addresses from "../Addresses/Adresses";
import Orders from "../Orders/Orders";
import MobileSidebar from "../MobileSidebar/MobileSidebar";

export const SwitchComponents = ({
  pathlink,
  handleSidebar,
  isSidebarOpened,
}) => {
  const renderComponent = () => {
    switch (pathlink) {
      case "info":
        return (
          <InfoSection
            handleSidebar={handleSidebar}
            isSidebarOpened={isSidebarOpened}
          />
        );
      case "addresses":
        return <Addresses handleSidebar={handleSidebar} />;
      case "history":
        return <Orders handleSidebar={handleSidebar} />;
      case "":
        return <MobileSidebar handleSidebar={handleSidebar} />;
      default:
        return ":)";
    }
  };

  return <>{renderComponent()}</>;
};
