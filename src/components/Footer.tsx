import { Box, Container, Grid, Typography } from '@mui/material';
import type { FC } from 'react';
import Logo from './Logo';

const Footer: FC = () => (
  <Box
    sx={{
      backgroundColor: 'background.default',
      pb: 6,
      pt: 6,
    }}
  >
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid
          item
          md={3}
          sm={4}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            order: { md: 1, xs: 4 },
          }}
          xs={12}
        >
          <Logo />
          <Typography color="textSecondary" sx={{ mt: 1 }} variant="caption">
            2022
          </Typography>
        </Grid>
      </Grid>
    </Container>
  </Box>
);

export default Footer;
