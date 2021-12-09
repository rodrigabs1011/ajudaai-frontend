import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
// import Box from "@material-ui/core/Box";
// import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
// import TextField from "@material-ui/core/TextField";
// import Typography from "@material-ui/core/Typography";

import NavBar from "../../components/Navbar";
import ErrorMsg from "../../components/ErrorMsg";
import IssueForm from "../../components/IssueForm";
import IssueItem from "../../components/IssueItem";

import IssuesService from "../../services/issues";
// import CommentsService from "../../services/comments";
import { GlobalContext } from "../../providers/GlobalProvider";

import useStyles from "./styles";

import serverDown from "../../assets/serverDown.svg";

const IssueDetail = () => {
  const { slug } = useParams();
  const [issue, setIssue] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  // const [comments, setComments] = useState([]);
  // const [commentsLoading, setCommentsLoading] = useState(true);
  // const [commentsError, setCommentsError] = useState();

  // const [commentary, setCommentary] = useState("");
  // const [commentaryLoading, setCommentaryLoading] = useState(false);
  // const [commentaryError, setCommentaryError] = useState(error);

  const { issueFormVisible } = useContext(GlobalContext);

  // const commentaryInputRef = useRef(null);

  const classes = useStyles();

  const getIssue = async () => {
    try {
      setLoading(true);
      const issue = await IssuesService.getIssueBySlug(slug);
      if (issue) setIssue(issue);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateItem = (data) => {
    setIssue(data);
  };

  // const getComments = async () => {
  //   try {
  //     setCommentsLoading(true);
  //     setCommentsError(undefined);
  //     const comments = await IssuesService.getIssueComments(slug);
  //     if (comments) setComments(comments);
  //   } catch (e) {
  //     setCommentsError(e.message);
  //   } finally {
  //     setCommentsLoading(false);
  //   }
  // };

  // const handleChange = (e) => {
  //   setCommentary(e.target.value);
  // };

  // const handleSubmit = async () => {
  //   try {
  //     setCommentaryLoading(true);
  //     setCommentaryError(undefined);
  //     const data = await CommentsService.addCommentary({issue: issue.id, text: commentary, user: 0 });
  //   } catch(e) {
  //     setCommentaryError(e.message);
  //   } finally {
  //     setCommentaryLoading(false);
  //   }
  // };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("action") === "comment") {
      // focusComentaryInput
    }
    getIssue();
    // getComments();
    // eslint-disable-next-line
  }, []);

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
                {/* <Grid
                  container
                  direction="column"
                  className={classes.comentaryRoot}
                >
                  <Typography variant="h6" color="textSecondary">
                    Comentários
                  </Typography>
                  <Box className={classes.comentaryForm}>
                    <TextField
                      id="commentary"
                      name="commentary"
                      label="Adicionar Comentário"
                      placeholder="Adicionar Comentário"
                      variant="outlined"
                      margin="dense"
                      fullWidth
                      disabled={commentaryLoading}
                      value={commentary}
                      onChange={handleChange}
                    />
                    <div>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        className={classes.comentaryFormSubmit}
                      >
                        Enviar
                      </Button>
                    </div>
                  </Box>
                  {commentsError ? (
                    <ErrorMsg error={commentsError} />
                  ) : (
                    <Box>
                      {comments.length > 0 ? (
                        comments.map((comment) => {
                          return (
                            <Typography variant="body1" color="textSecondary">
                              {comment.text}
                            </Typography>
                          );
                        })
                      ) : (
                        <Typography variant="body1" color="textSecondary">
                          Nenhum comentário ainda
                        </Typography>
                      )}
                    </Box>
                  )}
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
