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
}));

export default useStyles;
