import React from "react";
import Typography from "@material-ui/core/Typography";

import { defaultAnimDuration } from "../../utils/core.js";

const ErrorMsg = ({ error, message }) => {
  return (
    <div
      style={{
        maxHeight: error ? "100px" : 0,
        paddingBottom: "13px",
        overflow: "hidden",
        transition: `all ${defaultAnimDuration}`,
      }}>
      {error ? (
        <Typography variant="body1" color="error">
          {message}
        </Typography>
      ) : null}
    </div>
  );
};
export default ErrorMsg;
