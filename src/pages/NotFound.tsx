import { Box, Button, Container, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const NotFound: FC = () => {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Box
        sx={{
          alignItems: 'center',
          backgroundColor: 'background.paper',
          display: 'flex',
          minHeight: '100%',
          px: 3,
          py: '80px',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            align="center"
            color="textPrimary"
            variant={mobileDevice ? 'h4' : 'h1'}
          >
            404: page is not found
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 6,
            }}
          >
            <Button
              color="primary"
              component={RouterLink}
              to="/home"
              variant="outlined"
            >
              Home
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default NotFound;
