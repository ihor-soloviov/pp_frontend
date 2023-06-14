import React from "react";
import InfoSection from "../InfoSection/InfoSection";
import Addresses from "../Addresses/Adresses";
import Orders from "../Orders/Orders";
import MobileSidebar from "../MobileSidebar/MobileSidebar";
import ComingSoon from "../ComingSoon/ComingSoon";
import Favorites from "../Favorites/Favorites";

export const SwitchComponents = ({
  pathlink,
  handleSidebar,
  isSidebarClosed,
}) => {
  const renderComponent = () => {
    switch (pathlink) {
      case "info":
        return (
          <InfoSection
            handleSidebar={handleSidebar}
            isSidebarClosed={isSidebarClosed}
          />
        );
      case "addresses":
        return <Addresses handleSidebar={handleSidebar} />;
      case "history":
        return <Orders handleSidebar={handleSidebar} />;
      case "":
        return <MobileSidebar handleSidebar={handleSidebar} />;
      case "favourite":
        return <Favorites handleSidebar={handleSidebar}/>
      default:
        return <ComingSoon handleSidebar={handleSidebar} />;
    }
  };

  return <>{renderComponent()}</>;
};
