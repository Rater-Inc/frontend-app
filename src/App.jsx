import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import NotFoundPage from './pages/LandingPages/404-page';
import CreateSpacePage from './pages/CreatePage/CreateSpacePage';
import RatingPage from './pages/RatePage/RatingPage';
import PersonalResultPage from './pages/ResultPages/PersonalResultPage';
import GeneralResultPage from './pages/ResultPages/GeneralResultPage';
import SpaceOperations from './pages/LandingPages/SpaceOperations';

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
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/rating/:spaceLink" element={<RatingPage />} />
        <Route path="/result-display" element={<PersonalResultPage />} />
        <Route
          path="/general-result/:spaceLink"
          element={<GeneralResultPage />}
        />
        <Route
          path="/space-operations/:spaceLink"
          element={<SpaceOperations />}
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
