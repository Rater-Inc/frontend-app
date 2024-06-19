import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import CreateSpacePage from './pages/CreatePage/CreateSpacePage';
import RatingPage from './pages/RatePage/RatingPage';

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<CreateSpacePage />} />
        <Route path="/rating-page/:spaceId" element={<RatingPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
