import { FC } from "react";
import { WeatherDataResponse } from "src/services/weatherService";
import Loader from "./Loader";
import WeatherCard from "./WeatherCard";

interface WeatherContainerProps {
  data: WeatherDataResponse;
  isLoading: boolean;
  isNotFetched: boolean;
}
const WeatherContainer: FC<WeatherContainerProps> = ({
  data,
  isLoading,
  isNotFetched,
}) => {
  if (isNotFetched) return <></>;

  return (
    <Loader isLoading={isLoading} hasData={data}>
      <WeatherCard data={data} />
    </Loader>
  );
};

export default WeatherContainer;
