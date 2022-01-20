import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  pageTitle: {
    fontSize: "34px",
    fontWeight: "normal",
    color: theme.palette.text.primary,
  },
  listItem: {
    marginBottom: theme.spacing(6),
    padding: theme.spacing(3),
    width: "100%",
  },
  captionWrapper: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(1),
  },
  captionIcon: {
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(1),
    height: 20,
  },
  relevanceWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
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
  issueImage: {
    [theme.breakpoints.between("xs", "sm")]: {
      width: "290px",
      height: "150px",
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: "260px",
      height: "150px",
    },
    [theme.breakpoints.between("md", "lg")]: {
      width: "260px",
      height: "150px",
    },
    [theme.breakpoints.between("lg", "xl")]: {
      width: "270px",
      height: "150px",
    },
  },
  issueBanner: {
    width: "100%",
    height: "150px",
  },
}));

export default useStyles;
