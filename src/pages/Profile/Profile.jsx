import React, { useState } from 'react';
import Container from '../../components/Container/Container';
import ProfileGrid from '../../components/ProfileGrid/ProfileGrid';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useLocation } from 'react-router-dom';
import { SwitchComponents } from '../../components/SwitchComponents/SwitchComponents';

const Profile = () => {
  const [isSidebarOpened, setIsSidebarOpened] = useState(true);
  const location = useLocation();
  const pathlink = location.pathname.replace('/profile/', '');

  const handleSidebar = () => {
    setIsSidebarOpened((prev => !prev));
  };

  console.log(isSidebarOpened)

  return (
    <>
      <Container>
        <ProfileGrid>
          <Sidebar pathlink={pathlink} />
          <SwitchComponents
            pathlink={pathlink}
            handleSidebar={handleSidebar}
            isSidebarOpened={isSidebarOpened}
          />
        </ProfileGrid>
      </Container>
    </>
  );
};

export default Profile;
