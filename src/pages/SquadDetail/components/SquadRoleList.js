import React from "react";

import { Divider, Grid, Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";

import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import SyncIcon from "@material-ui/icons/Sync";
import DeleteIcon from "@material-ui/icons/Delete";

import { SquadRoleListSkeleton } from "./skeletons";

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

const SquadRoleListHeader = () => {
  const classes = useStyles();

  return (
    <div className={classes.row}>
      <Typography variant="h3" className={classes.heading}>
        Membros
      </Typography>
      <IconButton>
        <SyncIcon style={{ color: "#212121" }} />
      </IconButton>
      <IconButton>
        <AddIcon style={{ color: "#212121" }} />
      </IconButton>
    </div>
  );
};

const SquadRoleListBody = ({ squadRoles }) => {
  const classes = useStyles();
  if (squadRoles.length === 0) return "Nenhum(a)";
  return (
    <div className={classes.items}>
      {squadRoles.map((squadRole) => {
        return (
          <div className={classes.item} key={squadRole.id}>
            <div className={classes.itemContent}>
              <div className={classes.itemText}>
                <Typography variant="subtitle2" className={classes.itemTitle}>
                  {squadRole.first_name
                    ? squadRole.first_name
                    : squadRole.username}
                </Typography>
                <div className={classes.rolesChips}>
                  {squadRole.roles.map((role) => {
                    return (
                      <div key={role.id} className={classes.roleChip}>
                        {role.name}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className={classes.itemActions}>
                <IconButton>
                  <DeleteIcon style={{ color: "#666666" }} />
                </IconButton>
              </div>
            </div>
            <Divider />
          </div>
        );
      })}
    </div>
  );
};

const SquadRoleList = (props) => {
  const {loading} = props;
  const classes = useStyles();
  if (loading) return <SquadRoleListSkeleton />;
  return (
    <div className={classes.root}>
      <SquadRoleListHeader />
      <SquadRoleListBody {...props} />
    </div>
  );
};

export default SquadRoleList;
