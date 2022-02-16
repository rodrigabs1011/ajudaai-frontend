import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Box from "@material-ui/core/Box";
// import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
// import SmsIcon from "@material-ui/icons/Sms";
// import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

import useStyles from "./styles";
import IssuesService from "../../services/issues";

import Vote from "./components/Vote";
import Upvoted from "./components/Upvoted";
import Downvoted from "./components/Downvoted";

import { handleAskForLogin } from "../../utils/core";

import { GlobalContext } from "../../providers/GlobalProvider";

import DefaultImage from "../../assets/defaultIssueImage.svg";

const IssueItem = ({ item, handleUpdateItem }) => {
  const classes = useStyles();

  const location = useLocation();

  const isTablet = useMediaQuery({
    query: "(min-width: 481px) and (max-width: 1124px)",
  });

  const { isAnonymous, isAuthenticated, setAskForLoginVisible } =
    useContext(GlobalContext);

  const [rateLoading, setRateLoading] = useState(false);

  const handleRate = async (upvote) => {
    if (handleAskForLogin({ isAuthenticated, setAskForLoginVisible })) {
      try {
        setRateLoading(true);
        const data = await IssuesService.rateIssue(item.slug, upvote);
        if (data) {
          handleUpdateItem(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setRateLoading(false);
      }
    }
  };
  return (
    <Box className={classes.listItem}>
      {item.image !== null && item.image !== "" ? (
        <div>
          <img
            className={
              location.pathname !== `/issues/${item.slug}/`
                ? classes.issueImage
                : classes.issueBanner
            }
            src={item.image}
            alt="Problema"
          />
        </div>
      ) : (
        <div>
          <img
            className={
              location.pathname !== `/issues/${item.slug}/`
                ? classes.issueImage
                : classes.issueBanner
            }
            src={DefaultImage}
            alt="Problema"
          />
        </div>
      )}
      {item.title.length > 25 &&
      location.pathname !== `/issues/${item.slug}/` ? (
        <Tooltip title={item.title} placement="bottom-start" arrow>
          <Typography variant="h6" color="primary">
            <Link to={`/issues/${item.slug}/`}>
              {isTablet
                ? `${item.title.slice(0, 20).trim()}...`
                : `${item.title.slice(0, 25).trim()}...`}
            </Link>
          </Typography>
        </Tooltip>
      ) : (
        <Typography variant="h6" color="primary">
          <Link to={`/issues/${item.slug}/`}>{item.title}</Link>
        </Typography>
      )}
      {item.description.length > 28 &&
      location.pathname !== `/issues/${item.slug}/` ? (
        <Tooltip title={item.description} placement="bottom-start" arrow>
          <Typography
            variant="body1"
            color="textSecondary"
            style={{ textJustify: "justify" }}>
            {`${item.description.slice(0, 27).trim()}...`}
          </Typography>
        </Tooltip>
      ) : (
        <Typography
          variant="body1"
          color="textSecondary"
          style={{ textJustify: "justify" }}>
          {item.description}
        </Typography>
      )}
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
        {/* <IconButton
          onClick={() => {}}
          component={Link}
          to={`/issues/${item.slug}/?action=comment`}
        >
          <SmsIcon fontSize="small" />
        </IconButton> */}
        {item.vote === null ? (
          <Vote item={item} rateLoading={rateLoading} handleRate={handleRate} />
        ) : null}
        {item.vote === true ? (
          <Upvoted
            item={item}
            rateLoading={rateLoading}
            handleRate={handleRate}
          />
        ) : null}
        {item.vote === false ? (
          <Downvoted
            item={item}
            rateLoading={rateLoading}
            handleRate={handleRate}
          />
        ) : null}

        {/* <IconButton onClick={() => {}}>
          <ErrorOutlineIcon fontSize="small" />
        </IconButton> */}
      </div>
      <Divider />
    </Box>
  );
};

export default IssueItem;
