import React from "react";
import Container from "../Container/Container";
import Sidebar from "../Sidebar/Sidebar";
import ProfileSection from "../ProfileSection/ProfileSection";
import ProfileGrid from "../ProfileGrid/ProfileGrid";

const Main = () => {
  return (
    <>
      <Container>
        <ProfileGrid>
          <Sidebar/>
          <ProfileSection />
        </ProfileGrid>
      </Container>
    </>
  );
};

export default Main;
