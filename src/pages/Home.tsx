import { Box } from '@mui/material';
import { FC } from 'react';
import WeatherForecastContainer from 'src/components/WeatherForecastContainer';

const Home: FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        minHeight: '100%',
      }}
    >
      <Box sx={{ py: 6 }}>
        <WeatherForecastContainer />
      </Box>
    </Box>
  );
};

export default Home;
