import React from "react";
import ReactDOM from "react-dom";

import "index.scss";

import Application from "components/Application";
import { CookiesProvider } from "react-cookie";

ReactDOM.render(
  <CookiesProvider>
    <Application />
  </CookiesProvider>,
  document.getElementById("root")
);
