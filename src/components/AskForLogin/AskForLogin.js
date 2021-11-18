import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

import { GlobalContext } from "../../providers/GlobalProvider";

const AskForLogin = (props) => {
  const { isAnonymous, setIsAnonymous, setAskForLoginVisible,  } = useContext(GlobalContext);

  const handleSubmit = () => {
    // ENDPOINT TO CREATE ANONYMOUS USER
    setIsAnonymous(true);
    setAskForLoginVisible(false);
  };

  return (
    <div>
      Você gostaria de realizar o login para fazer prosseguir?
      <br></br>
      <Link to="/login/">SIM</Link>
      <button onClick={() => handleSubmit()}>NÃO</button>
    </div>
  );
};
export default AskForLogin;
