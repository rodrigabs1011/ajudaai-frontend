import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  searchBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    [theme.breakpoints.down("801")]: {
      width: "300px",
      padding: theme.spacing(1),
      flexDirection: "column",
      backgroundColor: "#FFF",
      top: "50%",
      left: "50%",
      position: "absolute",
      transform: "translate(-50%, -50%)",
      borderRadius: theme.spacing(1),
    },
  },
  searchBarTitle: {
    [theme.breakpoints.up("800")]: {
      display: "none",
    },
  },
  searchBarItem: {
    margin: theme.spacing(2),
    [theme.breakpoints.between("lg", "xl")]: {
      width: "150px",
    },
  },
  customSearchBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    [theme.breakpoints.between("800", "1281")]: {
      width: "300px",
      padding: theme.spacing(2),
      flexDirection: "column",
      backgroundColor: "#FFF",
      top: "50%",
      left: "50%",
      position: "absolute",
      transform: "translate(-50%, -50%)",
      borderRadius: theme.spacing(1),
    },
  },
  searchBarTextFiel: {
    margin: theme.spacing(2),
    [theme.breakpoints.between("xs", "800")]: {
      width: "auto",
    },
    [theme.breakpoints.between("801", "md")]: {
      width: "201px",
    },
  },
  comboBox: {
    width: "200px",
    margin: theme.spacing(2),
    [theme.breakpoints.between("xs", "801")]: {
      width: "244px",
    },
    [theme.breakpoints.between("802", "md")]: {
      width: "160px",
    },
  },
}));

export default useStyles;
