import React, { useState } from 'react';
import Container from '../../components/Container/Container';
import ProfileGrid from '../../components/ProfileGrid/ProfileGrid';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useLocation, useNavigate } from 'react-router-dom';
import { SwitchComponents } from '../../components/SwitchComponents/SwitchComponents';
import { observer } from 'mobx-react-lite';
import userStore from '../../store/user-store';

const Profile = observer(() => {
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate()
  const pathlink = location.pathname.replace('/profile/', '');

  const { userLogout } = userStore

  const handleSidebar = () => {
    setIsSidebarClosed((prev => !prev));
    console.log(pathlink)
    if (pathlink === 'Вихід') {
      userLogout();
      navigate('/')
    }
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
