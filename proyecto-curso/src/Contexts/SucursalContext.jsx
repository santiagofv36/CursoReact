import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export const SucursalContext = createContext();

const SucursalContextProvider = (props) => {
  const [sucursales, setSucursales] = useState([]);
  const [sucursal, setSucursal] = useState({});
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/sucursales")
      .then((res) => {
        setSucursales(res.data);
      })
      .catch((err) => {
        Swal.fire({
          title: "Error al conectar al servidor",
          text: "reconectando...",
        });
      });
  }, []);

  const getProductosBySucursal = (sucursalId) => {
    axios
      .get(`http://localhost:8000/api/sucursales/${sucursalId}/productos`)
      .then((res) => {
        setProductos(res.data);
      })
      .catch((err) => {
        Swal.fire({
          title: "Error al conectar al servidor",
          text: "reconectando...",
        });
      });
  };

  const getSucursal = (sucursalId) => {
    axios
      .get(`http://localhost:8000/api/sucursal/${sucursalId}`)
      .then((res) => {
        setSucursal(res.data);
      })
      .catch((err) => {
        Swal.fire({
          title: "Error al conectar al servidor",
          text: "reconectando...",
        });
      });
  };

  const deleteProducto = (productoId) => {
    axios
      .delete(`http://localhost:8000/api/producto/${productoId}`)
      .then((res) => {
        Swal.fire({
          title: "Producto eliminado",
          text: "El producto fue eliminado correctamente",
          icon: "success",
        });
        getProductosBySucursal(sucursal.id);
      })
      .catch((err) => {
        // Swal.fire({
        //   title: "Error al conectar al servidor",
        //   text: "reconectando...",
        // });
        console.log(err);
      });
  };


  const addProducto = (producto) => {
    axios
      .post(`http://localhost:8000/api/producto`, producto)
      .then((res) => {
        getProductosBySucursal(sucursal.id);
      })
      .catch((err) => {
        Swal.fire({
          title: "Error al conectar al servidor",
          text: "reconectando...",
        });
        console.log(err);
      });
  };

  //  http:// 
  // -D {
  /*
    -D '{
      nombre: "as,jfsdf",
      precio
    }'
  */

  const updateProducto = (producto, productoId) => {
    axios
      .put(`http://localhost:8000/api/producto/${productoId}`, producto)
      .then((res) => {
        getProductosBySucursal(sucursal.id);
      })
      .catch((err) => {
        Swal.fire({
          title: "Error al conectar al servidor",
          text: "reconectando...",
        });
        console.log(err);
      });
  };

  return (
    <SucursalContext.Provider
      value={{
        sucursales,
        getSucursal,
        sucursal,
        getProductosBySucursal,
        productos,
        deleteProducto,
        addProducto,
        updateProducto,
      }}
    >
      {props.children}
    </SucursalContext.Provider>
  );
};

export default SucursalContextProvider;
