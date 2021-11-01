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
import ReportService from "../../services/reports";
import WizardSteps from "../WizardSteps";
import ErrorMsg from "../ErrorMsg";
import requestFormIllustration from "../../assets/requestFormIllustration.svg";

const labels = ["Informações Iniciais", "A melhor Imagem", "Resumo"];

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
    width: "100%",
  },
  motivationalText: {
    textAlign: "center",
    fontSize: "20px",
    fontWeight: 500,
    maxWidth: "500px",
  },
  relatedItemsTitle: {
    width: "100%",
    textAlign: "center",
  },
  similarReportList: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "flex-start",
    width: "100%",
    paddingTop: theme.spacing(1),
  },
  similarReportItem: {
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
}));

const FormComplementar = ({
  similarReports,
  similarReportsLoading,
  similarReportsError,
  step,
  setReportFormVisible,
}) => {
  const classes = useStyles();

  return (
    <>
      <ErrorMsg error={similarReportsError} />

      {similarReports.length > 0 && step === 1 ? (
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
          <Box className={classes.similarReportList}>
            {similarReports.map((item) => {
              return (
                <Link
                  key={item.id}
                  className={classes.similarReportItem}
                  to={`/reports/${item.id}/`}
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(`/reports/${item.id}/`);
                  }}
                >
                  <Typography
                    className={classes.relatedItemContent}
                    variant="body1"
                    color="primary"
                  >
                    {item.name}
                  </Typography>
                  <Divider />
                  {/* <ReportItem item={item} className={classes.similarReportItem} /> */}
                </Link>
              );
            })}
          </Box>
        </Box>
      ) : (
        <>
          {similarReportsLoading ? (
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

const ReportForm = () => {
  const classes = useStyles();
  const { setReportFormVisible } = useContext(GlobalContext);
  const [wizardLabel, setWizardLabel] = useState("Informações Iniciais");
  const [wizardStep, setWizardStep] = useState(0);

  const [formData, setFormData] = useState({
    image: undefined,
    description: "",
  });
  const [formImageError, setFormImageError] = useState();

  const [similarReports, setSimilarReports] = useState([]);
  const [similarReportsLoading, setSimilarReportsLoading] = useState(false);
  const [similarReportsError, setSimilarReportsError] = useState([]);

  const getSimilarReports = async () => {
    try {
      setSimilarReportsError(undefined);
      setSimilarReportsLoading(true);
      const reports = await ReportService.getSimilarReports(formData);
      if (reports) setSimilarReports(reports);
    } catch (e) {
      setSimilarReportsError(e.message);
    } finally {
      setSimilarReportsLoading(false);
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    setFormImageError(undefined);
    if (acceptedFiles.length === 1) {
      const fileName = acceptedFiles[0].name;
      if (['svg', 'png', 'jpeg', 'jpg', 'gif'].includes(fileName.split('.').at(-1).toLowerCase())) {
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
    }  // eslint-disable-next-line
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} sm={6} md={6} lg={6} xl={6} className={classes.root}>
        <Box className={classes.wizardTop}>
          <WizardSteps steps={3} current={wizardStep} label={wizardLabel} />
        </Box>
        <form className={classes.form}>
          {wizardStep === 0 ? (
            <>
              <Typography variant="h6" color="textSecondary">
                Conte-nos o que você encontrou!
              </Typography>
              <TextField
                id="description"
                label="Título"
                variant="outlined"
                margin="dense"
                fullWidth
                // value={}
                // onChange={}
              />
              <TextField
                id="description"
                label="Descrição"
                variant="outlined"
                margin="dense"
                fullWidth
                // value={}
                // onChange={}
              />

              <Box className={classes.actionsWrapper}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setWizardStep(1);
                    setWizardLabel(labels[1]);
                    getSimilarReports();
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
                  variant="outlined"
                  onClick={() => {
                    setWizardStep(0);
                    setWizardLabel(labels[0]);
                  }}
                  className={classes.marginRight}
                >
                  Voltar
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setWizardStep(2);
                    setWizardLabel(labels[2]);
                  }}
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
              <Typography variant="subtitle1" color="textSecondary">
                Dummy Title Item!
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Mussum Ipsum dolor met!
              </Typography>
              <Box className={classes.actionsWrapper}>
                <Button
                  variant="outlined"
                  className={classes.marginRight}
                  onClick={() => {
                    setWizardStep(1);
                    setWizardLabel(labels[1]);
                  }}
                >
                  Voltar
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setReportFormVisible(false);
                  }}
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
          similarReports={similarReports}
          similarReportsLoading={similarReportsLoading}
          similarReportsError={similarReportsError}
          step={wizardStep}
          setReportFormVisible={setReportFormVisible}
        />
      </Grid>
    </Grid>
  );
};

export default ReportForm;
