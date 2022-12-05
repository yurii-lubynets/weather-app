import { Box, Card, CardContent, Typography } from '@mui/material';
import { FC } from 'react';
import { ForecastResponse } from 'src/services/weatherService';

interface ForecastCardProps {
  forecast: ForecastResponse;
}

const ForecastCard: FC<ForecastCardProps> = ({ forecast }) => {
  return (
    <Card raised sx={{ mb: 1 }}>
      <CardContent>
        <Box display="flex" flexDirection="row">
          <Box p={1}>
            <Typography variant="h2" color="textPrimary">
              {forecast.dtTxt}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardContent>
        <Box display="flex" flexDirection="row-reverse">
          <Box p={0}>
            <Typography variant="h4" color="textPrimary">
              Temp: {forecast.main.temp}
              <span>&#176;</span>
              {'C'}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardContent>
        <Box display="flex" flexDirection="row-reverse">
          <Box display="flex" flexDirection="column" alignItems="center" p={0}>
            <Box
              component="img"
              sx={{ height: 50, width: 50 }}
              src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
              alt={forecast.weather[0].description}
            />
            <Typography variant="h6" color="textSecondary">
              {forecast.weather[0].description}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardContent>
        <Box display="flex" flexDirection="row">
          <Box p={1}>
            <Typography variant="h6" color="textPrimary">
              Humidity: {forecast.main.humidity} %
            </Typography>
          </Box>
          <Box p={1}>
            <Typography variant="h6" color="textPrimary">
              pressure: {forecast.main.pressure} pa
            </Typography>
          </Box>
          <Box p={1}>
            <Typography variant="h6" color="textPrimary">
              wind: {forecast.wind.speed} km/h
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ForecastCard;
