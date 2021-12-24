import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

const GlobalProvider = (props) => {
  const [issueFormVisible, setIssueFormVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [askForLoginVisible, setAskForLoginVisible] = useState(false);
  // const [afterAskAction, setAfterAskAction] = useState({type: null, data: {}});
  const [issues, setIssues] = useState([]);

  return (
    <GlobalContext.Provider
      value={{
        issueFormVisible,
        setIssueFormVisible,
        issues,
        setIssues,
        isAuthenticated,
        setIsAuthenticated,
        askForLoginVisible,
        setAskForLoginVisible,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
