import React from "react";
import InfoSection from "../InfoSection/InfoSection";
import Addresses from "../Addresses/Adresses";
import Orders from "../Orders/Orders";
import MobileSidebar from "../MobileSidebar/MobileSidebar";

export const SwitchComponents = ({
  pathlink,
  openSidebar,
  isSidebarOpened,
  closeSidebar,
}) => {
  const renderComponent = () => {
    switch (pathlink) {
      case "info":
        return (
          <InfoSection
            openSidebar={openSidebar}
            isSidebarOpened={isSidebarOpened}
            closeSidebar={closeSidebar}
          />
        );
      case "addresses":
        return <Addresses />;
      case "history":
        return <Orders />;
      case "":
        return <MobileSidebar closeSidebar={closeSidebar} />;
      default:
        return ":)";
    }
  };

  return <>{renderComponent()}</>;
};
