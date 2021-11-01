import React from "react";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import ReportItem from "../../components/ReportItem";
import HomeSkeleton from "./skeletons";
import useStyles from "./styles";
import empty from "../../assets/empty.svg";

const ReportList = (props) => {
  const classes = useStyles();
  const { data, loading, error } = props;

  if (loading) {
    return <HomeSkeleton />;
  }
  if (data.length > 0) {
    return data.map((item) => {
      return (
        <Grid item key={item.id} xs={12} sm={6} md={4} lg={3} xl={3}>
          <ReportItem item={item} />
        </Grid>
      );
    });
  }

  if (error) {
    return null;
  }

  return (
    <Grid item md={6} lg={6} xl={6}>
      <Typography variant="h6" color="primary" className={classes.marginBottom}>
        Nenhum ajuda aí por aqui
      </Typography>
      <img src={empty} alt="Nenhum(a)" width="100%" />
    </Grid>
  );
};

export default ReportList;
