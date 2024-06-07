import React from 'react';
import { Button, Box, Typography } from '@mui/material';

const TemplateSelection = () => {
  return (
    <Box textAlign="center">
      <Typography variant="h4">Template Selection</Typography>
      <Button variant="contained" color="primary" fullWidth mt={3}>
        Oyun
      </Button>
      <Button variant="contained" color="primary" fullWidth mt={2}>
        Oyun
      </Button>
    </Box>
  );
};

export default TemplateSelection;
