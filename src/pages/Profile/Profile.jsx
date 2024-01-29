import React, { useState } from 'react';
import Container from '../../components/Container/Container';
import ProfileGrid from '../../components/ProfileGrid/ProfileGrid';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useLocation } from 'react-router-dom';
import { SwitchComponents } from '../../components/SwitchComponents/SwitchComponents';

const Profile = React.memo(() => {
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);
  const location = useLocation();
  const pathlink = location.pathname.replace('/profile/', '');

  const handleSidebar = () => {
    setIsSidebarClosed((prev => !prev));
  };

  return (
    <>
      <Container>
        <ProfileGrid>
          <Sidebar pathlink={pathlink} />
          <SwitchComponents
            pathlink={pathlink}
            handleSidebar={handleSidebar}
            isSidebarClosed={isSidebarClosed}
          />
        </ProfileGrid>
      </Container>
    </>
  );
})

export default Profile;
