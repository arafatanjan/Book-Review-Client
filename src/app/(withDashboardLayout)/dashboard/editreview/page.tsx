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
import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import 'react-toastify/dist/ReactToastify.css';
import { Review } from "@/types/review";

interface UserInfo {
    email: string;
  }
  
  
  interface ReviewData {
    _id?: string;
    // email?: string;
    title: string;
    author: string;
    reviewText: string;
    rating: number;
  }

const Editpage = ({blog}: {blog:  ReviewData}) => {
 console.log(blog);
    const [title, setTitle] = useState<string>(blog.title);
    // const [email, setEmail] = useState<string>(blog.email ?? "");
  const [author, setAuthor] = useState<string>(blog.author);
  const [reviewText, setReviewText] = useState<string>(blog.reviewText);
  const [rating, setRating] = useState<number>(blog.rating);
//   console.log(blog._id)
  
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const token = localStorage.getItem("token");
    
        const data: ReviewData = { title, author, reviewText, rating };
        // console.log(data);

        if (!window.confirm("Are you sure you want to add this item?")) {
          return;
        }
    
        
         await fetch(`https://book-review-server-two.vercel.app/review/update/${blog._id}`, {
           method: "PATCH",
           headers: {
             "Content-type": "application/json",
            //  authorization: `Bearer ${token}`,
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
    
            //  console.log(data);
            localStorage.setItem("token", data?.token);
           
          });
      };

    return (
        <Container maxWidth="sm">
       <ToastContainer /> 
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Edit Book Review
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
};

export default Editpage;