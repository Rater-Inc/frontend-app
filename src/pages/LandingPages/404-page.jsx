import React from 'react';
import { Box, Typography, Button, Container, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const imageArray = [
  'https://i.imgur.com/oCkEbrA.png',
  'https://i.imgur.com/FOeYt4E.png',
  'https://i.imgur.com/qIufhof.png',
  'https://i.imgur.com/Q2BAOd2.png',
  'https://i.imgur.com/DWO5Hzg.png',
  'https://i.imgur.com/QIxIKBH.png',
  'https://i.imgur.com/kZNTPqI.png',
  'https://i.imgur.com/O0DCcQy.png',
  'https://i.imgur.com/yW2W9SC.png',
  'https://i.imgur.com/hkRuanu.png',
];

const NotFound = () => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 10, // Add padding top and bottom
          minHeight: { xs: '100vh', sm: 'auto' }, // Full height on mobile, auto on larger screens
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} sm={6}>
            <Box
              component="img"
              sx={{
                maxWidth: '100%',
                height: 'auto',
                maxHeight: { xs: '50vh', sm: '400px' }, // Limit image height
              }}
              alt="404 Not Found"
              src={imageArray[Math.floor(Math.random() * imageArray.length)]}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box textAlign="left">
              <Typography variant="h2" color="primary" gutterBottom>
                404
              </Typography>
              <Typography variant="h5" gutterBottom>
                Oops! Page Not Found
              </Typography>
              <Typography variant="body1" paragraph>
                The page you are looking for might have been removed, had its
                name changed, or is temporarily unavailable.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/"
                sx={{ mt: 2 }}
              >
                Go to Homepage
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default NotFound;
