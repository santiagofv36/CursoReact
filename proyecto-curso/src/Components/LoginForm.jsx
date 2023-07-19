import React, { useState } from "react";
import Swal from "sweetalert2";
import {renderToString} from 'react-dom/server';
import './LoginForm.css'

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (username === "admin" && password === "admin") {
      localStorage.setItem("token", "admin");

      onLogin();
      Swal.fire({
        title: 'Bienvenido!',
        html: renderToString(<p>Has iniciado sesión correctamente.</p>),
        icon: 'success',
        confirmButtonText: 'Aceptar'
        ,timer: 5000,
      })
    }else{
      setError("Usuario o contraseña incorrectos");
      Swal.fire({
        title: 'Error!',
        html: renderToString(<p>{error}</p>),
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
    }
  };

  return (
    <div className="login-wrapper">
      <h1>Iniciar sesión</h1>
      <form onSubmit={handleLogin}>
        <label>
          <p>Usuario</p>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          <p>Contraseña</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Iniciar sesión</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
