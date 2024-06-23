import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  CircularProgress,
  Grid,
} from '@mui/material';

const GeneralResultPage = () => {
  const [ratingData, setRatingData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      const mockData = {
        topPerformers: [
          {
            name: 'John',
            scores: { Quality: 10, Timeliness: 9, Satisfaction: 9 },
          },
          {
            name: 'Harold',
            scores: { Quality: 9, Timeliness: 8, Satisfaction: 9 },
          },
          {
            name: 'Lionel',
            scores: { Quality: 8, Timeliness: 9, Satisfaction: 10 },
          },
        ],
        metricsBest: [
          { metric: 'Quality', name: 'John', score: 10 },
          { metric: 'Timeliness', name: 'Harold', score: 9 },
          { metric: 'Satisfaction', name: 'Lionel', score: 10 },
        ],
      };
      setRatingData(mockData);
    }, 1000);
  }, []);

  if (error) {
    return (
      <Typography color="error" align="center">
        {error}
      </Typography>
    );
  }

  if (!ratingData) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
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
        <Grid item xs={12}>
          <Card
            variant="outlined"
            style={{
              textAlign: 'center',
            }}
          >
            <CardContent>
              <Typography variant="h6">
                1. {ratingData.topPerformers[0].name}
              </Typography>
              {Object.entries(ratingData.topPerformers[0].scores).map(
                ([metric, score], idx) => (
                  <Typography key={idx} variant="body1">
                    {metric}: {score}
                  </Typography>
                )
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card
            variant="outlined"
            style={{
              textAlign: 'center',
            }}
          >
            <CardContent>
              <Typography variant="h6">
                2. {ratingData.topPerformers[1].name}
              </Typography>
              {Object.entries(ratingData.topPerformers[1].scores).map(
                ([metric, score], idx) => (
                  <Typography key={idx} variant="body1">
                    {metric}: {score}
                  </Typography>
                )
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card
            variant="outlined"
            style={{
              textAlign: 'center',
            }}
          >
            <CardContent>
              <Typography variant="h6">
                3. {ratingData.topPerformers[2].name}
              </Typography>
              {Object.entries(ratingData.topPerformers[2].scores).map(
                ([metric, score], idx) => (
                  <Typography key={idx} variant="body1">
                    {metric}: {score}
                  </Typography>
                )
              )}
            </CardContent>
          </Card>
        </Grid>
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
        {ratingData.metricsBest.map((metric, index) => (
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
              <Typography variant="h6">Best in {metric.metric}</Typography>
              <Typography variant="h5">
                {metric.name} - {metric.score}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default GeneralResultPage;
