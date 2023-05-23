import React, { useState } from "react";
import Container from "../../components/Container/Container";
import ProfileGrid from "../../components/ProfileGrid/ProfileGrid";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import { SwitchComponents } from "../../components/SwitchComponents/SwitchComponents";

const Profile = () => {
  const [isSidebarOpened, setIsSidebarOpened] = useState(false);
  const location = useLocation();
  const pathlink = location.pathname.replace("/profile/", "");

  const openSidebar = () => {
    setIsSidebarOpened(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpened(false);
  };

  return (
    <>
      <Container>
        <ProfileGrid>
          <Sidebar pathlink={pathlink} />
          <SwitchComponents
            pathlink={pathlink}
            openSidebar={openSidebar}
            isSidebarOpened={isSidebarOpened}
            closeSidebar={closeSidebar}
          />
        </ProfileGrid>
      </Container>
    </>
  );
};

export default Profile;
