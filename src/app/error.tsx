"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Box, Typography } from '@mui/material';

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const router = useRouter();

  
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Typography variant="h4" color="error" gutterBottom>
        Oops! Something went wrong.
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        {error.message}
      </Typography>
      <Box mt={4}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => reset()} 
          sx={{ marginRight: 2 }}
        >
          Try Again
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => router.push('/')} 
        >
          Go to Home
        </Button>
      </Box>
    </Box>
  );
}
