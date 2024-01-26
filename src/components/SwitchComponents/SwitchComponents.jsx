import React from "react";
import InfoSection from "../InfoSection/InfoSection";
import Addresses from "../Addresses/Adresses";
import Orders from "../Orders/Orders";
import MobileSidebar from "../MobileSidebar/MobileSidebar";
import ComingSoon from "../ComingSoon/ComingSoon";
import Favorites from "../Favorites/Favorites";
import Bonus from "../Bonus/Bonus";
import { LazyMotion, domAnimation } from "framer-motion";

export const SwitchComponents = React.memo(({
  pathlink,
  handleSidebar,
  isSidebarClosed,
}) => {
  const renderComponent = () => {
    switch (pathlink) {
      case "info":
        return (
          <LazyMotion features={domAnimation}>
            <InfoSection
              handleSidebar={handleSidebar}
              isSidebarClosed={isSidebarClosed}
            />
          </LazyMotion>
        );
      case "addresses":
        return (
          <LazyMotion features={domAnimation}>
            <Addresses handleSidebar={handleSidebar} />
          </LazyMotion>
        )
      case "history":
        return (
          <LazyMotion features={domAnimation}>
            <Orders handleSidebar={handleSidebar} />
          </LazyMotion>
        )
      case "":
        return (
          <LazyMotion features={domAnimation}>
            <MobileSidebar handleSidebar={handleSidebar} />
          </LazyMotion>
        )
      case "favourite":
        return (
          <LazyMotion features={domAnimation}>
            <Favorites handleSidebar={handleSidebar} />
          </LazyMotion>
        )

      case "bonuses":
        return (
          <LazyMotion features={domAnimation}>
            <Bonus handleSidebar={handleSidebar} />
          </LazyMotion>
        )
      default:
        return <ComingSoon handleSidebar={handleSidebar} />;
    }
  };

  return <React.Fragment>{renderComponent()}</React.Fragment>
});
