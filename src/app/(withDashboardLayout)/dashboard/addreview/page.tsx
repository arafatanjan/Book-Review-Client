"use client";

import { useState } from 'react';
import { useRouter } from 'next/router';
import { TextField, Button, Container, Box, Typography, Rating } from '@mui/material';

export default function AddReview() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const token = localStorage.getItem('token'); // Retrieve JWT token
    
//     const res = await fetch('/api/reviews', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}` // Send token for authentication
//       },
//       body: JSON.stringify({ title, author, reviewText, rating }),
//     });

//     if (res.ok) {
//       router.push('/reviews'); // Redirect to the reviews page
//     } else {
//       console.error('Failed to add review');
//     }
//   };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>Add Book Review</Typography>
        <form>
        {/* <form onSubmit={handleSubmit}> */}
          <TextField
            label="Book Title"
            fullWidth
            required
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Author"
            fullWidth
            required
            margin="normal"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <TextField
            label="Review"
            fullWidth
            required
            multiline
            rows={4}
            margin="normal"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          {/* <Rating
            name="rating"
            value={rating}
            onChange={(e, newValue) => setRating(newValue)}
          /> */}
          <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
            Submit Review
          </Button>
        </form>
      </Box>
    </Container>
  );
}
