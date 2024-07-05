import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Paper, Grid, Box } from '@mui/material';
import { styled } from '@mui/system';
import RateReviewIcon from '@mui/icons-material/RateReview';
import AssessmentIcon from '@mui/icons-material/Assessment';

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
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(`${path}/${spaceLink}`);
  };

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
};

export default SpaceOperations;
