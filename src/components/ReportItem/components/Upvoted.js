import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";

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
    margin: "0 12px",
    color: theme.palette.text.secondary,
  },
  relevanceIconLabel: {
    color: theme.palette.primary.main,
    fontSize: "16px",
    margin: "0 12px",
  },
}));

const Upvoted = ({ item, handleRate, rateLoading }) => {
  const classes = useStyles();

  return (
    <Button
      className={classes.relevance}
      onClick={() => {
        handleRate(item.id, true);
      }}
      disabled={rateLoading}
    >
      <CloseIcon className={classes.relevanceIcon} />
      <Typography variant="button" color="textSecondary">
        {item.upvotes - item.downvotes}
      </Typography>
      <ThumbUpIcon className={classes.relevanceIconLabel} />
    </Button>
  );
};

export default Upvoted;
