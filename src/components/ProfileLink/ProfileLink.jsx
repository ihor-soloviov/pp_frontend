import React from 'react'
import cross from "../../../src/assets/Vector.svg";
import { Link } from 'react-router-dom';

const ProfileLink = ({children, openSidebar}) => {
  return (
    <div className="profile_link--mobile">
        <h3 className="profile_sidebar--header profile_link--mobile--title">
          {children}
        </h3>
        <Link to='/profile/' className="profile_link--mobile--button" onClick={openSidebar}>
          <img src={cross} alt="cross" />
        </Link>
      </div>
  )
}

export default ProfileLink
