import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({

  formRoot: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    minWidth: '280px',
  },
  loginSubmit: {
    marginTop: theme.spacing(2),
  },
}));

export default useStyles;
