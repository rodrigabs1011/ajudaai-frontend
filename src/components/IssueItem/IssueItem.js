import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import SmsIcon from "@material-ui/icons/Sms";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

import useStyles from "./styles";
import IssuesService from "../../services/issues";

import Vote from "./components/Vote";
import Upvoted from "./components/Upvoted";
import Downvoted from "./components/Downvoted";
import AskForLogin from "../AskForLogin";

import { GlobalContext } from "../../providers/GlobalProvider";

const IssueItem = ({ item, handleUpdateItem }) => {
  const classes = useStyles();

  const { isAnonymous, isAuthenticated, askForLoginVisible, setAskForLoginVisible } = useContext(GlobalContext);

  const [rateLoading, setRateLoading] = useState(false);

  const handleRate = async (id, upvote) => {
    if(!isAnonymous && !isAuthenticated) {
      setAskForLoginVisible(true);
      return;
    }
    try {
      setRateLoading(true);
      const data = await IssuesService.rateIssue(id, upvote);
      if (data) {
        handleUpdateItem(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setRateLoading(false);
    }
  };

  return (
    <Box className={classes.listItem}>
      {askForLoginVisible ? <AskForLogin /> : null}


      {JSON.stringify({isAuthenticated, isAnonymous})}

      <Typography variant="h6" color="primary">
        <Link to={`/issues/${item.id}/`}>{item.title}</Link>
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
          Em {item.created_at.slice(0, -3)}
        </Typography>
        {/* <SmsIcon className={classes.captionIcon}></SmsIcon>
        <Typography variant="caption" color="textSecondary">
          2 Comentários
        </Typography> */}
      </Box>

      <div className={classes.relevanceWrapper}>
        <IconButton
          onClick={() => {}}
          component={Link}
          to={`/issues/${item.id}/?action=comment`}
        >
          <SmsIcon fontSize="small" />
        </IconButton>
        {item.vote === null ? (
          <Vote item={item} rateLoading={rateLoading} handleRate={handleRate} />
        ) : null}
        {item.vote === true ? (
          <Upvoted item={item} rateLoading={rateLoading} handleRate={handleRate} />
        ) : null}
        {item.vote === false ? (
          <Downvoted item={item} rateLoading={rateLoading} handleRate={handleRate} />
        ) : null}

        <IconButton onClick={() => {}}>
          <ErrorOutlineIcon fontSize="small" />
        </IconButton>
      </div>
      <Divider />
    </Box>
  );
};

export default IssueItem;
