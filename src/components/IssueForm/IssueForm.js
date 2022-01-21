import React, { useState, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import CircularProgress from "@material-ui/core/CircularProgress";
import PublishIcon from "@material-ui/icons/Publish";

import { GlobalContext } from "../../providers/GlobalProvider";
import IssuesService from "../../services/issues";
import WizardSteps from "../WizardSteps";
import ErrorMsg from "../ErrorMsg";
import requestFormIllustration from "../../assets/requestFormIllustration.svg";

const labels = ["A melhor Imagem", "Informações Iniciais", "Resumo"];

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "calc(100vh - 200px)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    position: "relative",
  },
  wizardTop: {
    marginTop: "-21px",
    position: "absolute",
    top: "34px",
    left: "0",
    right: "0",
    transform: "translateY(-50%)",
  },
  form: {
    paddingTop: "34px",
  },
  actionsWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: theme.spacing(2),
  },
  marginRight: {
    marginRight: theme.spacing(2),
  },
  motivationalGrid: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
  },
  motivationalWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  motivationalImage: {
    maxWidth: "500px",
    height: "75%",
  },
  motivationalText: {
    textAlign: "center",
    fontSize: "20px",
    fontWeight: 500,
    maxWidth: "500px",
  },
  relatedItemsTitle: {
    width: "100%",
  },
  similarIssueList: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "flex-start",
    width: "100%",
    paddingTop: theme.spacing(1),
  },
  similarIssueItem: {
    width: "100%",
  },
  similarHeadingDescription: {
    display: "inline",
    margin: "0 4px -4px 4px",
  },
  relatedItemContent: {
    margin: `${theme.spacing(2)}px 0`,
  },
  similarWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  marginTop: {
    marginTop: theme.spacing(2),
  },
  marginLeft: {
    marginLeft: theme.spacing(2),
  },
}));

const FormComplementar = ({
  similarIssues,
  similarIssuesLoading,
  similarIssuesError,
  step,
  setIssueFormVisible,
}) => {
  const classes = useStyles();

  return (
    <>
      <ErrorMsg error={similarIssuesError} />

      {similarIssues.length > 0 && step === 1 ? (
        <Box className={classes.similarWrapper}>
          <Typography
            variant="h6"
            color="textSecondary"
            className={classes.relatedItemsTitle}
          >
            Dá uma olhada se seu ajuda aí já não foi postado!
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Se já foi publicado que tal somar esforços no mesmo post fazendo um
            comentário ou dando um
            <ThumbUpIcon
              className={classes.similarHeadingDescription}
              fontSize="small"
            />
            ?
          </Typography>
          <Box className={classes.similarIssueList}>
            {similarIssues.map((item) => {
              return (
                <Link
                  key={item.id}
                  className={classes.similarIssueItem}
                  to={`/issues/${item.slug}/`}
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(`/issues/${item.slug}/`);
                  }}
                >
                  <Typography
                    className={classes.relatedItemContent}
                    variant="body1"
                    color="primary"
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    className={classes.relatedItemContent}
                    variant="boby2"
                    color="textSecondary"
                  >
                    {item.description}
                  </Typography>
                  <Divider />
                  {/* <IssueItem item={item} className={classes.similarIssueItem} /> */}
                </Link>
              );
            })}
          </Box>
        </Box>
      ) : (
        <>
          {similarIssuesLoading ? (
            <CircularProgress />
          ) : (
            <Box className={classes.motivationalWrapper}>
              <img
                src={requestFormIllustration}
                alt="Imagem de uma mulher segurando coração inflável."
                className={classes.motivationalImage}
              />
              <Typography
                variant="body1"
                color="textSecondary"
                className={classes.motivationalText}
              >
                Você pode postar algo que não está legal e assim contribui com a
                solução!
              </Typography>
            </Box>
          )}
        </>
      )}
    </>
  );
};

const IssueForm = ({ callback }) => {
  const classes = useStyles();
  const { setIssueFormVisible } = useContext(GlobalContext);
  const [wizardLabel, setWizardLabel] = useState("A melhor Imagem");
  const [wizardStep, setWizardStep] = useState(0);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: undefined,
  });
  const [formImageError, setFormImageError] = useState();
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState();

  const [similarIssues, setSimilarIssues] = useState([]);
  const [similarIssuesLoading, setSimilarIssuesLoading] = useState(false);
  const [similarIssuesError, setSimilarIssuesError] = useState([]);

  const getSimilarIssues = async () => {
    try {
      setSimilarIssuesError(undefined);
      setSimilarIssuesLoading(true);
      const issues = await IssuesService.getSimilarIssues(formData);
      if (issues) setSimilarIssues(issues);
    } catch (e) {
      setSimilarIssuesError(e.message);
    } finally {
      setSimilarIssuesLoading(false);
    }
  };

  const handleChange = (e) => {
    const auxData = { ...formData };
    auxData[e.target.name] = e.target.value;
    setFormData(auxData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setFormLoading(true);
      setFormError(undefined);
      await IssuesService.addIssue(formData);
      callback();
      setIssueFormVisible(false);
    } catch (e) {
      setFormError(e.message);
    } finally {
      setFormLoading(true);
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    setFormImageError(undefined);
    if (acceptedFiles.length === 1) {
      const fileName = acceptedFiles[0].name;
      if (
        ["svg", "png", "jpeg", "jpg", "gif"].includes(
          fileName.split(".").at(-1).toLowerCase()
        )
      ) {
        const auxFormData = { ...formData };
        auxFormData.image = acceptedFiles[0];
        var reader = new FileReader();
        reader.onload = function (e) {
          auxFormData.imageSrc = e.target.result;
          setFormData(auxFormData);
        };
        reader.readAsDataURL(acceptedFiles[0]);
      } else {
        setFormImageError("Tipo de arquivo inválido");
      }
    } else {
      setFormImageError("Apenas um arquivo de imagem permitido!");
    } // eslint-disable-next-line
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} sm={6} md={6} lg={6} xl={6} className={classes.root}>
        <Box className={classes.wizardTop}>
          <WizardSteps steps={3} current={wizardStep} label={wizardLabel} />
        </Box>
        <form className={classes.form} onSubmit={handleSubmit}>
          <ErrorMsg error={formError} />
          {wizardStep === 0 ? (
            <>
              <Typography variant="h6" color="textSecondary">
                Conte-nos o que você encontrou!
              </Typography>
              <TextField
                id="title"
                name="title"
                label="Título"
                variant="outlined"
                margin="dense"
                fullWidth
                value={formData.title}
                onChange={handleChange}
              />
              <TextField
                id="description"
                name="description"
                label="Descrição"
                variant="outlined"
                margin="dense"
                fullWidth
                value={formData.description}
                onChange={handleChange}
              />

              <Box className={classes.actionsWrapper}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setWizardStep(wizardStep + 1);
                    setWizardLabel(labels[1]);
                    getSimilarIssues();
                  }}
                  disabled={
                    formData.title.length === 0 ||
                    formData.description.length === 0
                  }
                >
                  Próximo
                </Button>
              </Box>
            </>
          ) : null}
          {wizardStep === 1 ? (
            <>
              <Typography variant="h6" color="textSecondary">
                Você tem uma imagem?
              </Typography>
              <ErrorMsg error={formImageError} />
              <div
                {...getRootProps()}
                style={{
                  border: "solid 1px #0000001f",
                  borderRadius: "4px",
                  padding: "16px 8px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {formData.imageSrc ? (
                  <img
                    width={100}
                    src={formData.imageSrc}
                    alt={formData.description}
                  />
                ) : (
                  <Typography variant="caption" color="textSecondary">
                    <PublishIcon fontSize="large" />
                  </Typography>
                )}
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Solte a imagem aqui!</p>
                ) : (
                  <p>
                    Clique para selecionar ou arraste e solte sua imagem aqui!
                  </p>
                )}
              </div>
              <Box className={classes.actionsWrapper}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setWizardStep(wizardStep + 1);
                    setWizardLabel(labels[wizardStep + 1]);
                  }}
                >
                  Próximo
                </Button>
              </Box>
            </>
          ) : null}
          {wizardStep === 1 ? (
            <>
              <Typography variant="h6" color="textSecondary">
                Conte-nos o que você encontrou!
              </Typography>
              <TextField
                id="title"
                name="title"
                label="Título"
                variant="outlined"
                margin="dense"
                fullWidth
                value={formData.title}
                onChange={handleChange}
              />
              <TextField
                id="description"
                name="description"
                label="Descrição"
                variant="outlined"
                margin="dense"
                fullWidth
                value={formData.description}
                onChange={handleChange}
              />

              <Box className={classes.actionsWrapper}>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setWizardStep(wizardStep - 1);
                    setWizardLabel(labels[wizardStep - 1]);
                  }}
                  className={classes.marginRight}
                >
                  Voltar
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setWizardStep(wizardStep + 1);
                    setWizardLabel(labels[1]);
                    getSimilarIssues();
                  }}
                  disabled={
                    formData.title.length === 0 ||
                    formData.description.length === 0
                  }
                >
                  Próximo
                </Button>
              </Box>
            </>
          ) : null}
          {wizardStep === 2 ? (
            <Box>
              <Typography variant="h6" color="textSecondary">
                Está tudo certo?
              </Typography>
              <Box sx={{ display: "flex" }} className={classes.marginTop}>
                <Box>
                  <img
                    width={150}
                    height={130}
                    src={formData.imageSrc}
                    alt="Problema"
                  />
                </Box>
                <Box className={classes.marginLeft}>
                  <Box>
                    <Typography variant="button" color="textSecondary">
                      Título
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      {formData.title}
                    </Typography>
                  </Box>
                  <Box className={classes.marginTop}>
                    <Typography variant="button" color="textSecondary">
                      Descrição
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      {formData.description}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box className={classes.actionsWrapper}>
                <Button
                  variant="outlined"
                  className={classes.marginRight}
                  onClick={() => {
                    setWizardStep(wizardStep - 1);
                    setWizardLabel(labels[wizardStep - 1]);
                  }}
                >
                  Voltar
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={formLoading}
                >
                  Postar
                </Button>
              </Box>
            </Box>
          ) : null}
        </form>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        lg={6}
        xl={6}
        className={classes.motivationalGrid}
      >
        <FormComplementar
          similarIssues={similarIssues}
          similarIssuesLoading={similarIssuesLoading}
          similarIssuesError={similarIssuesError}
          step={wizardStep}
          setIssueFormVisible={setIssueFormVisible}
        />
      </Grid>
    </Grid>
  );
};

export default IssueForm;
