import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "21px",
  },
  heading: {
    fontSize: "20px",
    fontWeight: 500,
    color: "#212121",
    marginRight: theme.spacing(2),
  },
  row: {
    display: "flex",
    alignItems: "center",
  },
  items: {
    marginTop: "4px",
  },
  itemContent: {
    display: "flex",
    justifyContent: "space-between",
  },
  itemText: {
    display: "flex",
    alignItems: "center",
    marginTop: "13px",
    marginBottom: "13px",
  },
  itemActions: {
    display: "flex",
    alignItems: "center",
  },
  itemTitle: {
    fontSize: "16px",
  },
  rolesChips: {
    display: "flex",
    margin: "8px",
  },
  roleChip: {
    fontSize: "14px",
    marginRight: "4px",
    backgroundColor: "#eeeeee",
    padding: "0 8px",
    borderRadius: "16px",
  },
  noPadding: {
    padding: 0,
  },
}));

const SquadRoleListSkeleton = (props) => {
  const classes = useStyles();

  return (
    <Grid className={classes.root}>
      <div className={classes.row}>
        <Skeleton
          variant="rect"
          style={{
            marginRight: "8px",
            marginBottom: "8px",
            borderRadius: "4px",
          }}
          width={159}
          height={24}
        />
      </div>
      <div className={classes.row}>
        <Skeleton
          variant="rect"
          style={{
            marginBottom: "8px",
            borderRadius: "4px",
          }}
          width="100%"
          height={64}
        />
      </div>
    </Grid>
  );
};

export { SquadRoleListSkeleton };
