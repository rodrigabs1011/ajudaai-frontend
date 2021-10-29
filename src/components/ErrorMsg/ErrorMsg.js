import React from "react";
import Typography from "@material-ui/core/Typography";

import { defaultAnimDuration } from "../../utils/core.js";


const ErrorMsg = (props) => {
  return (
    <div
      style={{
        maxHeight: props.error ? "100px" : 0,
        paddingBottom: "13px",
        overflow: "hidden",
        transition: `all ${defaultAnimDuration}`,
      }}
    >
      {props.error ? (
        <Typography variant="body1" color="error">
          {props.error}
        </Typography>
      ) : null}
    </div>
  );
};
export default ErrorMsg;
