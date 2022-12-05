import { Box, Card, CardContent, Typography } from '@mui/material';
import { FC } from 'react';
import { WeatherDataResponse } from 'src/services/weatherService';
import { formatDate } from 'src/utils/formatDate';

interface WeatherCardProps {
  data: WeatherDataResponse;
}

const WeatherCard: FC<WeatherCardProps> = ({ data }) => {
  const { coord, weather, main, wind, name, sys, dt } = data;

  return (
    <Card raised>
      <CardContent>
        <Box display="flex" flexDirection="row">
          <Box p={1}>
            <Typography variant="h2" color="textPrimary">
              {name}, {sys.country}
            </Typography>
            <Typography variant="h2" color="textSecondary">
              {formatDate(dt)}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {coord.lon}, {coord.lat}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardContent>
        <Box display="flex" flexDirection="row-reverse">
          <Box p={0}>
            <Typography variant="h4" color="textPrimary">
              Temp: {main.temp}
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
              sx={{
                height: 50,
                width: 50,
              }}
              src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
              alt={weather[0].description}
            />
            <Typography variant="h6" color="textSecondary">
              {weather[0].description}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardContent>
        <Box display="flex" flexDirection="row">
          <Box p={1}>
            <Typography variant="h6" color="textPrimary">
              Humidity: {main.humidity} %
            </Typography>
          </Box>
          <Box p={1}>
            <Typography variant="h6" color="textPrimary">
              pressure: {main.pressure} pa
            </Typography>
          </Box>
          <Box p={1}>
            <Typography variant="h6" color="textPrimary">
              wind: {wind.speed} km/h
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
