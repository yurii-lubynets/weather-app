import { Box, List } from '@mui/material';
import type { FC } from 'react';
import Loader from 'src/components/Loader';
import { useGetStationsQuery } from 'src/services/weatherService';
import StationsListItem from './StationsListItem';

const StationsList: FC = () => {
  const { data, isFetching } = useGetStationsQuery();

  return (
    <Box sx={{ my: 4 }}>
      <Loader isLoading={isFetching} hasData={data?.[0]}>
        <List>
          {data?.map((station) => (
            <StationsListItem key={station.id} station={station} />
          ))}
        </List>
      </Loader>
    </Box>
  );
};

export default StationsList;
