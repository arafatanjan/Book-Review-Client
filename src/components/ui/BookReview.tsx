"use client";

import { useState, useEffect } from 'react';
import { TextField, Container, Box, Typography, Card, CardContent, Rating, Grid,  Pagination, Stack  } from '@mui/material';
import { Review } from "@/types/review";

interface BookReviewProps {
  blogs: Review[];
}

const BookReview = ({ blogs }: BookReviewProps) => {
  const [searchText, setSearchText] = useState<string>(''); 
  const [searchResult, setSearchResult] = useState<Review[]>(blogs);
  const [page, setPage] = useState<number>(1);  
  const rowsPerPage = 6; 

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase(); 
    setSearchText(value);

    
    const match = blogs.filter(blog => blog.title.toLowerCase().includes(value));
    setSearchResult(match);
    setPage(1);
  };

  // Calculation of reviews to display based on the current page
  const paginatedReviews = searchResult.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  // Handle page change
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
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
            value={searchText} 
          />
        </Box>

        {/* Display search results */}
        <Grid container spacing={2}>
          {paginatedReviews.map((review) => (
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
        {/* Pagination Controls */}
        <Stack spacing={2} alignItems="center" sx={{ mt: 4 }}>
          <Pagination
            count={Math.ceil(searchResult.length / rowsPerPage)} // Total number of pages
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Stack>
      </Box>
    </Container>
  );
};

export default BookReview;
