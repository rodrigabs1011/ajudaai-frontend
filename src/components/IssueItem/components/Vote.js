import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import IconButton from "@material-ui/core/IconButton";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";

const useStyles = makeStyles((theme) => ({
  relevance: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: `solid 1px ${theme.palette.text.disabled}`,
    borderRadius: "20px",
    maxHeight: "38px",
  },
  relevanceIcon: {
    fontSize: "16px",
  },
}));

const Vote = ({ item, handleRate, rateLoading }) => {
  const classes = useStyles();

  return (
    <div className={classes.relevance}>
      <IconButton
        disabled={rateLoading}
        onClick={() => {
          handleRate(true);
        }}>
        <ThumbUpIcon className={classes.relevanceIcon} />
      </IconButton>
      <Typography variant="button" color="textSecondary">
        {item.upvotes - item.downvotes}
      </Typography>
      <IconButton
        disabled={rateLoading}
        onClick={() => {
          handleRate(false);
        }}>
        <ThumbDownIcon className={classes.relevanceIcon} />
      </IconButton>
    </div>
  );
};

export default Vote;
