import { Box, Card, CardContent, Container, Typography } from '@mui/material';
import type { FC } from 'react';
import LoginJWT from 'src/components/LoginJWT';

const Login: FC = () => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Container maxWidth="sm" sx={{ py: '180px' }}>
          <Card>
            <CardContent>
              <Typography color="textPrimary" gutterBottom variant="h4">
                Login
              </Typography>
              <LoginJWT />
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default Login;
