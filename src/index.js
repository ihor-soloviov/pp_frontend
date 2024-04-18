import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

//Import Roure
import { BrowserRouter } from "react-router-dom";

//Import styles
import "./style/index.scss";
import "./firebaseConfig";
import MetaHelmet from "./components/MetaPixel/MetaPixel";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MetaHelmet />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
