import React from "react";
import notFound from "../../assets/404.jpg";
import "./NotFound.scss";

const NotFound = () => {
  return (
    <div className="notFound">
      <img src={notFound} alt="404" />
    </div>
  );
};

export default NotFound;
