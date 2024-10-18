'use client'

import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { useState } from 'react';
import { Box } from '@mui/system';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Toggle drawer state
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Drawer content for mobile
  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle} onKeyDown={handleDrawerToggle}>
      <List>
        <Link href="/" passHref>
          <ListItem  component="a">
            <ListItemText primary="Home" />
          </ListItem>
        </Link>
        <Link href="/login" passHref>
          <ListItem  component="a">
            <ListItemText primary="Login" />
          </ListItem>
        </Link>
        <Link href="/register" passHref>
          <ListItem component="a">
            <ListItemText primary="Register" />
          </ListItem>
        </Link>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {/* Menu icon for mobile */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ display: { xs: 'block', md: 'none' }, mr: 2 }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>

          {/* Navbar title */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/" passHref>
              Book Review Platform
            </Link>
          </Typography>

          {/* Menu buttons for desktop */}
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Link href="/login" passHref>
              <Button color="inherit">Login</Button>
            </Link>
            <Link href="/register" passHref>
              <Button color="inherit">Register</Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better performance on mobile
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
