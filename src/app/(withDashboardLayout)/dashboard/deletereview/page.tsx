"use client";

import { Button, Container, Box, Typography } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation'; // Import new hooks from next/navigation

export default function ReviewDetails() {
  const router = useRouter(); // New router hook from next/navigation
  const searchParams = useSearchParams(); // Get query parameters with useSearchParams
  const id = searchParams.get('id'); // Retrieve the 'id' query param (or use any other parameter name)

  const handleDelete = async () => {
    const token = localStorage.getItem('token'); // Retrieve JWT token from local storage

    const res = await fetch(`/api/reviews/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      router.push('/reviews'); // Navigate back to the reviews page
    } else {
      console.error('Failed to delete review');
    }
  };

  return (
    <Container>
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4">Review Details</Typography>
        {/* Review details go here */}
        <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
          sx={{ mt: 2 }}
        >
          Delete Review
        </Button>
      </Box>
    </Container>
  );
}
