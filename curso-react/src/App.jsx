import React, { useEffect, useState, useContext } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TaskList from "./TaskList";
import { MyContext } from "./MyContext";
import Rutas from "./Rutas";

function App() {
  const [count, setCount] = useState(0);

  const { variable } = useContext(MyContext);

  const [nombre, setNombre] = useState("");

  const [correo, setCorreo] = useState("");

  // ejemplo de uso de los UseState

  useEffect(() => {}, []);

  return (
    <>
      {/* <label>Nombre</label>
      <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <label>Correo</label>
      <input value={correo} onChange={(e) => setCorreo(e.target.value)} /> */}
      {/* <TaskList /> */}
      <Rutas />
    </>
  );
}

export default App;
