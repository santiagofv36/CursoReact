import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import LoginForm from "./Components/LoginForm";
import Dashboard from "./Components/Dashboard/Dashboard";
import "./App.css";
import Swal from "sweetalert2";

const PrivateRoute = ({ children }) => {
  const location = useLocation();

  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const nav = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogOut = (afk) => {
    if (afk) {
      Swal.fire({
        title: "Sesión cerrada!",
        html: "Has cerrado sesión por inactividad.",
        icon: "warning",
        confirmButtonText: "Aceptar",
        timer: 5000,
      });
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      nav("/login");
    } else {
      Swal.fire({
        title: "Estas seguro?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, cerrar sesión",
        cancelButtonText: "No, cancelar",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Sesión cerrada!",
            html: "Has cerrado sesión correctamente.",
            icon: "success",
            confirmButtonText: "Aceptar",
          });
          localStorage.removeItem("token");
          setIsLoggedIn(false);
          nav("/login");
        }
      });
    }
  };

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
    if (!isLoggedIn) {
      nav("/login");
    } else {
      nav("/dashboard");
    }
  }, [isLoggedIn]);

  return (
    <div>
      <Routes>
        <Route data-login="login" path="/login" element={<LoginForm onLogin={handleLogin} />} />
        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute>
              <Dashboard handleLogOut={handleLogOut} />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
