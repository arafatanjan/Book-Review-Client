"use client";

import Image from "next/image";

import { useState, useEffect } from 'react';
import { Container, Box, Typography, Card, CardContent, Rating, Button } from '@mui/material';
import Link from 'next/link';
import Banner from "@/components/Shared/Banner";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch all reviews from the backend
    const fetchReviews = async () => {
      const res = await fetch('/api/reviews');
      const data = await res.json();
      setReviews(data);
    };

    fetchReviews();
  }, []);

  return (
    <Container>
      <Banner/>
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>Book Reviews</Typography>
        {/* {reviews.map((review) => ( */}
           {/* <Card key={review._id} sx={{ mb: 2 }}> */}
          <Card  sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h5">review.title</Typography>
              <Typography variant="subtitle1">by review.author</Typography>
              <Typography variant="body2" sx={{ my: 2 }}>review.reviewText</Typography>
              {/* <Rating value={review.rating} readOnly /> */}
              {/* <Box sx={{ mt: 2 }}>
                <Link href={`/reviews/${review._id}`} passHref>
                  <Button variant="outlined">View Details</Button>
                </Link>
              </Box> */}
            </CardContent>
          </Card>
        {/* ))} */}
      </Box>
    </Container>
  );
}
