import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  issueContent: {
    display: "flex",
    flexDirection: "column",
  },
  comentaryRoot: {
    paddingBottom: theme.spacing(2),
  },
  comentaryForm: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  comentaryFormSubmit: {
    marginTop: "4px",
    marginLeft: theme.spacing(1),
  },
}));

export default useStyles;
