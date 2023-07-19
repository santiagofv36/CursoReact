import React, { createContext, useState } from "react";

export const MyContext = createContext();

function MyContextProvider(props) {
  const [variable, setVariable] = useState("Soy ");

  return (
    <MyContext.Provider value={{ variable, setVariable }}>
      {props.children}
    </MyContext.Provider>
  );
}

export default MyContextProvider;
