import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

const GlobalProvider = (props) => {
  const [reportFormVisible, setReportFormVisible] = useState(false);
  const [reports, setReports] = useState([]);

  return (
    <GlobalContext.Provider value={{ reportFormVisible, setReportFormVisible, reports, setReports }}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
