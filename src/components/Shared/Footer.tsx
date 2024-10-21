"use client";

import { Box, Typography, Link, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles'; 
import React from 'react';

const Footer: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        py: { xs: 2, sm: 3 }, // Smaller padding on mobile
        px: { xs: 2, sm: 3 },
        mt: 'auto',
        backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="body1"
          align="center"
          sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }} // Smaller font size for mobile
        >
          © {new Date().getFullYear()} Book Review Platform. All rights reserved.
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, mt: 1 }} 
        >
          <Link href="/privacy-policy" color="inherit" underline="hover">
            Privacy Policy
          </Link>{' '}
          |{' '}
          <Link href="/terms-of-service" color="inherit" underline="hover">
            Terms of Service
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
