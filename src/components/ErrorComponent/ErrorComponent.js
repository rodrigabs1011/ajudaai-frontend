import React from "react";
import Typography from "@material-ui/core/Typography";

import useStyles from "./styles";

const ErrorComponent = (props) => {
  const classes = useStyles();

  return (
    <>
      {props.message ? (
        <>
          <Typography
            variant="h6"
            color="primary"
            className={classes.marginBottom}>
            {props.message}
          </Typography>
          <img src={props.image} alt={props.alt} width="50%" />
        </>
      ) : null}
    </>
  );
};
export default ErrorComponent;
