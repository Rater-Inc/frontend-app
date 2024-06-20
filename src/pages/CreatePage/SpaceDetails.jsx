import React, { useState } from 'react';
import {
  TextField,
  Box,
  Typography,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Switch,
  Button,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

const SpaceDetails = ({ metrics, players }) => {
  const [details, setDetails] = useState({
    name: '',
    description: '',
    password: '',
    creatorNickname: '',
    locked: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setDetails({ ...details, [field]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLockedChange = (event) => {
    setDetails({ ...details, locked: event.target.checked });
  };

  const handleCreateSpace = () => {
    const spaceData = {
      ...details,
      metrics,
      players,
    };

    console.log(JSON.stringify(spaceData));

    // Replace with actual API call

    fetch('http://localhost:8031/api/Space/CreateSpace', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(spaceData),
    })
      .then((response) => response.json())
      .then((data) => {
        Swal.fire({
          title: "Success",
          text: "Space Created Successfully!",
          icon: "success"
        }).then((result) => {
          if (result.isConfirmed) {
            navigate(`/rating/${data.spaceId}`, { state: { link: data.link } });
          }
        });
        console.log('Space created successfully:', data);
      })
      .catch((error) => {
        Swal.fire({
          title: "Error Occurred",
          text: "Error Creating Space!",
          icon: "error"
        });
      });
  };

  return (
    <Box textAlign="center">
      <Typography variant="h5" align="left" marginTop={4}>
        Space Details
      </Typography>
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={details.name}
        onChange={(e) => handleChange('name', e.target.value)}
        helperText="Give your space a cool name!"
      />
      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        margin="normal"
        value={details.description}
        onChange={(e) => handleChange('description', e.target.value)}
        helperText="Describe the vibe of your space in a few words."
      />
      <TextField
        label="Password"
        variant="outlined"
        fullWidth
        margin="normal"
        type={showPassword ? 'text' : 'password'}
        value={details.password}
        onChange={(e) => handleChange('password', e.target.value)}
        helperText="Lock your space with a super-secret password!"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={togglePasswordVisibility}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Creator Nickname"
        variant="outlined"
        fullWidth
        margin="normal"
        value={details.creatorNickname}
        onChange={(e) => handleChange('creatorNickname', e.target.value)}
        helperText="What nickname should we call you, the mighty creator?"
      />
      <FormControlLabel
        control={
          <Switch
            checked={details.locked}
            onChange={handleLockedChange}
            color="primary"
          />
        }
        label="Lock Rating Session"
        labelPlacement="start"
      />
      <Typography variant="body2" color="textSecondary">
        Lock the rating session to hide results until the rating duration ends.
      </Typography>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleCreateSpace}
        sx={{ marginTop: 2 }}
      >
        Create Space
      </Button>
    </Box>
  );
};

export default SpaceDetails;
