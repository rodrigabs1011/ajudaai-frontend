import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

const GlobalProvider = (props) => {
  const [issueFormVisible, setIssueFormVisible] = useState(false);
  const [issues, setIssues] = useState([]);

  return (
    <GlobalContext.Provider value={{ issueFormVisible, setIssueFormVisible, issues, setIssues }}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
