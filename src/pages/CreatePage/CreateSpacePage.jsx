import React, { useState } from 'react';
import {
  Container,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
} from '@mui/material';
import TemplateSelection from './TemplateSelection';
import MetricSelection from './MetricSelection';
import PlayerName from './PlayerName';
import SpaceDetails from './SpaceDetails';

const steps = [
  'Template Selection',
  'Metric Selection',
  'Player Name',
  'Space Details',
];

function CreateSpacePage() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return <TemplateSelection />;
      case 1:
        return <MetricSelection />;
      case 2:
        return <PlayerName />;
      case 3:
        return <SpaceDetails />;
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h4" align="center">
          Multi Step Form
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box mt={5}>
          {getStepContent(activeStep)}
          <Box mt={2}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="contained"
              color="secondary"
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              style={{ marginLeft: 8 }}
            >
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default CreateSpacePage;
