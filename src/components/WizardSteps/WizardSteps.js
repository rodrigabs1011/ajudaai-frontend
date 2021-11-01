import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  wizardWrapper: {
    display: "flex",
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: "center",
  },
  stepsWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  previousStep: {
    width: "55px",
    height: "4px",
    borderRadius: "3px",
    background: theme.palette.text.secondary,
    margin: theme.spacing(1),
  },
  currentStep: {
    width: "55px",
    height: "4px",
    borderRadius: "3px",
    background: theme.palette.text.secondary,
    margin: theme.spacing(1),
  },
  nextStep: {
    width: "55px",
    height: "4px",
    borderRadius: "3px",
    background: theme.palette.text.disabled,
    margin: theme.spacing(1),
  },
}));

const WizardSteps = ({ label, current, steps }) => {
  const classes = useStyles();

  return (
    <Box className={classes.wizardWrapper}>
      <Typography variant="h6" color="textSecondary">
        {label}
      </Typography>
      <Box className={classes.stepsWrapper}>
        {Array.from(Array(steps).keys()).map((step) => {

          if (step < current) {
            return <Box key={step} className={classes.previousStep}></Box>;
          }
          if (step === current) {
            return <Box key={step} className={classes.currentStep}></Box>;
          }
          return <Box key={step} className={classes.nextStep}></Box>;
        })}
      </Box>
    </Box>
  );
};

export default WizardSteps;
