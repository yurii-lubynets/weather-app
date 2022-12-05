import { FC } from 'react';
import { ForecastDataResponse } from 'src/services/weatherService';
import ForecastCard from './ForecastCard';
import Loader from './Loader';

interface ForecastContainerProps {
  data: ForecastDataResponse;
  isLoading: boolean;
  isNotFetched: boolean;
}
const ForecastContainer: FC<ForecastContainerProps> = ({
  data,
  isLoading,
  isNotFetched,
}) => {
  if (isNotFetched) return <></>;

  return (
    <Loader isLoading={isLoading} hasData={data}>
      {data?.list
        .filter((reading) => reading.dtTxt.includes('18:00:00'))
        .map((forecast) => (
          <ForecastCard key={forecast.dtTxt} forecast={forecast} />
        ))}
    </Loader>
  );
};

export default ForecastContainer;
