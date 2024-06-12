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

const MetricSelection = forwardRef(({ error }, ref) => {
  const [metrics, setMetrics] = useState([{ name: '', description: '' }]);
  const [showMaxWarning, setShowMaxWarning] = useState(false);
  const [showEmptyWarning, setShowEmptyWarning] = useState(false);
  const [lastMetricCount, setLastMetricCount] = useState(0);
  const inputRefs = useRef([]);

  const handleAddMetric = () => {
    if (metrics.length >= 5) {
      setShowMaxWarning(true);
      return;
    }
    if (metrics.some((metric) => metric.name.trim() === '')) {
      setShowEmptyWarning(true);
      return;
    }
    setMetrics([...metrics, { name: '', description: '' }]);
    setShowMaxWarning(false);
    setShowEmptyWarning(false);
  };

  const handleRemoveMetric = (index) => {
    const updatedMetrics = [...metrics];
    updatedMetrics.splice(index, 1);
    setMetrics(updatedMetrics);
    setShowMaxWarning(false);
    setShowEmptyWarning(false);
  };

  const handleChangeName = (index, value) => {
    const updatedMetrics = [...metrics];
    updatedMetrics[index].name = value;
    setMetrics(updatedMetrics);
  };

  useEffect(() => {
    if (inputRefs.current.length > 0 && lastMetricCount < metrics.length) {
      inputRefs.current[metrics.length - 1]?.focus();
      setLastMetricCount(metrics.length);
    }
  }, [metrics]);

  // Expose validation and data gathering to parent component
  useImperativeHandle(ref, () => ({
    validateAndGetData: () => {
      if (metrics.some((metric) => metric.name.trim() === '')) {
        setShowEmptyWarning(true);
        return { valid: false, data: null };
      }
      setShowEmptyWarning(false);
      return { valid: true, data: metrics };
    },
  }));

  return (
    <Box textAlign="center">
      <Typography variant="h5" align="left" marginTop={4}>
        Metric Selection
      </Typography>

      {metrics.map((metric, index) => (
        <Box
          key={index}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          marginTop={2}
          position="relative"
        >
          <TextField
            inputRef={(el) => (inputRefs.current[index] = el)}
            label={`Metric Name ${index + 1}`}
            variant="outlined"
            fullWidth
            margin="dense"
            value={metric.name}
            onChange={(e) => handleChangeName(index, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Tab' && index === metrics.length - 1) {
                e.preventDefault();
                handleAddMetric();
              }
            }}
            error={error}
            helperText={error && 'Please fill out this field'}
          />
          <IconButton
            aria-label="delete"
            color="error"
            onClick={() => handleRemoveMetric(index)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}

      <Button
        variant="outlined"
        color="primary"
        onClick={handleAddMetric}
        startIcon={<AddCircleIcon />}
        sx={{ marginTop: 2 }}
      >
        Add Metric
      </Button>

      {showMaxWarning && (
        <Typography variant="subtitle1" color="error" marginTop={2}>
          Maximum 5 metrics can be added.
        </Typography>
      )}
      {showEmptyWarning && (
        <Typography variant="subtitle1" color="error" marginTop={2}>
          Please fill in all metric names and descriptions before adding a new
          one.
        </Typography>
      )}
    </Box>
  );
});

export default MetricSelection;
