import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Divider, IconButton, Link, Toolbar } from '@mui/material';
import type { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import useLogout from 'src/hooks/useLogout';
import Logo from './Logo';

interface MainNavbarProps {
  onSidebarMobileOpen?: () => void;
}

const MainNavbar: FC<MainNavbarProps> = ({ onSidebarMobileOpen }) => {
  const handleLogout = useLogout();

  return (
    <AppBar
      elevation={0}
      sx={{ backgroundColor: 'background.paper', color: 'text.secondary' }}
    >
      <Toolbar sx={{ minHeight: 64 }}>
        <RouterLink to="/home">
          <Logo />
        </RouterLink>
        <Box sx={{ flexGrow: 1 }} />
        <Box
          sx={{
            alignItems: 'center',
            display: { md: 'flex', xs: 'none' },
          }}
        >
          <Link
            color="textSecondary"
            component={RouterLink}
            to="/stations"
            underline="none"
            variant="body1"
          >
            Weather Stations
          </Link>
          <Divider orientation="vertical" sx={{ height: 32, mx: 2 }} />
          <IconButton aria-label="logout" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            alignItems: 'center',
            display: { md: 'none', xs: 'flex' },
          }}
        >
          <IconButton aria-label="menu" onClick={onSidebarMobileOpen}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
      <Divider />
    </AppBar>
  );
};

export default MainNavbar;
