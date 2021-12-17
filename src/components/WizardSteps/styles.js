import { makeStyles } from "@material-ui/core/styles";

import { defaultAnimDuration } from "../../utils/core";

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.main,
    width: "100%",
    position: "fixed",
    zIndex: 16,
    boxShadow: "0px 4px 8px 0px #0000001F",
  },
  fixedHeader: {
    background: theme.palette.primary.main,
    left: 0,
    right: 0,
    transition: `all ${defaultAnimDuration}`,
  },
  nav: {
    padding: "34px 89px",
  },
  brandWrapper: {
    display: "flex",
  },
  brandImage: {
    marginRight: theme.spacing(1),
    height: "20px",
  },
  brandText: {
    color: theme.palette.background.default,
    letterSpacing: ".15px",
    fontSize: "20px",
    fontWeight: 500,
    marginRight: theme.spacing(1),
  },
  navList: {
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(2),
  },
  navItem: {
    color: theme.palette.background.default,
    margin: `0 ${theme.spacing(1)}px`,
  },
  row: {
    display: "flex",
    alignItems: "center",
  },
}));

export default useStyles;
