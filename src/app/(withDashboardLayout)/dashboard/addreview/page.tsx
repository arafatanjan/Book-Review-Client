"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Rating,
} from "@mui/material";
import { getUserInfo } from "@/services/auth.services";
import { toast, ToastContainer } from 'react-toastify';import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.css';


interface UserInfo {
  email: string;
}


interface ReviewData {
  email: string;
  title: string;
  author: string;
  reviewText: string;
  rating: number;
}

export default function AddReview() {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [reviewText, setReviewText] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  // const [showToast, setShowToast] = useState<boolean>(false);
  const router = useRouter();

  
  const userInfo: UserInfo = getUserInfo();
  // console.log(userInfo.email);

  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    // Form data

    const email = userInfo.email;

    const form = e.currentTarget as HTMLFormElement;
    // console.log(form);
  
    //  const author = form.author.value;
    //  const title = form.title.value;
    //  const reviewText = form.reviewText.value;
    //  const rating = parseInt(form.rating.value, 10);

    const data: ReviewData = { email, title, author, reviewText, rating };
    // console.log(data);

    // Confirm before adding the review
    if (!window.confirm("Are you sure you want to add this item?")) {
      return;
    }

    // Post the review to the backend
    await fetch("https://book-review-server-two.vercel.app/review", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        setTitle('');      
        setAuthor('');    
        setReviewText(''); 
        setRating(0);     
      
        toast.success('Review submitted successfully!', {
          position: "top-right",
          autoClose: 2000, 
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // console.log(data);
        localStorage.setItem("token", data?.token);
       
        //  form.reset();
      });
  };

  return (
    <Container maxWidth="sm">
       <ToastContainer /> 
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Add Book Review
        </Typography>

        <form onSubmit={handleSubmit}>

          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
             value={title}
             onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="author"
            label="Author"
            name="author"
             value={author}
             onChange={(e) => setAuthor(e.target.value)}
          />

          <Typography component="legend">Rating</Typography>
          <Rating
            name="rating"
             value={rating}
             onChange={(e, newValue) => setRating(newValue ?? 0)}
          />

          <TextField 
             margin="normal"
            fullWidth
            required
            multiline
            rows={4}
            id="reviewText"
            label="Review"
            name="reviewText"
             value={reviewText}
             onChange={(e) => setReviewText(e.target.value)}
          />
         
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ mt: 2 }}
          >
            Submit Review
          </Button>
        </form>
      </Box>
    </Container>
  );
}
