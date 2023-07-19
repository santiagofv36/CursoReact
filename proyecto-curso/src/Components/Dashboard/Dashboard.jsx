import React, { useContext, useEffect, useState } from "react";
import { SucursalContext } from "../../Contexts/SucursalContext";
import Swal from "sweetalert2";
import "./Dashboard.css";
import { Routes, Route, useNavigate } from "react-router";

const AddProduct = ({ sucursal }) => {
  const nav = useNavigate();

  const { addProducto } = useContext(SucursalContext);

  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState(1);
  const [cantidad, setCantidad] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProducto = {
      nombre,
      precio,
      stock: cantidad,
      sucursal_id: sucursal.id,
    };

    addProducto(newProducto);
    nav(`/dashboard/sucursales/${sucursal.id}/productos`);
  };

  return (
    <div>
      <button onClick={() => nav(-1)}>volver</button>
      <h1>
        Sucursal {sucursal.nombre} {sucursal.ubicacion}
      </h1>
      <h2>Agregar producto</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre</label>
        <input
          type="text"
          name="nombre"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <label htmlFor="precio">Precio</label>
        <input
          type="number"
          name="precio"
          id="precio"
          value={precio}
          min={1}
          step="0.01"
          onChange={(e) => setPrecio(e.target.value)}
        />
        <label htmlFor="cantidad">Cantidad</label>
        <input
          type="number"
          name="cantidad"
          id="cantidad"
          min={1}
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
        />
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
};

const Productos = ({ productos, sucursal }) => {
  const nav = useNavigate();

  const { deleteProducto } = useContext(SucursalContext);

  const handleDelete = (productoId) => {
    Swal.fire({
      title: "Estas seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "No, cancelar",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProducto(productoId);
        // Swal.fire({
        //   title: "Eliminado!",
        //   html: "El producto ha sido eliminado correctamente.",
        //   icon: "success",
        //   confirmButtonText: "Aceptar",
        // });
      }
    });
  };

  const handleEditProduct = () => {
    nav(`/dashboard/sucursales/${sucursal.id}/productos/edit`);
  };

  const handleAddProduct = () => {
    nav(`/dashboard/sucursales/${sucursal.id}/productos/add`);
  };

  return (
    <div>
      <button onClick={() => nav(-1)}>volver</button>
      <h1>
        Sucursal {sucursal.nombre} {sucursal.ubicacion}
      </h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.length > 0 ? (
            productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.nombre}</td>
                <td>{producto.precio}</td>
                <td>{producto.stock}</td>
                <td>
                  <button className="btn" onClick={()=> handleEditProduct()}>Editar</button>
                  <button
                    className="btn"
                    onClick={() => handleDelete(producto.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay productos</td>
            </tr>
          )}
          <tr>
            <td colSpan={4}>
              <div className="wrapper">
                <button type="button" onClick={handleAddProduct}>
                  Agregar
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const EditProduct = ({ sucursal }) => {
  const nav = useNavigate();

  const { updateProducto, producto } = useContext(SucursalContext);

  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState(1);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    setNombre(producto.nombre);
    setPrecio(producto.precio);
    setCantidad(producto.stock);
  }, [producto]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProducto = {
      nombre,
      precio,
      stock: cantidad,
      sucursal_id: sucursal.id,
    };

    updateProducto(newProducto,producto.id,);
    Swal.fire({
      title: "Actualizado!",
      html: "El producto ha sido actualizado correctamente.",
      icon: "success",
      confirmButtonText: "Aceptar",
    });
    nav(`/dashboard/sucursales/${sucursal.id}/productos`);
  };

  return (
    <div>
      <button onClick={() => nav(-1)}>volver</button>
      <h1>
        Sucursal {sucursal.nombre} {sucursal.ubicacion}
      </h1>
      <h2>Editar producto</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre</label>
        <input
          type="text"
          name="nombre"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <label htmlFor="precio">Precio</label>
        <input
          type="number"
          name="precio"
          id="precio"
          value={precio}
          min={1}
          step="0.01"
          onChange={(e) => setPrecio(e.target.value)}
        />
        <label htmlFor="cantidad">Cantidad</label>
        <input
          type="number"
          name="cantidad"
          id="cantidad"
          min={1}
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
        />
        <button type="submit">Editar</button>
      </form>
    </div>
  );
};

const Sucursales = ({ sucursales }) => {
  const nav = useNavigate();

  const { getProductosBySucursal, getSucursal } = useContext(SucursalContext);

  const handleGoToProduct = (sucursalId) => {
    getProductosBySucursal(sucursalId);
    getSucursal(sucursalId);
    nav(`/dashboard/sucursales/${sucursalId}/productos`);
  };

  return (
    <div className="wrapper">
      <h1>Sucursales</h1>
      <ul>
        {sucursales.length > 0 ? (
          sucursales.map((sucursal) => (
            <li key={sucursal.id}>
              <h2>{sucursal.nombre}</h2>
              <p>{sucursal.ubicacion}</p>
              <button
                className="btn"
                onClick={() => {
                  handleGoToProduct(sucursal.id);
                }}
              >
                Detalles
              </button>
            </li>
          ))
        ) : (
          <p>No hay sucursales registradas</p>
        )}
      </ul>
    </div>
  );
};

const Dashboard = ({ handleLogOut }) => {
  const { sucursales, productos, sucursal } = useContext(SucursalContext);

  const nav = useNavigate();

  const [timer, setTimer] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  // funcion para simular el tiempo de sesion

  useEffect(() => {
    setTimer(
      setInterval(() => {
        setTimer((prevCounter) => prevCounter + 1);
      }, 1000)
    );
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (timer >= 3000 && !showAlert) {
      setShowAlert(true);
    }
  }, [timer, showAlert]);

  useEffect(() => {
    setTimer(0);
  }, [showAlert]);

  const handlelogout = (afk) => {
    setTimer(0);
    afk ? handleLogOut(true) : handleLogOut(false);
  };

  const handleModalConfirmation = (result) => {
    setShowAlert(false);
    setTimer(0);
    if (!result.isConfirmed) {
      console.log("Manteniendo la sesión iniciada...");
    } else {
      handlelogout(true);
    }
  };

  const handleGoToSucursales = () => {
    // console.log("Go to sucursales");
    nav("/dashboard/sucursales");
  };

  useEffect(() => {
    if (showAlert) {
      Swal.fire({
        title: "Mantener sesión activa?",
        text: "Quieres mantener la sesión activa?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        timer: 10000, // 10 seconds
        timerProgressBar: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showLoaderOnConfirm: true,
        preConfirm: (result) => handleModalConfirmation(result),
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Sesión activa!",
            html: "Has mantenido la sesión activa.",
            icon: "success",
            confirmButtonText: "Aceptar",
          });
          setTimer(0);
        } else {
          handlelogout(true);
        }
      });
    }
  }, [showAlert]);

  return (
    <div className="dashboard__wrapper">
      <div className="navbar">
        <div className="navbar__container">
          <div className="text">
            <label>Admin</label>
          </div>
          <div className="text">
            <button type="button" onClick={handleGoToSucursales}>
              Sucursales
            </button>
          </div>
          <div>
            <button type="button" onClick={handleLogOut}>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="sucursal__container">
          <Routes>
            <Route
              path="sucursales/*"
              element={<Sucursales sucursales={sucursales} />}
            />
            <Route
              path="sucursales/:sucursalId/productos"
              element={<Productos productos={productos} sucursal={sucursal} />}
            />
            <Route
              path="sucursales/:sucursalId/productos/add"
              element={<AddProduct sucursal={sucursal} />}
            />
            <Route
              path="sucursales/:sucursalId/productos/:productoId/edit"
              element={<EditProduct sucursal={sucursal} />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
