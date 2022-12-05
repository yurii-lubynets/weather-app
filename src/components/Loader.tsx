import { Box, CircularProgress } from '@mui/material';
import type { FC, ReactNode } from 'react';
import NoDataRecord from './NoDataRecord';

interface LoaderProps {
  isLoading?: boolean;
  hasData?: any;
  children?: ReactNode;
}

const Loader: FC<LoaderProps> = ({
  isLoading,
  hasData,
  children,
}: LoaderProps) => {
  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          mt: 10,
          mb: 10,
          flex: 1,
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!isLoading && !hasData) {
    return <NoDataRecord message="There is no data" />;
  }

  return <>{children}</>;
};

export default Loader;
