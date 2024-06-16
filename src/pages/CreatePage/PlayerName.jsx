import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { TextField, Box, Typography, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const PlayerName = forwardRef(({ previousStepValues }, ref) => {
  const [players, setPlayers] = useState([{ name: '' }]);
  const [showMaxWarning, setShowMaxWarning] = useState(false);
  const [showEmptyWarning, setShowEmptyWarning] = useState(false);
  const [lastPlayerCount, setLastPlayerCount] = useState(0);
  const inputRefs = useRef([]);

  const handleAddPlayer = () => {
    if (players.length >= 16) {
      setShowMaxWarning(true);
      return;
    }
    if (players.some((player) => player.name.trim() === '')) {
      setShowEmptyWarning(true);
      return;
    }
    setPlayers([...players, { name: '' }]);
    setShowMaxWarning(false);
    setShowEmptyWarning(false);
  };

  const handleRemovePlayer = (index) => {
    const updatedPlayers = [...players];
    updatedPlayers.splice(index, 1);
    setPlayers(updatedPlayers);
    setShowMaxWarning(false);
    setShowEmptyWarning(false);
  };

  const handleChangeName = (index, value) => {
    const updatedPlayers = [...players];
    updatedPlayers[index].name = value;
    setPlayers(updatedPlayers);
  };

  useEffect(() => {
    if (inputRefs.current.length > 0 && lastPlayerCount < players.length) {
      inputRefs.current[players.length - 1]?.focus();
      setLastPlayerCount(players.length);
    }
  }, [players]);

  useEffect(() => {
    if (previousStepValues && previousStepValues.length > 0) {
      setPlayers(previousStepValues);
    }
  }, [previousStepValues]);

  // Expose validation and data gathering to parent component
  useImperativeHandle(ref, () => ({
    validateAndGetData: () => {
      if (players.some((player) => player.name.trim() === '')) {
        setShowEmptyWarning(true);
        return { valid: false, data: null };
      }
      setShowEmptyWarning(false);
      return { valid: true, data: players };
    },
  }));

  return (
    <Box textAlign="center">
      <Typography variant="h5" align="left" marginTop={4}>
        Adding Players
      </Typography>
      {players.map((player, index) => (
        <Box
          key={index}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          marginTop={2}
        >
          <TextField
            inputRef={(el) => (inputRefs.current[index] = el)}
            label={`Player Name ${index + 1}`}
            variant="outlined"
            fullWidth
            margin="dense"
            value={player.name}
            onChange={(e) => handleChangeName(index, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Tab' && index === players.length - 1) {
                e.preventDefault();
                handleAddPlayer();
              }
            }}
          />
          <IconButton
            aria-label="delete"
            color="error"
            onClick={() => handleRemovePlayer(index)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
      {players.length < 16 && (
        <Button
          variant="outlined"
          color="primary"
          onClick={handleAddPlayer}
          startIcon={<AddCircleIcon />}
          sx={{ marginTop: 2 }}
        >
          Add Player
        </Button>
      )}
      {showMaxWarning && (
        <Typography variant="subtitle1" color="error" marginTop={2}>
          Maximum 16 players can be added.
        </Typography>
      )}
      {showEmptyWarning && (
        <Typography variant="subtitle1" color="error" marginTop={2}>
          Please fill in all player names before adding a new one.
        </Typography>
      )}
    </Box>
  );
});

export default PlayerName;
