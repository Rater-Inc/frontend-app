import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  MobileStepper,
} from '@mui/material';
import Rating from '@mui/material/Rating';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

const dummyMetrics = [
  { id: 1, name: 'Condition' },
  { id: 2, name: 'Harmony' },
  { id: 3, name: 'Friendly Play' },
  { id: 4, name: 'Overall Performance' },
];

const dummyParticipants = [
  { id: 1, name: 'Player 1' },
  { id: 2, name: 'Player 2' },
  { id: 3, name: 'Player 3' },
  { id: 1, name: 'Player 1' },
  { id: 2, name: 'Player 2' },
  { id: 3, name: 'Player 3' },
  { id: 1, name: 'Player 1' },
  { id: 2, name: 'Player 2' },
  { id: 3, name: 'Player 3' },
  { id: 1, name: 'Player 1' },
  { id: 2, name: 'Player 2' },
  { id: 3, name: 'Player 3' },
  { id: 1, name: 'Player 1' },
  { id: 2, name: 'Player 2' },
  { id: 3, name: 'Player 3' },
];

const RatingPage = ({}) => {
  //TODO change to useParams
  const { spaceId } = useParams();
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [ratings, setRatings] = useState({});
  const [error, setError] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = dummyParticipants.length;

  useEffect(() => {
    // Fetch participants and metrics from the API based on spaceId
    // Example:
    // fetchParticipants(spaceId).then(setParticipants);
    // fetchMetrics(spaceId).then(setMetrics);
  }, [spaceId]);

  const handleLogin = () => {
    // Dummy authentication for demonstration
    if (password === '123') {
      setAuthenticated(true);
    } else {
      setError('Invalid password');
    }
  };

  const handleRatingChange = (participantId, metricId, value) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [participantId]: {
        ...prevRatings[participantId],
        [metricId]: value,
      },
    }));
  };

  const handleSubmit = () => {
    const payload = {
      nickname,
      spaceId,
      ratings,
    };
    console.log(payload);
    // Submit the ratings to the API
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  if (!authenticated) {
    return (
      <Container>
        <Box mt={5}>
          <Typography variant="h4" align="center">
            Enter Space
          </Typography>
          <TextField
            label="Nickname"
            variant="outlined"
            fullWidth
            margin="normal"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
            style={{ marginTop: '16px' }}
          >
            Enter
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h4" align="center">
          Rate Participants
        </Typography>
        {dummyParticipants.map((participant, index) => (
          <Box key={participant.id} hidden={index !== activeStep}>
            <Typography variant="h5">{participant.name}</Typography>
            {dummyMetrics.map((metric) => (
              <Paper
                key={metric.id}
                style={{ padding: '16px', margin: '16px 0' }}
              >
                <Typography variant="h6">{metric.name}</Typography>
                <Rating
                  name={`rating-${participant.id}-${metric.id}`}
                  value={
                    (ratings[participant.id] &&
                      ratings[participant.id][metric.id]) ||
                    0
                  }
                  onChange={(event, newValue) =>
                    handleRatingChange(participant.id, metric.id, newValue)
                  }
                />
              </Paper>
            ))}
          </Box>
        ))}
        <MobileStepper
          steps={maxSteps}
          position="static"
          variant="dots"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              <KeyboardArrowLeft />
              Back
            </Button>
          }
        />
        {activeStep === maxSteps - 1 && (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            style={{ marginTop: '16px' }}
          >
            Submit Ratings
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default RatingPage;
