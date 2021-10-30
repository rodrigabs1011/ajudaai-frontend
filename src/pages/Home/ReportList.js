import React from "react";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";

import SmsIcon from "@material-ui/icons/Sms";

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
        <Grid
          // style={{padding: '16px', border: 'solid 1px #e3e3e3', borderRadius: '4px', margin: '8px'}}
          item
          key={item.id}
          xs={12}
          sm={6}
          md={4}
          lg={3}
          xl={3}
          className={classes.listItem}
        >
          <Typography variant="h6" color="textPrimary">
            <Link to={`/reports/${item.id}/`}>{item.name}</Link>
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            style={{ textJustify: "justify" }}
          >
            {item.description.length > 28
              ? `${item.description.slice(0, 27).trim()}...`
              : item.description}
          </Typography>
          <Box className={classes.captionWrapper}>
            <Typography variant="caption" color="textSecondary">
              há {item.created_at.slice(-8, -3)}
            </Typography>
            <SmsIcon className={classes.captionIcon}></SmsIcon>
            <Typography variant="caption" color="textSecondary">
              2 Comentários
            </Typography>
          </Box>

          <div className={classes.relevanceWrapper}>
            <IconButton onClick={() => {}}>
            <SmsIcon fontSize="small" />
            </IconButton>
            <div className={classes.relevance}>
              <IconButton onClick={() => {}}>
                <ThumbUpIcon className={classes.relevanceIcon} />
              </IconButton>
              <Typography variant="button" color="textSecondary">
                23
              </Typography>
              <IconButton onClick={() => {}}>
                <ThumbDownIcon className={classes.relevanceIcon} />
              </IconButton>
            </div>
            <IconButton onClick={() => {}}>
              <ErrorOutlineIcon fontSize="small" />
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
