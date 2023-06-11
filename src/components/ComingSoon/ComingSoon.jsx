import React from "react";
import ProfileLink from "../ProfileLink/ProfileLink";

const ComingSoon = ({handleSidebar}) => {
  return (
    <div>
      <ProfileLink handleSidebar={handleSidebar}>Coming soon</ProfileLink>
    </div>
  );
};

export default ComingSoon;
