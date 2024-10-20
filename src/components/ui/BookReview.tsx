"use client";

import { useState, useEffect } from 'react';
import { TextField, Container, Box, Typography, Card, CardContent, Rating, Grid } from '@mui/material';
import { Review } from "@/types/review";

interface BookReviewProps {
  blogs: Review[];
}

const BookReview = ({ blogs }: BookReviewProps) => {
  const [searchText, setSearchText] = useState<string>(''); // Type-safe state for search text
  const [searchResult, setSearchResult] = useState<Review[]>(blogs); // Initialize with all blogs

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase(); // Make search case insensitive
    setSearchText(value);

    // Filter blogs based on search text
    const match = blogs.filter(blog => blog.title.toLowerCase().includes(value));
    setSearchResult(match);
  };

  return (
    <Container>
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Book Reviews
        </Typography>

        {/* Search Input */}
        <Box sx={{ margin: '40px', textAlign: 'center' }}>
          <TextField
            onChange={handleSearchChange}
            label="Search by title"
            variant="outlined"
            size="small"
            fullWidth
            sx={{ maxWidth: '400px' }}
            value={searchText} // Controlled input
          />
        </Box>

        {/* Display search results */}
        <Grid container spacing={2}>
          {searchResult.slice(0, 6).map((review) => (
            <Grid item xs={12} sm={6} md={4} key={review._id}>
              <Card sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h5">{review.title}</Typography>
                  <Typography variant="subtitle1">by {review.author}</Typography>
                  <Typography variant="body2" sx={{ my: 2 }}>
                    {review.reviewText}
                  </Typography>
                  <Rating value={review.rating} readOnly />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default BookReview;
