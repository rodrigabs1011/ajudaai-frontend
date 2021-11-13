import React, { useEffect, useState, useContext } from "react";
import Grid from "@material-ui/core/Grid";

import NavBar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ErrorMsg from "../../components/ErrorMsg";
import ReportForm from "../../components/ReportForm";
import ReportList from "./ReportList";

import ReportService from "../../services/reports";
import { GlobalContext } from "../../providers/GlobalProvider";

import useStyles from "./styles";

import serverDown from "../../assets/serverDown.svg";

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
      const reports = await ReportService.getReports();
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
      <main>
        {reportFormVisible ? (
          <ReportForm />
        ) : (
          <>
            <Grid container direction="column" alignItems="center">
              <Grid item>
                <ErrorMsg error={error} className={classes.errorMessage} />
              </Grid>
              <Grid item sm={12} lg={6} xl={6}>
                {error ? (
                  <img
                    src={serverDown}
                    alt="Erro ao comunicar-se com o servidor."
                    width="100%"
                  />
                ) : null}
              </Grid>
            </Grid>
            <Grid container className={classes.marginBottom}>
              <ReportList data={reports} loading={loading} error={error} />
            </Grid>
          </>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Home;
