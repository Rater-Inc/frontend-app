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
  CircularProgress,
} from '@mui/material';
import Rating from '@mui/material/Rating';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

import { spaceLogin } from '../../api/auth';
import { submitRatings } from '../../api/result';
import { getSpaceByLink } from '../../api/space';

const RatingPage = () => {
  const { spaceLink } = useParams();
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [ratings, setRatings] = useState({});
  const [error, setError] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const [participants, setParticipants] = useState([]);
  const maxSteps = participants.length;
  const [token, setToken] = useState('');
  const [metrics, setMetrics] = useState([]);
  const [spaceId, setSpaceId] = useState(0);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated) {
      getSpaceByLink(spaceLink, token)
        .then((data) => {
          setParticipants(data.participants);
          setMetrics(data.metrics);
        })
        .catch((error) => {
          console.error('Error fetching participants:', error);
        });
    }
  }, [authenticated]);

  const handleLogin = async () => {
    setIsSubmitting(true);
    try {
      const data = await spaceLogin(spaceLink, password);
      setIsSubmitting(false);
      if (data.success === false) {
        Swal.fire({
          icon: 'error',
          title: 'Oops... Wrong password!',
          text: 'Ask your friend for the correct password..',
        });
      } else {
        setAuthenticated(true);
        setToken(data.jwtToken);
        setSpaceId(data.spaceId);
      }
    } catch (error) {
      console.log('Auth process error:', error);
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

  const handleSubmit = (retry = false) => {
    setIsSubmitting(true);
    const ratingDetails = [];

    for (const participantId in ratings) {
      for (const metricId in ratings[participantId]) {
        ratingDetails.push({
          rateeId: Number(participantId),
          metricId: Number(metricId),
          score: ratings[participantId][metricId],
        });
      }
    }

    const payload = {
      raterNickName: nickname,
      spaceId: spaceId,
      ratingDetails,
    };

    submitRatings(payload, token).then((response) => {
      setIsSubmitting(false);
      if (response.status === 401 && !retry) {
        handleLogin(() => handleSubmit(true));
      } else {
        Swal.fire({
          title: 'Submit Success!',
          text: 'Ratings submitted successfully, wait for the results!',
          icon: 'success',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate(`/general-result/${spaceLink}`);
          }
        });
        return response.json();
      }
    });
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
            Enter Space to rate your friends!
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
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Enter'
            )}
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box
        mt={5}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        minHeight="80vh"
      >
        <Box>
          <Typography variant="h4" align="center">
            Rate {participants[activeStep]?.participantName} participant
          </Typography>
          {participants.map((participant, index) => (
            <Box key={participant.participantId} hidden={index !== activeStep}>
              {metrics.map((metric) => (
                <Paper
                  key={metric.metricId}
                  style={{ padding: '16px', margin: '16px 0' }}
                >
                  <Typography variant="h6">{metric.name}</Typography>
                  <Rating
                    name={`rating-${participant.participantId}-${metric.metricId}`}
                    value={
                      (ratings[participant.participantId] &&
                        ratings[participant.participantId][metric.metricId]) ||
                      0
                    }
                    onChange={(event, newValue) =>
                      handleRatingChange(
                        participant.participantId,
                        metric.metricId,
                        newValue
                      )
                    }
                  />
                </Paper>
              ))}
            </Box>
          ))}
        </Box>
        <Box>
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
              onClick={() => handleSubmit(false)}
              style={{ marginTop: '16px' }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Submit Ratings'
              )}
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default RatingPage;
