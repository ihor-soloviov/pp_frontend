import React from "react";
import Container from "../../components/Container/Container";
import ProfileGrid from "../../components/ProfileGrid/ProfileGrid";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import { SwitchComponents } from "../../components/SwitchComponents/SwitchComponents";

const Profile = () => {
  const location = useLocation();
  const pathlink = location.pathname.replace("/profile/", "");

  return (
    <>
      <Container>
        <ProfileGrid>
          <Sidebar pathlink={pathlink} />
          <SwitchComponents pathlink={pathlink} />
        </ProfileGrid>
      </Container>
    </>
  );
};

export default Profile;
