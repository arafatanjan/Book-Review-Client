'use client';

import { AppBar, Toolbar, Typography, Button, IconButton, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { useState } from 'react';
import { Box } from '@mui/system';
import dynamic from 'next/dynamic';
// import DrawerNavbar from '@/components/ui/DrawerNavbar';  

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const AuthButton = dynamic(() => import('../ui/AuthButton'), { ssr: false });

  // Toggle drawer state
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
              <p>Book Review Platform</p>
            </Link>
          </Typography>

          {/* Menu buttons for desktop */}
          <AuthButton />
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile */}
      {/* <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <DrawerNavbar handleDrawerToggle={handleDrawerToggle} />
      </Drawer> */}
    </>
  );
};

export default Navbar;
