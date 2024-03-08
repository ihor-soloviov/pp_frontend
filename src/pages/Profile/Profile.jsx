import React, { useState } from 'react';
import Container from '../../components/Container/Container';
import ProfileGrid from '../../components/ProfileGrid/ProfileGrid';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useLocation, Routes, Route } from 'react-router-dom';
import InfoSection from '../../components/InfoSection/InfoSection';
import Addresses from '../../components/Addresses/Adresses';
import Favorites from '../../components/Favorites/Favorites';
import Orders from '../../components/Orders/Orders';
import Bonus from '../../components/Bonus/Bonus';
import MobileSidebar from '../../components/MobileSidebar/MobileSidebar';

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
          <Routes>
            <Route index element={<MobileSidebar handleSidebar={handleSidebar} />} />
            <Route path="info" element={<InfoSection handleSidebar={handleSidebar} isSidebarClosed={isSidebarClosed} />} />
            <Route path="addresses" element={<Addresses handleSidebar={handleSidebar} />} />
            <Route path='history' element={<Orders handleSidebar={handleSidebar} />} />
            <Route path="favourite" element={<Favorites handleSidebar={handleSidebar} />} />
            <Route path='bonuses' element={<Bonus handleSidebar={handleSidebar} />} />
          </Routes>
        </ProfileGrid>
      </Container>
    </>
  );
})

export default Profile;
