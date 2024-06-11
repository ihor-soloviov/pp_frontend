import React, { useState } from 'react';
import Container from '../../components/Container/Container';
import ProfileGrid from '../../components/ProfileGrid/ProfileGrid';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useLocation, Routes, Route } from 'react-router-dom';
import InfoSection from '../../components/InfoSection/InfoSection';
import Addresses from '../../components/Addresses/Adresses';
import Favorites from '../../components/Favorites/Favorites';
import Orders from '../../components/Orders/Orders';
import MobileSidebar from '../../components/MobileSidebar/MobileSidebar';
import AdminPanel from '../../components/AdminPanel/AdminPanel';
import userStore from '../../store/user-store';
import { Navigate } from 'react-router-dom';

const Profile = React.memo(({ handleError }) => {
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);
  const { isAdmin } = userStore;
  const location = useLocation();
  const pathlink = location.pathname.replace('/profile/', '');

  const handleSidebar = () => {
    setIsSidebarClosed((prev) => !prev);
  };

  return (
    <>
      <Container>
        <ProfileGrid>
          <Sidebar pathlink={pathlink} />
          <Routes>
            <Route index element={<MobileSidebar handleSidebar={handleSidebar} />} />
            <Route
              path='info'
              element={
                <InfoSection handleSidebar={handleSidebar} isSidebarClosed={isSidebarClosed} />
              }
            />
            <Route
              path='addresses'
              element={<Addresses handleError={handleError} handleSidebar={handleSidebar} />}
            />
            <Route path='history' element={<Orders handleSidebar={handleSidebar} />} />
            <Route path='favourite' element={<Favorites handleSidebar={handleSidebar} />} />
            <Route
              path='admin-bar'
              element={isAdmin ? <AdminPanel handleSidebar={handleSidebar} /> : <Navigate to='/' />}
            />
          </Routes>
        </ProfileGrid>
      </Container>
    </>
  );
});

export default Profile;
