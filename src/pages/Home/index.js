import React, { useEffect, useState, useContext } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import SearchBar from "../../components/SearchBar/index";

import NavBar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ErrorComponent from "../../components/ErrorComponent";
import IssueForm from "../../components/IssueForm";
import IssueList from "./IssueList";
import ScrollToTop from "../../components/FABScrollToTop/index";

import IssuesService from "../../services/issues";
import { GlobalContext } from "../../providers/GlobalProvider";

import useStyles from "./styles";

import serverDown from "../../assets/serverDown.svg";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [page, setPage] = useState(1);
  const [totalitems, setTotalItems] = useState();

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
      const issues = await IssuesService.getIssues(page);
      setTotalItems(issues.count);
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

  const searchIssues = async (description, startDate, endDate, page = 1) => {
    try {
      setError(undefined);
      const issues = await IssuesService.getIssuesByDescriptionAndOrTime(
        description,
        startDate,
        endDate,
        page
      );
      setTotalItems(issues.count);

      // if the page equals 1 turn the issues list empty first and
      // then appennd the issues results to the list
      if (page === 1) {
        setIssues([]);
      }

      if (issues) {
        setIssues((prevIssues) => {
          return [...new Set([...prevIssues, ...issues.results])];
        });
      }

      // if the search query has more results recursively do new requests
      if (issues.next !== null) {
        searchIssues(description, startDate, endDate, page + 1);
      }

      setError(false);
    } catch (e) {
      setError(e.message);
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
      <Box className={classes.fabWrapper}>
        <ScrollToTop />
      </Box>
      <NavBar error={error} />
      <main>
        {issueFormVisible ? (
          <IssueForm callback={getIssues} />
        ) : (
          <>
            <Grid container direction="column" alignItems="center">
              <Grid className={classes.errorWrapper} sm={12} lg={6} xl={6}>
                {error ? (
                  <ErrorComponent
                    message="Erro ao comunicar-se com o servidor."
                    image={serverDown}
                    alt="Erro ao comunicar-se com o servidor"
                  />
                ) : null}
              </Grid>
            </Grid>
            <SearchBar searchIssues={searchIssues} />
            <Grid
              container
              justifyContent="center"
              className={classes.marginBottom}>
              <IssueList
                data={issues}
                loading={loading}
                error={error}
                handleUpdateItem={handleUpdateItem}
              />
            </Grid>
            <Box className={classes.emptyBox}>
              {issues.length !== totalitems ? <div id="sentinela"></div> : null}
            </Box>
          </>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Home;
