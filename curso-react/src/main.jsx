import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import MyContextProvider from "./MyContext.jsx";
// -----------------------------------------------------
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
//------------------------------------------------------
import { BrowserRouter } from "react-router-dom";

const production = false;

if (production) {
  disableReactDevTools();
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      <MyContextProvider>
        <App />
      </MyContextProvider>
    </React.StrictMode>
  </BrowserRouter>
);
