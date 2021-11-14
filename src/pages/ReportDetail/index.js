import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import NavBar from "../../components/Navbar";
import ErrorMsg from "../../components/ErrorMsg";
import ReportForm from "../../components/ReportForm";

import ReportClient from "../../services/reports";
import { GlobalContext } from "../../providers/GlobalProvider";

import useStyles from "./styles";

import serverDown from "../../assets/serverDown.svg";

const ReportDetail = () => {
  const { id } = useParams();
  const [report, setReport] = useState();
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
      const report = await ReportClient.getReportById(id);
      if (report) setReport(report);
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
              {error ? (
                <Grid item sm={12} lg={6} xl={6}>
                  <img
                    src={serverDown}
                    alt="Erro ao comunicar-se com o servidor."
                    width="100%"
                  />
                </Grid>
              ) : null}
            </Grid>
            {loading ? (
              "Loading"
            ) : (
              <>
                <Grid container className={classes.reportContent}>
                  <Typography variant="h6" color="textSecondary">
                    Mussum Ipsum Dolor Met
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {report.description}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Ajudometro: {report.relevance}
                  </Typography>
                </Grid>
                {/* <Divider />
                <Grid
                  container
                  direction="column"
                  className={classes.comentaryRoot}
                >
                  <Typography variant="h6" color="textSecondary">
                    Comentários
                  </Typography>
                  <Box>
                    <Typography variant="body1" color="textSecondary">
                      Comentary List!
                    </Typography>
                  </Box>
                </Grid> */}
              </>
            )}
          </>
        )}
      </main>
    </>
  );
};

export default ReportDetail;
