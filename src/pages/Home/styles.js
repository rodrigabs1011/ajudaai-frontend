import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  pageTitle: {
    fontSize: "34px",
    fontWeight: "normal",
    color: theme.palette.text.primary,
  },
  marginBottom: {
    marginBottom: theme.spacing(2),
  },
  emptyText: {
    color: "#666666",
  },
  errorMessage: {
    marginBottom: theme.spacing(3),
  },
  row: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "13px",
  },
  emptyBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  fabWrapper: {
    position: "fixed",
    zIndex: 20,
    [theme.breakpoints.between("xs", "sm")]: {
      right: "35px",
      bottom: "30px",
    },
    [theme.breakpoints.between("sm", "md")]: {
      right: "50px",
      bottom: "50px",
    },
    [theme.breakpoints.between("md", "lg")]: {
      right: "50px",
      bottom: "50px",
    },
    [theme.breakpoints.between("lg", "xl")]: {
      right: "80px",
      bottom: "50px",
    },
  },
}));

export default useStyles;
