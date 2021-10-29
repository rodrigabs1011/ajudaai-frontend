import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

const GlobalProvider = (props) => {
  const [reportFormVisible, setReportFormVisible] = useState(false);

  return (
    <GlobalContext.Provider value={{ reportFormVisible, setReportFormVisible }}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
