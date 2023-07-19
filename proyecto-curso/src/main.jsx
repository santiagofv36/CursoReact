import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import SucursalContextProvider from "./Contexts/SucursalContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <SucursalContextProvider>  
        <App />
      </SucursalContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
