import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#fff',
    width: '100%',
    padding: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center',
  },
}));

export default useStyles;
