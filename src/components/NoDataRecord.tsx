import { Box, Container, Typography } from '@mui/material';
import { FC } from 'react';
import useSettings from 'src/hooks/useSettings';

interface NoDataRecordProps {
  message: string;
}

const NoDataRecord: FC<NoDataRecordProps> = ({ message }) => {
  const { settings } = useSettings();

  return (
    <Container maxWidth={settings.compact ? 'xl' : false}>
      <Box
        sx={{
          alignSelf: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          alignItems: 'center',
          mt: 5,
          mb: 5,
          mx: 'auto',
        }}
      >
        <Typography textAlign="center" variant="h3" color="textPrimary">
          {message}
        </Typography>
      </Box>
    </Container>
  );
};

export default NoDataRecord;
