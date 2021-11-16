import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
// import SmsIcon from "@material-ui/icons/Sms";
import IconButton from "@material-ui/core/IconButton";
// import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";

import useStyles from "./styles";
import ReportService from "../../services/reports";
import { GlobalContext } from "../../providers/GlobalProvider";

const ReportItem = ({ item }) => {
  const classes = useStyles();

  const [rateLoading, setRateLoading] = useState(false);
  const { reports, setReports } = useContext(GlobalContext);

  const handleRate = async (item, upvote) => {
    try {
      setRateLoading(true);
      const data = await ReportService.rateReport(
        item.id,
        upvote
      );
      if (data) {
        const auxReports = reports.map((report) => {
          if (item.id === report.id) {
            return { ...item, upvotes: data.upvotes, downvotes: data.downvotes };
          }
          return report;
        });
        setReports(auxReports);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setRateLoading(false);
    }
  };

  return (
    <Box className={classes.listItem}>
      <Typography variant="h6" color="primary">
        <Link to={`/reports/${item.id}/`}>{item.title}</Link>
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
        {/* <IconButton
          onClick={() => {}}
          component={Link}
          to={`/reports/${item.id}/?action=comment`}
        >
          <SmsIcon fontSize="small" />
        </IconButton> */}
        <div className={classes.relevance}>
          <IconButton
            disabled={rateLoading}
            onClick={() => {
              handleRate(item, true);
            }}
          >
            <ThumbUpIcon className={classes.relevanceIcon} />
          </IconButton>
          <Typography variant="button" color="textSecondary">
            {item.upvotes - item.downvotes}
          </Typography>
          <IconButton
            disabled={rateLoading}
            onClick={() => {
              handleRate(item, false);
            }}
          >
            <ThumbDownIcon className={classes.relevanceIcon} />
          </IconButton>
        </div>
        {/* <IconButton onClick={() => {}}>
          <ErrorOutlineIcon fontSize="small" />
        </IconButton> */}
      </div>
      <Divider />
    </Box>
  );
};

export default ReportItem;
