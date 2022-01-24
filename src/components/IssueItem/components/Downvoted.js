import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
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
    margin: "0 12px",
    color: theme.palette.text.secondary,
  },
  relevanceIconLabel: {
    color: theme.palette.secondary.light,
    fontSize: "16px",
    margin: "0 12px",
  },
}));

const Downvoted = ({ item, handleRate, rateLoading }) => {
  const classes = useStyles();

  return (
    <Button
      className={classes.relevance}
      onClick={() => {
        handleRate(true);
      }}
      disabled={rateLoading}>
      <CloseIcon className={classes.relevanceIcon} />
      <Typography variant="button" color="textSecondary">
        {item.upvotes - item.downvotes}
      </Typography>
      <ThumbDownIcon className={classes.relevanceIconLabel} />
    </Button>
  );
};

export default Downvoted;
