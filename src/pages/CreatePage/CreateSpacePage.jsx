import React, { useState, useRef } from 'react';
import {
  Container,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  ButtonGroup,
} from '@mui/material';
import MetricSelection from './MetricSelection';
import PlayerName from './PlayerName';
import SpaceDetails from './SpaceDetails';
import Divider from '@mui/material/Divider';

const steps = ['Metrics', 'Players', 'Details'];

function CreateSpacePage() {
  const [activeStep, setActiveStep] = useState(0);
  const [metrics, setMetrics] = useState([]);
  const [players, setPlayers] = useState([]);
  const metricSelectionRef = useRef();
  const playerNameRef = useRef();

  const handleNext = () => {
    if (activeStep === 0) {
      const { valid, data } = metricSelectionRef.current.validateAndGetData();
      if (valid) {
        setMetrics(data);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else if (activeStep === 1) {
      const { valid, data } = playerNameRef.current.validateAndGetData();
      if (valid) {
        setPlayers(data);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else if (activeStep === 2) {
      // Additional validation if needed
      // handleCreateSpace(); // This can be moved to the SpaceDetails component
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return <MetricSelection ref={metricSelectionRef} />;
      case 1:
        return <PlayerName ref={playerNameRef} />;
      case 2:
        return <SpaceDetails metrics={metrics} players={players} />;
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <Box style={{ flexGrow: 1 }}>
        <Typography variant="h4" align="center" marginTop={2}>
          Create Space
        </Typography>
        <div style={{ flex: 1 }}>{getStepContent(activeStep)}</div>
      </Box>
      <Divider style={{ padding: '8px' }} />
      <Box
        style={{
          textAlign: 'center',
          paddingTop: '15px',
          paddingBottom: '15px',
        }}
      >
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <ButtonGroup size="large" sx={{ paddingTop: '15px' }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            color="secondary"
          >
            Back
          </Button>
          <Button
            color="primary"
            onClick={handleNext}
            disabled={activeStep === steps.length - 1}
          >
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </ButtonGroup>
      </Box>
    </Container>
  );
}

export default CreateSpacePage;
