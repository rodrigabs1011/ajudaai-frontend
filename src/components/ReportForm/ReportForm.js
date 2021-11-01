import React, { useState, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";

import ReportItem from "../ReportItem";
import { GlobalContext } from "../../providers/GlobalProvider";
import ReportService from "../../services/reports";
import WizardSteps from "../WizardSteps";
import requestFormIllustration from "../../assets/requestFormIllustration.svg";

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
  motivationalGrid: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
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
  similarReportList: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "flex-start",
    width: '100%',
    paddingTop: theme.spacing(1)
  },
  similarReportItem: {
    padding: `${theme.spacing(1)}px 0`,
    width: '100%',
  },
  similarHeadingDescription: {
    display: "inline",
    margin: "0 4px -4px 4px",
  },
  similarWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
}));

const FormComplementar = ({
  similarReports,
  similarReportsLoading,
  similarReportsError,
}) => {
  const classes = useStyles();
  return (
    <>
      {similarReports.length > 0 ? (
        <Box className={classes.similarWrapper}>
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
                >
                  <Typography variant="body1" color="primary">
                    {item.name}
                  </Typography>
                  {/* <ReportItem item={item} className={classes.similarReportItem} /> */}
                </Link>
              );
            })}
          </Box>
        </Box>
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
  );
};

const ReportForm = () => {
  const classes = useStyles();
  const { reportFormVisible, setReportFormVisible } = useContext(GlobalContext);
  const [wizardLabel, setWizardLabel] = useState("Informações Iniciais");
  const [wizardStep, setWizardStep] = useState(0);

  const [formData, setFormData] = useState();

  const [similarReports, setSimilarReports] = useState([]);
  const [similarReportsLoading, setSimilarReportsLoading] = useState([]);
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
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} className={classes.root}>
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
                    setWizardLabel("A melhor Imagem");
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
              <div
                {...getRootProps()}
                style={{
                  border: "solid 1px #0000001f",
                  borderRadius: "4px",
                  padding: "8px",
                  cursor: "pointer",
                }}
              >
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
                    setWizardStep(2);
                    setSimilarReports([]);
                    setWizardLabel("Resumo");
                  }}
                >
                  Confirmar
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
                Título
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Description
              </Typography>
              <Box className={classes.actionsWrapper}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setReportFormVisible(false);
                  }}
                >
                  Confirmar
                </Button>
              </Box>
            </Box>
          ) : null}
        </form>
      </Grid>
      <Hidden smDown>
        <Grid
          item
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
          />
        </Grid>
      </Hidden>
      <Hidden smUp>
        <Grid item xs={12} className={classes.motivationalGrid}>
          <FormComplementar
            similarReports={similarReports}
            similarReportsLoading={similarReportsLoading}
            similarReportsError={similarReportsError}
          />
        </Grid>
      </Hidden>
    </Grid>
  );
};

export default ReportForm;
