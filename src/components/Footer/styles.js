import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#fff',
    width: '100%',
    position: 'fixed',
    bottom: 0,
    zIndex: 16,
    padding: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center',
  },
}));

export default useStyles;
