import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import IssueItem from "../../components/IssueItem";
import HomeSkeleton from "./skeletons";
import useStyles from "./styles";
import empty from "../../assets/empty.svg";
import ErrorComponent from "../../components/ErrorComponent";

const IssueList = (props) => {
  const classes = useStyles();
  const { data, loading, error, handleUpdateItem } = props;

  if (loading) {
    return <HomeSkeleton />;
  }
  if (data.length > 0) {
    return (
      <Grid container spacing={2}>
        {data.map((item) => {
          return (
            <Grid item key={item.id} xs={12} sm={6} md={4} lg={3} xl={3}>
              <IssueItem item={item} handleUpdateItem={handleUpdateItem} />
            </Grid>
          );
        })}
      </Grid>
    );
  }

  if (error) {
    return null;
  }
  return (
    <Grid item md={6} lg={6} xl={6}>
      <Box className={classes.emptyBox}>
        <ErrorComponent
          message="Desculpe não há registro de problemas
                    no período solicitado."
          image={empty}
          alt="Nenhum(a) problema encontrado"
        />
      </Box>
    </Grid>
  );
};

export default IssueList;
