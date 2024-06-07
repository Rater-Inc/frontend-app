import React from 'react';
import { TextField, Box, Typography } from '@mui/material';

const SpaceDetails = () => {
  return (
    <Box textAlign="center">
      <Typography variant="h4">Halisaha 1</Typography>
      <TextField
        label="Açıklama"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField label="Şifre" variant="outlined" fullWidth margin="normal" />
      <TextField
        label="Nickname"
        variant="outlined"
        fullWidth
        margin="normal"
      />
    </Box>
  );
};

export default SpaceDetails;
