import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Button,
  Grid,
  Container,
  TextField,
  CircularProgress,
} from '@mui/material';
import Swal from 'sweetalert2';

import { spaceLogin } from '../../api/auth';
import { getRatings } from '../../api/space';
import { numberFormatter } from '../../utils/format';

const GeneralResultPage = () => {
  const { spaceLink } = useParams();
  const [ratingData, setRatingData] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  //TODO: Move this into authenticate component bellow..
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
      }
    } catch (error) {
      console.log('Auth process error:', error);
    }
  };

  useEffect(() => {
    if (authenticated) {
      getRatings(spaceLink, token)
        .then((data) => {
          setRatingData(data);
        })
        .catch((error) => {
          console.error('Error fetching ratings:', error);
        });
    }
  }, [authenticated]);

  //TODO: Move this into component so that it can be reused in RatinPage and others..
  if (!authenticated) {
    return (
      <Container>
        <Box mt={5}>
          <Typography variant="h4" align="center">
            Enter Space to see the results
          </Typography>
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

  if (ratingData) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        padding="20px"
      >
        <Typography variant="h4" gutterBottom>
          General Result Page
        </Typography>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          width="100%"
        >
          {ratingData?.participantResults
            .slice(0, 3)
            .map((participant, index) => (
              <Grid
                item
                xs={index === 0 ? 12 : 6}
                key={participant.participantName}
              >
                <Card
                  variant="outlined"
                  style={{
                    textAlign: 'center',
                  }}
                >
                  <CardContent>
                    <Typography variant="h6">
                      {index + 1}. {participant.participantName}
                    </Typography>
                    {participant.metricResults.map((metricResult) => (
                      <Typography variant="body1" key={metricResult.metricId}>
                        {metricResult.name}:{' '}
                        {numberFormatter.format(
                          metricResult.averageMetricScore
                        )}
                      </Typography>
                    ))}
                    <Typography variant="body1">
                      Overalll Score:{' '}
                      {numberFormatter.format(participant.averageScore)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>

        <Divider
          style={{
            width: '100%',
            margin: '20px 0',
            height: '4px',
          }}
        />

        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          width="100%"
        >
          {ratingData?.metricLeaders.map((metric, index) => (
            <Card
              key={index}
              variant="outlined"
              style={{
                width: '100%',
                marginBottom: '10px',
                textAlign: 'center',
              }}
            >
              <CardContent>
                <Typography variant="h6">Best in {metric.name}</Typography>
                <Typography variant="h5">
                  {metric.leaderParticipant.participantName} - {metric.score}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    );
  }
};

export default GeneralResultPage;
