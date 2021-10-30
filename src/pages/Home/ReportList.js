import React from "react";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from '@material-ui/icons/Add';

import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

import SmsIcon from '@material-ui/icons/Sms';

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
        <Grid item key={item.id} md={4} lg={3} xl={3} className={classes.listItem}>
          <Typography variant="caption" color="textSecondary">
            há {item.created_at.slice(-8, -3)}
          </Typography>
          <Typography variant="h5" color="textPrimary">
            <Link to={`/reports/${item.id}/`}>{item.name}</Link>
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {item.description}
          </Typography>

          <Box className={classes.cationWrapper}>
            <SmsIcon className={classes.captionIcon}></SmsIcon>
            <Typography variant="caption" color="textSecondary">
              2 Comentários
            </Typography>
          </Box>

          <div>
            <IconButton onClick={() => {}}>
              <RemoveIcon />
            </IconButton>
            <Typography variant="button" color="textSecondary">23</Typography>
            <IconButton onClick={() => {}}>
              <AddIcon />
            </IconButton>
          </div>
          <Divider />
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
