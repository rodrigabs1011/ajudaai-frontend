import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
// import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
// import Divider from "@material-ui/core/Divider";
// import Typography from "@material-ui/core/Typography";

import NavBar from "../../components/Navbar";
import ErrorMsg from "../../components/ErrorMsg";
import IssueForm from "../../components/IssueForm";
import IssueItem from "../../components/IssueItem";

import IssuesService from "../../services/issues";
import { GlobalContext } from "../../providers/GlobalProvider";

import useStyles from "./styles";

import serverDown from "../../assets/serverDown.svg";

const IssueDetail = () => {
  const { id } = useParams();
  const [issue, setIssue] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const { issueFormVisible } = useContext(GlobalContext);

  const classes = useStyles();

  useEffect(() => {
    getIssue(); // eslint-disable-next-line
  }, []);

  const getIssue = async () => {
    try {
      setLoading(true);
      const issue = await IssuesService.getIssueById(id);
      if (issue) setIssue(issue);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateItem = (data) => {
    setIssue(data);
  }

  return (
    <>
      <NavBar />
      <main>
        {issueFormVisible ? (
          <IssueForm />
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
                <Grid container className={classes.issueContent}>
                  <IssueItem item={issue} handleUpdateItem={handleUpdateItem} />
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

export default IssueDetail;
