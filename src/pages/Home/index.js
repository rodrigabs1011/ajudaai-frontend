import React, { useEffect, useState, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import NavBar from "../../components/Navbar";
import ErrorMsg from "../../components/ErrorMsg";
import ReportForm from "../../components/ReportForm";
import ReportList from "./ReportList";

import ReportClient from "../../services/reports";
import { GlobalContext } from "../../providers/GlobalProvider";

import useStyles from "./styles";

const Home = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const { reportFormVisible } = useContext(GlobalContext);

  const classes = useStyles();

  useEffect(() => {
    getReports(); // eslint-disable-next-line
  }, []);

  const getReports = async () => {
    try {
      setLoading(true);
      const reports = await ReportClient.getReports();
      if (reports) setReports(reports);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      {JSON.stringify(reports)}
      <main>
        {/* <Grid container className={classes.marginBottom}>
          <Typography variant="h2" className={classes.pageTitle}>
            Últimos ajudaaís!
          </Typography>
        </Grid> */}
        {reportFormVisible ? (
          <ReportForm />
        ) : (
          <>
            <Grid container>
              <Grid item>
                <ErrorMsg error={error} className={classes.marginBottom} />
              </Grid>
            </Grid>
            <Grid container className={classes.marginBottom}>
              <ReportList data={reports} loading={loading} error={error} />
            </Grid>
          </>
        )}
      </main>
    </>
  );
};

export default Home;
