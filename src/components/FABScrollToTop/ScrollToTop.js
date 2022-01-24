import React, { useState } from "react";
import Fab from "@material-ui/core/Fab";
import UpIcon from "@material-ui/icons/KeyboardArrowUp";

import useStyles from "./style";

const ScrollToTop = () => {
  const classes = useStyles();

  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.addEventListener("scroll", checkScrollTop);

  return (
    <Fab
      size="medium"
      color="primary"
      aria-label="add"
      onClick={scrollTop}
      style={{ display: showScroll ? "flex" : "none" }}>
      <UpIcon />
    </Fab>
  );
};

export default ScrollToTop;
