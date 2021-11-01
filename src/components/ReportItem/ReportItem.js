import React from "react";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import SmsIcon from "@material-ui/icons/Sms";
import IconButton from "@material-ui/core/IconButton";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";

import useStyles from "./styles";

const ReportItem = ({item, }) => {
  const classes = useStyles();

  return (
    <Box className={classes.listItem}>
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
    </Box>
  );
};

export default ReportItem;
