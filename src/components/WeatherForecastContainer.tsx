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
    { isFetching: isWeatherFetching, currentData: weatherData },
  ] = useLazyGetWeatherByCityNameQuery();

  const [
    fetchForecastData,
    { isFetching: isForecastFetching, currentData: forecastData },
  ] = useLazyGetForecastByCityNameQuery();

  const [isForecast, setIsForecast] = useState(false);

  const [value, setValue] = useState('');

  const handleSearch = useCallback(() => {
    if (!value) return;
    (isForecast ? fetchForecastData : fetchWeatherData)({
      q: value,
      units: UNIT_TYPE,
    });
  }, [fetchForecastData, fetchWeatherData, value, isForecast]);

  useEffect(() => {
    handleSearch();
  }, [isForecast]);

  return (
    <Container maxWidth="lg">
      <SearchControl
        value={value}
        setValue={setValue}
        isForecast={isForecast}
        setIsForecast={setIsForecast}
        handleSearch={handleSearch}
      />
      <Divider />
      <Box sx={{ my: 4 }}>
        {isForecast ? (
          <ForecastContainer
            data={forecastData}
            isLoading={isForecastFetching}
          />
        ) : (
          <WeatherContainer data={weatherData} isLoading={isWeatherFetching} />
        )}
      </Box>
    </Container>
  );
};

export default WeatherForecastContainer;
