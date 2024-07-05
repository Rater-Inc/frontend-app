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

  const handleLoginAndFetchDetails = async () => {
    setIsSubmitting(true);
    try {
      const loginData = await spaceLogin(spaceLink, password);
      if (loginData.success === false) {
        await Swal.fire({
          icon: 'error',
          title: 'Oops... Wrong password!',
          text: 'Ask your friend for the correct password.',
        });
        return;
      }

      setToken(loginData.jwtToken);
      setSpaceId(loginData.spaceId);

      const spaceData = await getSpaceByLink(spaceLink, loginData.jwtToken);
      setParticipants(spaceData.participants);
      setMetrics(spaceData.metrics);
      setAuthenticated(true);
    } catch (error) {
      console.error('Error in login or fetching space details:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred during login or fetching space details. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
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

  const handleSubmit = async (retry = false) => {
    setIsSubmitting(true);

    try {
      // Get token again to get space details since it can be used only once.
      // TODO: This is a temporary solution, we need to find a better way to handle this.
      // One possible solution might be token update service in the backend with the same token instead of getting a new one.
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const spaceData = await spaceLogin(spaceLink, password);
      const newToken = spaceData.jwtToken;
      const newSpaceId = spaceData.spaceId;

      const ratingDetails = Object.entries(ratings).flatMap(
        ([participantId, metrics]) =>
          Object.entries(metrics).map(([metricId, score]) => ({
            rateeId: Number(participantId),
            metricId: Number(metricId),
            score,
          }))
      );

      const payload = {
        raterNickName: nickname,
        spaceId: newSpaceId,
        ratingDetails,
      };

      const response = await submitRatings(payload, newToken);

      if (response.status === 401 && !retry) {
        await handleLogin();
        return handleSubmit(true);
      }

      await Swal.fire({
        title: 'Submit Success!',
        text: 'Ratings submitted successfully, wait for the results!',
        icon: 'success',
      });

      navigate(`/general-result/${spaceLink}`);
    } catch (error) {
      console.error('Error in submission process:', error);
      await Swal.fire({
        title: 'Error',
        text: 'An error occurred while submitting ratings. Please try again.',
        icon: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
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
            onClick={handleLoginAndFetchDetails}
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
  } else if (authenticated && participants.length !== 0) {
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
              <Box
                key={participant.participantId}
                hidden={index !== activeStep}
              >
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
                          ratings[participant.participantId][
                            metric.metricId
                          ]) ||
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
  }
};

export default RatingPage;
