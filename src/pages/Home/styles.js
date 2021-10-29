import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  pageTitle: {
    fontSize: '34px',
    fontWeight: 'normal',
    color: theme.palette.text.primary,
  },
  tribeName: {
    fontSize: '20px',
    fontWeight: 500,
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
  },
  squadList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  squadItem: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  marginBottom: {
    marginBottom: theme.spacing(2),
  },
  emptyText: {
    color: '#666666',
  },
  row: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '13px',
  },
}));

export default useStyles;
