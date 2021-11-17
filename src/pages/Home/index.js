import React, { useEffect, useState, useContext } from "react";
import Grid from "@material-ui/core/Grid";

import NavBar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ErrorMsg from "../../components/ErrorMsg";
import IssueForm from "../../components/IssueForm";
import IssueList from "./IssueList";

import IssuesService from "../../services/issues";
import { GlobalContext } from "../../providers/GlobalProvider";

import useStyles from "./styles";

import serverDown from "../../assets/serverDown.svg";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const { issueFormVisible, issues, setIssues } = useContext(GlobalContext);

  const classes = useStyles();

  useEffect(() => {
    getIssues(); // eslint-disable-next-line
  }, []);

  const getIssues = async () => {
    try {
      setLoading(true);
      setError(undefined);
      const issues = await IssuesService.getAllIssues();
      if (issues) setIssues(issues);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateItem = (data) => {
    const auxIssues = issues.map((issue) => {
      if (data.id === issue.id) {
        return {
          ...data,
        };
      }
      return issue;
    });
    setIssues(auxIssues);
  }

  return (
    <>
      <NavBar />
      <main>
        {issueFormVisible ? (
          <IssueForm callback={getIssues} />
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
              <IssueList data={issues} loading={loading} error={error} handleUpdateItem={handleUpdateItem} />
            </Grid>
          </>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Home;
