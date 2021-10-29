import React from "react";
import { Redirect } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Skeleton from "@material-ui/lab/Skeleton";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  pageTitle: {
    fontSize: "24px",
    fontWeight: "normal",
    color: "#212121",
    marginRight: theme.spacing(2),
  },
  row: {
    display: "flex",
    alignItems: "center",
    marginBottom: "13px",
  },
}));

const PageHeader = (props) => {
  const classes = useStyles();

  if (props.loading) {
    return (
      <>
        <Skeleton
          variant="rect"
          style={{
            marginRight: "8px",
            marginBottom: "8px",
            borderRadius: "4px",
          }}
          width={256}
          height={64}
        />
      </>
    );
  }

  if (props.error) {
    return <Redirect to="/404" />
  }

  return (
    <Grid container>
      <Grid item xl={6} lg={6}>
        <div className={classes.row}>
          <Typography variant="h2" className={classes.pageTitle}>
            {props.squad.name}
          </Typography>
          <IconButton onClick={props.handleEditOpen}>
            <EditIcon style={{ color: "#212121" }} />
          </IconButton>
        </div>
        <Divider />
      </Grid>
    </Grid>
  );
};

export default PageHeader;
