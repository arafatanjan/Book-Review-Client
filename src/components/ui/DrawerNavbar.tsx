'use client';

import { Box, List, ListItem, ListItemText, Button } from '@mui/material';
import Link from 'next/link';
import { getUserInfo, removeUser } from '@/services/auth.services';

interface DrawerNavbarProps {
  handleDrawerToggle: () => void;
}

const DrawerNavbar = ({ handleDrawerToggle }: DrawerNavbarProps) => {
  const userInfo = getUserInfo();

  const handleLogOut = () => {
    removeUser();
    handleDrawerToggle(); 
  };

  return (
    <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle} onKeyDown={handleDrawerToggle}>
      <List>
        <Link href="/" passHref>
          <ListItem component="a">
            <ListItemText primary="Home" />
          </ListItem>
        </Link>
        {userInfo?.id ? (
          <>
            <Link href="/dashboard" passHref>
              <ListItem component="a">
                <ListItemText primary="Dashboard" />
              </ListItem>
            </Link>
            <Button color="error" onClick={handleLogOut} sx={{ ml: 2 }}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link href="/login" passHref>
              <Button color="inherit">Login</Button>
            </Link>
            <Link href="/register" passHref>
              <Button color="inherit">Register</Button>
            </Link>
          </>
        )}
      </List>
    </Box>
  );
};

export default DrawerNavbar;
