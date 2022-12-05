import type { Theme } from '@mui/material';
import { Box, Button, Drawer, Link } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { FC } from 'react';
import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import useLogout from 'src/hooks/useLogout';
import Logo from './Logo';

interface MainSidebarProps {
  onMobileClose: () => void;
  openMobile: boolean;
}

const MainSidebar: FC<MainSidebarProps> = ({ onMobileClose, openMobile }) => {
  const location = useLocation();
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const handleLogout = useLogout();

  useEffect(() => {
    if (openMobile) {
      onMobileClose();
    }
  }, [location.pathname]);

  return (
    <Drawer
      anchor="left"
      onClose={onMobileClose}
      open={!lgUp && openMobile}
      variant="temporary"
      PaperProps={{
        sx: { backgroundColor: 'background.default', width: 256 },
      }}
    >
      <Box
        sx={{
          alignItems: 'flex-start',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          p: 2,
        }}
      >
        <RouterLink to="/home">
          <Logo />
        </RouterLink>
        <Link
          color="textSecondary"
          component={RouterLink}
          to="/stations"
          underline="none"
          variant="body1"
        >
          Weather Stations
        </Link>
        <Button
          color="primary"
          size="small"
          sx={{ mt: 1 }}
          variant="contained"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Drawer>
  );
};

export default MainSidebar;
