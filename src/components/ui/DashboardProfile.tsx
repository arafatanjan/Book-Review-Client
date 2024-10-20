"use client";

import { useEffect, useState } from 'react';
import { Review } from '@/types/review'; 
import { Table, TableBody, Container, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Typography, Box, IconButton, Avatar, TablePagination, Card, CardContent, Button, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getUserInfo } from '@/services/auth.services';
import Link from 'next/link';

const DashboardProfile = ({ blogs }: { blogs: Review[] }) => {
  const [searchBlog, setSearchBlog] = useState<Review[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const userInfo = getUserInfo();

  useEffect(() => {
    setSearchBlog(blogs); 
  }, [blogs]); 

  // Filter blogs by the user's email
  const filteredBlogs = searchBlog.filter(blog => blog.email === userInfo.email);

  // Pagination logic
  const paginatedReviews = filteredBlogs.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteProduct = (id: string) => {
    setSearchBlog(searchBlog.filter((blog) => blog._id !== id));
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return;
    }
    await fetch(`http://localhost:5000/review/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        alert("Product Deleted");
        handleDeleteProduct(id);
      });
  };

  return (
    <Container>
      {/* Profile Section */}
      <Grid container justifyContent="center" sx={{ mb: 6 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ width: '100%', boxShadow: 3, p: 2 }}>
            <CardContent>
              <Typography variant="h5" align="center" gutterBottom>
                Welcome to Your Dashboard
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Avatar
                  alt="Profile Picture"
                  sx={{ width: 64, height: 64 }}
                />
              </Box>
              <Typography variant="h6" align="center">
                <strong>Name:</strong> {userInfo.name || 'User'}
              </Typography>
              <Typography variant="h6" align="center">
                <strong>Email:</strong> {userInfo.email}
              </Typography>
            </CardContent>
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Link href={`/dashboard/EditProfile`} passHref>
                <Button variant="contained" color="primary">
                  Edit Profile
                </Button>
              </Link>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Book Reviews Section */}
      <Box sx={{ maxWidth: '100%', mx: 'auto', p: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Book Reviews
        </Typography>

        {filteredBlogs.length > 0 ? (
          <>
            <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Title</strong></TableCell>
                    <TableCell><strong>Author</strong></TableCell>
                    <TableCell><strong>Rating</strong></TableCell>
                    <TableCell><strong>Review</strong></TableCell>
                    <TableCell align="center"><strong>Actions</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedReviews.map((review) => (
                    <TableRow key={review._id}>
                      <TableCell>{review.title}</TableCell>
                      <TableCell>{review.author}</TableCell>
                      <TableCell>{review.rating} / 5</TableCell>
                      <TableCell>{review.reviewText}</TableCell>
                      <TableCell align="center">
                        <IconButton aria-label="edit">
                          <Link href={`/dashboard/${review._id}`} passHref><EditIcon /></Link>
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          color="error"
                          onClick={() => handleDelete(review._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination Controls */}
            <TablePagination
              component="div"
              count={filteredBlogs.length} 
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[3, 5, 10]}
            />
          </>
        ) : (
          <Typography variant="body1" align="center">
            No reviews available.
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default DashboardProfile;
