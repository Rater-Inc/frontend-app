import React from 'react';
import { Button, Typography, Box } from '@mui/material';

const MetricSelection = () => {
  return (
    <Box textAlign="center">
      <Typography variant="h4">Halisaha 1</Typography>
      <Button variant="contained" color="primary" fullWidth mt={3}>
        Pozisyon bilinci
      </Button>
      <Button variant="contained" color="primary" fullWidth mt={2}>
        Kondisyon
      </Button>
      <Button variant="contained" color="primary" fullWidth mt={2}>
        Takım uyumu
      </Button>
      <Button variant="contained" color="primary" fullWidth mt={2}>
        Genel
      </Button>
      <Typography variant="subtitle1" mt={2}>
        Süreli 1 / süresiz
      </Typography>
    </Box>
  );
};

export default MetricSelection;
