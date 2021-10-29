import React, { useContext } from "react";
import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { GlobalContext } from "../../providers/GlobalProvider";

import useStyles from "./styles";


const ReportForm = () => {
  const classes = useStyles();
  const { reportFormVisible, setReportFormVisible } = useContext(GlobalContext);

  return (
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <form>
            <p>image</p>
            <p>desc</p>
            <p>tags</p>

            <Button variant="outlined" color="primary">
              Cancelar
            </Button>

            <Button variant="contained" color="primary">
              Postar
            </Button>
          </form>
          {/* <div className={classes.row}>

          </div> */}
        </Grid>
  );
};

export default ReportForm;
