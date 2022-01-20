import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  searchBar: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    [theme.breakpoints.between("xs", "sm")]: {
      flexDirection: "column",
    },
    [theme.breakpoints.between("sm", "md")]: {
      flexDirection: "column",
    },
  },
  searchBarItem: {
    margin: theme.spacing(2),
  },
  searchBarTextFiel: {
    margin: theme.spacing(2),
    width: "30%",
    [theme.breakpoints.between("xs", "sm")]: {
      width: "auto",
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: "auto",
    },
  },
}));

export default useStyles;
