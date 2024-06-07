import React from 'react';
import { TextField, Box, Typography } from '@mui/material';

const PlayerName = () => {
  return (
    <Box textAlign="center">
      <Typography variant="h4">Halisaha 1</Typography>
      <TextField
        label="Oyuncu ismi"
        variant="outlined"
        fullWidth
        margin="normal"
      />
    </Box>
  );
};

export default PlayerName;
