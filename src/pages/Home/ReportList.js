import React from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";

import useStyles from "./styles";

const Skeletons = () => {
  const classes = useStyles();

  return (
    <>
      <Grid item md={6} lg={6} xl={6}>
        <Skeleton variant="rect" style={{ marginRight: "8px", marginBottom: "8px", borderRadius: '4px' }} width={142} height={21} />
        <div className={classes.row}>
          <Skeleton variant="rect" style={{ marginRight: "8px", marginBottom: "8px", borderRadius: '4px' }} width={165} height={36} />
          <Skeleton variant="rect" style={{ marginRight: "8px", marginBottom: "8px", borderRadius: '4px' }} width={165} height={36} />
          <Skeleton variant="rect" style={{ marginRight: "8px", marginBottom: "8px", borderRadius: '4px' }} width={165} height={36} />
          <Skeleton variant="rect" style={{ marginRight: "8px", marginBottom: "8px", borderRadius: '4px' }} width={165} height={36} />
        </div>
      </Grid>
    </>
  );
};

const ReportList = (props) => {
  const classes = useStyles();
  const { data, loading, error } = props;

  if (loading) {
    return <Skeletons />;
  }
  if (data.length > 0) {
    return data.map((tribe) => {
      return (
        <Grid item key={tribe.id} md={6} lg={6} xl={6}>
          <Typography variant="h3" className={classes.tribeName}>
            <Link to={`/tribes/${tribe.id}/`}>{tribe.name}</Link>
          </Typography>
          {/* <Grid container direction="row">
            <SquadList squads={tribe.squads}></SquadList>
          </Grid> */}
        </Grid>
      );
    });
  }
  if (error) {
    return null
  }
  return "Nenhum(a)";
};

export default ReportList;
