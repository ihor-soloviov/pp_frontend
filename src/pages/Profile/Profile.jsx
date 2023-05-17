import React, { useEffect } from "react";
import Container from "../../components/Container/Container";
import ProfileGrid from "../../components/ProfileGrid/ProfileGrid";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import { SwitchComponents } from "../../components/SwitchComponents/SwitchComponents";
import axios from "axios";

const Profile = () => {
  const location = useLocation();
  const pathlink = location.pathname.replace("/profile/", "");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://185.65.247.241:8080/api/registrate",
          {
            "name": "Игорь", "email": "test02@test.com", "token": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImQwZTFkMjM5MDllNzZmZj…ZrL7dwiSPLVT3IV4FuU3qgkuTHbH4f8EqFof45KSnqNl63D2g", "phone": "+380985299485"
        }
        );
        console.log(response.data);
        // Handle the response data
      } catch (error) {
        console.error(error);
        // Handle any errors
      }
    };

    fetchData();
  }, []);

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
