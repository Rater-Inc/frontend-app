import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  TextField,
  MobileStepper,
  CircularProgress,
  Typography,
  Button,
  Paper,
  Grid,
  Box,
} from '@mui/material';
import { styled } from '@mui/system';
import RateReviewIcon from '@mui/icons-material/RateReview';
import AssessmentIcon from '@mui/icons-material/Assessment';
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';

import { spaceLogin } from '../../api/auth';
import { getSpaceByLink } from '../../api/space';
import { setLoginCookie } from '../../utils/cookie';

import { AutoFixHighRounded, TokenOutlined } from '@mui/icons-material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const SpaceOperations = () => {
  const { spaceLink } = useParams();
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const cookies = new Cookies();

  const handleNavigate = (path) => {
    navigate(`${path}/${spaceLink}`);
  };

  const checkLoginCookie = async () => {
    const auth = cookies.get(`${spaceLink}_auth`);
    if (auth) {
      setAuthenticated(true);
    }
  };

  const setSpaceDataCookie = (mtr, ptp, expirationSeconds = 86400) => {
    const expirationDate = new Date(Date.now() + expirationSeconds * 1000);
    const spaceData = {
      metric: mtr,
      participant: ptp,
    };
    cookies.set(`${spaceLink}_spaceData`, JSON.stringify(spaceData), {
      expires: expirationDate,
      path: '/',
    });
  };

  const handleFetchDetails = async (myToken) => {
    setIsSubmitting(true);
    try {
      const spaceData = await getSpaceByLink(spaceLink, myToken);
      setSpaceDataCookie(spaceData.metrics, spaceData.participants);
    } catch (error) {
      console.error('Error in fetching space details:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred during fetching space details. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogin = async () => {
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

      await handleFetchDetails(loginData.jwtToken);
      setLoginCookie(password, nickname, spaceLink,loginData.jwtToken);
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

  useEffect(() => {
    const initializeAuthentication = async () => {
      if (!authenticated) {
        await checkLoginCookie();
      }
    };

    initializeAuthentication();
  }, [authenticated]);

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
  } else if (authenticated) {
    return (
      <Container maxWidth="md">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Space Operations
          </Typography>
          <Typography variant="subtitle1" gutterBottom align="center">
            Space Link: {spaceLink}
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <StyledPaper elevation={3}>
              <Typography variant="h5" component="h2" gutterBottom>
                Rating Page
              </Typography>
              <Typography variant="body1" paragraph>
                Submit your ratings for the participants in this space.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<RateReviewIcon />}
                onClick={() => handleNavigate('/rating')}
                fullWidth
              >
                Go to Rating Page
              </Button>
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={6}>
            <StyledPaper elevation={3}>
              <Typography variant="h5" component="h2" gutterBottom>
                General Result Page
              </Typography>
              <Typography variant="body1" paragraph>
                View the overall results and statistics for this space.
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<AssessmentIcon />}
                onClick={() => handleNavigate('/general-result')}
                fullWidth
              >
                View Results
              </Button>
            </StyledPaper>
          </Grid>
        </Grid>
      </Container>
    );
  }
};

export default SpaceOperations;
