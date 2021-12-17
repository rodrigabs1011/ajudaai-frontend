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
  const [page, setPage] = useState(1);

  const { issueFormVisible, issues, setIssues } = useContext(GlobalContext);
  const classes = useStyles();

  useEffect(() => {
    getIssues(page); //eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    // Observe the sentinel element, when it's finded
    // change the page's value to do a new request
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setPage((currentPageInsideState) => currentPageInsideState + 1);
      }
    });

    intersectionObserver.observe(document.querySelector("#sentinela"));

    return () => intersectionObserver.disconnect();
  }, []);

  const getIssues = async (page) => {
    try {
      setError(undefined);
      const issues = await IssuesService.getAllIssues(page);
      if (issues)
        setIssues((prevIssues) => {
          return [...new Set([...prevIssues, ...issues.results])];
        });
      setError(false);
    } catch (e) {
      if (issues.length > 0) return;
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
  };

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
              <IssueList
                data={issues}
                loading={loading}
                error={error}
                handleUpdateItem={handleUpdateItem}
              />
            </Grid>
          </>
        )}
      </main>
      <div id="sentinela"></div>

      <Footer />
    </>
  );
};

export default Home;
