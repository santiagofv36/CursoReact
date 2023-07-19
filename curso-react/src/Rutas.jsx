import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Elemento = ({ titulo, setTitulo }) => {
  const nav = useNavigate();

  return (
    <>
      {/* Navigate sirve para navegar entre las diferentes rutas que tenga  */}
      <button
        onClick={() => {
          nav(-1);
          setTitulo("Volvi");
        }}
      >
        Volver
      </button>
      <button onClick={() => nav("/r12")}>Ir R1/2</button>
      <Routes>
        <Route path="/r12" element={<div>R12</div>} />
      </Routes>
      {titulo}
    </>
  );
};

const Error = () => {
  const nav = useNavigate();

  useEffect(() => {
    nav("/");
  }, []);
};

const Rutas = () => {
  const [titulo, setTitulo] = useState("Titulo");

  const nav = useNavigate();

  const handleGoToR1 = () => {
    setTitulo("Soy R1");
    nav("/r1");
  };
  const handleGoToR2 = () => {
    setTitulo("Soy R2");
    nav("/r2");
  };
  const handleGoToR3 = () => {
    setTitulo("Soy R3");
    nav("/r3");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      Routing, Esto es estatico, ya que esta por fuera del routes
      <button onClick={handleGoToR1}>Go to r1</button>
      <Link to="/r1">Ir a r1</Link>
      <button onClick={handleGoToR2}>Go to r2</button>
      <button onClick={handleGoToR3}>Go to r3</button>
      <Routes>
        <Route
          path="/r1/*"
          element={<Elemento titulo={titulo} setTitulo={setTitulo} />}
        />
        <Route
          path="/r2/*"
          element={<Elemento titulo={titulo} setTitulo={setTitulo} />}
        />
        <Route
          path="/r3/*"
          element={<Elemento titulo={titulo} setTitulo={setTitulo} />}
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default Rutas;
