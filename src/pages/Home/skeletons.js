import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
  row: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "13px",
  },
  skeletonItem: {
    marginRight: theme.spacing(3),
    marginBottom: theme.spacing(3),
    borderRadius: "4px",
  },
}));

const HomeSkeleton = () => {
  const classes = useStyles();

  return (
    <>
      <Grid item>
        <div className={classes.row}>
          <Skeleton
            variant="rect"
            className={classes.skeletonItem}
            width={280}
            height={150}
          />
          <Skeleton
            variant="rect"
            className={classes.skeletonItem}
            width={280}
            height={150}
          />
          <Skeleton
            variant="rect"
            className={classes.skeletonItem}
            width={280}
            height={150}
          />
          <Skeleton
            variant="rect"
            className={classes.skeletonItem}
            width={280}
            height={150}
          />
        </div>
      </Grid>
    </>
  );
};

export default HomeSkeleton;
