import { Box, Container, Divider } from '@mui/material';
import { FC, useCallback, useEffect, useState } from 'react';
import ForecastContainer from 'src/components/ForecastContainer';
import {
  useLazyGetForecastByCityNameQuery,
  useLazyGetWeatherByCityNameQuery,
} from 'src/services/weatherService';
import SearchControl from './SearchControl';
import WeatherContainer from './WeatherContainer';

const UNIT_TYPE = 'metric';

const WeatherForecastContainer: FC = () => {
  const [
    fetchWeatherData,
    {
      isFetching: isWeatherFetching,
      currentData: weatherData,
      isUninitialized: isWeatherNotFetched,
    },
  ] = useLazyGetWeatherByCityNameQuery();

  const [
    fetchForecastData,
    {
      isFetching: isForecastFetching,
      currentData: forecastData,
      isUninitialized: isForecastNotFetched,
    },
  ] = useLazyGetForecastByCityNameQuery();

  const [forecast, setForecast] = useState(false);

  const [value, setValue] = useState('');

  const handleSearch = useCallback(() => {
    if (!value) return;
    (forecast ? fetchForecastData : fetchWeatherData)({
      q: value,
      units: UNIT_TYPE,
    });
  }, [fetchForecastData, fetchWeatherData, value, forecast]);

  useEffect(() => {
    handleSearch();
  }, [forecast]);

  return (
    <Container maxWidth="lg">
      <SearchControl
        value={value}
        setValue={setValue}
        forecast={forecast}
        setForecast={setForecast}
        handleSearch={handleSearch}
      />
      <Divider />
      <Box sx={{ my: 4 }}>
        {forecast ? (
          <ForecastContainer
            data={forecastData}
            isLoading={isForecastFetching}
            isNotFetched={isForecastNotFetched}
          />
        ) : (
          <WeatherContainer
            data={weatherData}
            isLoading={isWeatherFetching}
            isNotFetched={isWeatherNotFetched}
          />
        )}
      </Box>
    </Container>
  );
};

export default WeatherForecastContainer;
