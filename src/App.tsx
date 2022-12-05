import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { useRoutes } from 'react-router-dom';
import useScrollReset from 'src/hooks/useScrollReset';
import useSettings from 'src/hooks/useSettings';
import { createCustomTheme } from 'src/theme';
import routes from './routes';

const App = () => {
  const { settings } = useSettings();
  const content = useRoutes(routes);

  useScrollReset();

  const theme = createCustomTheme({
    direction: settings.direction,
    responsiveFontSizes: settings.responsiveFontSizes,
    roundedCorners: settings.roundedCorners,
    theme: settings.theme,
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {content}
    </ThemeProvider>
  );
};

export default App;
