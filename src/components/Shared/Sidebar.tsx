"use client";

import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Box, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import Link from 'next/link';

const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Toggle the drawer
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Sidebar content
  const drawerContent = (
    <Box sx={{ width: 250 }}>
      <Typography variant="h6" sx={{ my: 2, textAlign: 'center' }}>
        Sidebar Menu
      </Typography>
      <List>
        <Link href="/dashboard" passHref>
          <ListItem>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="User Profile" />
          </ListItem>
        </Link>
        <Link href="/dashboard/addreview" passHref>
          <ListItem>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="Add Review" />
          </ListItem>
        </Link>
        {/* <Link href="/editreview" passHref>
          <ListItem  component="a">
            <ListItemIcon>
              <ContactMailIcon />
            </ListItemIcon>
            <ListItemText primary="Edit review" />
          </ListItem>
        </Link> */}
      </List>
    </Box>
  );

  return (
    <>
      {/* IconButton to open the sidebar on mobile */}
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ display: { md: 'none' }, position: 'absolute', top: 16, left: 16 }}
      >
        <MenuIcon />
      </IconButton>

      {/* Permanent drawer for larger screens */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' }, // Hide on mobile, show on desktop
          width: 250,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 250,
            boxSizing: 'border-box',
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>

      {/* Temporary drawer for mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better performance on mobile
        }}
        sx={{
          display: { xs: 'block', md: 'none' }, // Show on mobile, hide on desktop
          '& .MuiDrawer-paper': {
            width: 250,
            boxSizing: 'border-box',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
