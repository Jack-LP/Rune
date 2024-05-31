import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppWrapper } from "./context/AppContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppWrapper>
    <App />
  </AppWrapper>,
);
