import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  pageTitle: {
    fontSize: "34px",
    fontWeight: "normal",
    color: theme.palette.text.primary,
  },
  listItem: {
    padding: `0 ${theme.spacing(2)}px 0 ${theme.spacing(2)}px`,
  },
  cationWrapper: {
    display: "flex",
    alignItems: "centeer",
    marginTop: theme.spacing(2)
  },
  captionIcon: {
    color: theme.palette.text.secondary,
    height: 20,
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
}));

export default useStyles;
