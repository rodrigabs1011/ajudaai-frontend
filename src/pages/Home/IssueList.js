import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import IssueItem from "../../components/IssueItem";
import HomeSkeleton from "./skeletons";
import useStyles from "./styles";
import empty from "../../assets/empty.svg";

const IssueList = (props) => {
  const classes = useStyles();
  const { data, loading, error, handleUpdateItem } = props;

  if (loading) {
    return <HomeSkeleton />;
  }
  if (data.length > 0) {
    return data.map((item) => {
      return (
        <Grid item key={item.id} xs={12} sm={6} md={4} lg={3} xl={3}>
          <IssueItem item={item} handleUpdateItem={handleUpdateItem} />
        </Grid>
      );
    });
  }

  if (error) {
    return null;
  }
  return (
    <Grid item md={6} lg={6} xl={6}>
      <Box className={classes.emptyBox}>
        <Typography variant="h6" color="primary" className={classes.marginBottom}>
          Nenhum ajuda aí por aqui!
        </Typography>
        <img src={empty} alt="Nenhum(a)" width="50%" />
      </Box>
    </Grid>
  );
};

export default IssueList;
