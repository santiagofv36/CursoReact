import React, { useState, useEffect } from "react";

const TaskList = () => {
  // Estado para almacenar la lista de tareas y el filtro seleccionado
  const [tasks, setTasks] = useState("");
  const [filter, setFilter] = useState("All");
  // Color por defecto del titulo
  const [titleColor, setTitleColor] = useState("white");
  // useEffect(() => {
  //   alert("Se actualizó la lista de tareas");
  // }, [tasks]);

  // Agregar una nueva tarea
  const addTask = (description) => {
    // Creacion de la nueva tarea
    const newTask = {
      id: Math.random().toString(),
      descripcion: description,
      estado: "Pendiente", // Cuando creo una tarea le coloco como estado "Pendiente" por defecto
    };
    setTasks([...tasks, newTask]); // Actualizo la lista de tareas
    // ... es el Spread operator, lo que hace es agarra todo lo que ya tiene el objeto
    // y le agrega el nuevo objeto que se esta creando
    // Funciona de la misma forma que el add o append de los ArrayList en java o las listas en python
  };

  // Marcar una tarea como completada
  const markTaskAsCompleted = (taskId) => {
    // Primero se mapea las tareas, se busca la tarea por Id
    // Si el Id de la tarea pasada como argumento de la funcion coincide con alguno de los Id's
    // Que estan en la lista
    // Copia todo lo anterior de la tarea (Para mantener la descripcion de la misma)
    // Y le actualiza el estado a completada, sino es el Id le deja el estado en el que ya tenia
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, estado: "Completada" } : task
    );
    setTasks(updatedTasks);
  };

  // Eliminar una tarea
  const deleteTask = (taskId) => {
    /*
      Los arreglos en Javascript tienen muchos metodos, que permiten iterarlos sin necesidad de hacer un for. El hacer uso de estos metodos hace que el codigo se vea mucho mas simple y legible
      Metodo `Filter` permite filtrar como lo dice su nombre segun una condicion
      En este caso en especifico, al filtrar las tareas, busco todas las tareas que no tengan el Id que es pasado por parametro
      Lo cual genera que me de una lista con todos las tareas anteriores menos la que seleccione
      Por ultimo actualizo la lista de tareas con el setter del UseState
    */
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  // Filtrar las tareas según el estado seleccionado
  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") {
      return true;
    } else if (filter === "Completed") {
      return task.estado === "Completada";
    } else if (filter === "Pending") {
      return task.estado === "Pendiente";
    }
    return true;
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1 style={{ color: titleColor }}>Lista de Tareas</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <input
          type="text"
          placeholder="Ingrese una nueva tarea"
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              addTask(event.target.value);
              event.target.value = "";
            }
          }}
          style={{ marginRight: "1rem" }}
        />
        <select onChange={(event) => setFilter(event.target.value)}>
          <option value="All">Todas</option>
          <option value="Completed">Completadas</option>
          <option value="Pending">Pendientes</option>
        </select>
      </div>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            {" "}
            {/*  todos los elementos de react deben tener un Key unico (No genera un error, pero la consola del cliente se llena de basura, por lo cual es buena practica poner Id's unicos como clave a los elementos), esto solo aplica cuando se esta iterando sobre algun objeto que genere el mismo elemento html pero con informacion diferente */}
            {/* Los componentes en react asi como en html tienen la propiedad "style"
               En react para colocar estilos a una etiqueta de HTML se puede hacer de dos formas
               1.- Por clases haciendo uso de un .css
               2.- Colocando una propiedad Style a la etiqueta
               
               La ventaja de utilizar la propiedad de Style es que se puede modificar de forma dinamica el estilo, sin embargo con las clases tambien se puede hacer. Solo basta con interpretar codigo en el valor de className <-
               En react para indicar la clase de una etiqueta se hace con className y no class como en html

               Ejemplo de clases
Interpretacion de codigo_____   ______ dentro de la interpretacion de codigo para elementos de react solo
                            |  |       se puede hacer uso de ternarios, a menos que sea una funcion anonima
                            v v
               className = { valor? "class1" : "class2" }
            */}
            <span
              style={{
                color: task.estado === "Completada" ? "green" : "white",
              }}
            >
              {task.descripcion}
            </span>
            <button onClick={() => markTaskAsCompleted(task.id)}>
              Completada
            </button>
            <button onClick={() => deleteTask(task.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <button
        onClick={() => setTitleColor(titleColor === "white" ? "red" : "white")}
      >
        Cambiar color de titulo
      </button>
    </div>
  );
};

export default TaskList;
