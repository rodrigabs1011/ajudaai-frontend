import React from "react";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TurnedInNotIcon from "@material-ui/icons/TurnedInNot";

import useStyles from "./styles";
import Typography from '@material-ui/core/Typography'

const SquadList = (props) => {
  const { squads } = props;
  const classes = useStyles();

  if (squads.length > 0) {
    return (
      <ul className={classes.squadList}>
        {squads.map((squad) => {
          return (
            <li className={classes.squadItem} key={squad.id}>
              <Link className="flex items-center" to={`/squads/${squad.id}/`}>
                <Button
                  startIcon={<TurnedInNotIcon></TurnedInNotIcon>}
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  {squad.name}
                </Button>
              </Link>
            </li>
          );
        })}
      </ul>
    );
  } else {
    return (
      <Grid container alignItems="center" justifyContent="flex-start">
        <TurnedInNotIcon style={{color: '#666666'}}></TurnedInNotIcon>
        <Typography variant="body1" className={classes.emptyText} color="initial">Nenhuma Squad</Typography>
      </Grid>
    );
  }
};

export default SquadList;
