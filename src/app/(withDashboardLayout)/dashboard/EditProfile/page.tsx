"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { getUserInfo } from "@/services/auth.services";

export default function EditProfile() {
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(true);
  const formRef = useRef<HTMLFormElement>(null);
  const [initialUserInfo, setInitialUserInfo] = useState({ username: "", email: "" });

  // Fetch user info once and populate form
  const userInfo = getUserInfo();
  useEffect(() => {
    const fetchUserInfo = async () => {
      
      console.log(userInfo)
      if (userInfo) {
        setInitialUserInfo(userInfo);
        console.log(initialUserInfo)
      }
      setLoading(false);
    };

    fetchUserInfo();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) return;

    const form = formRef.current;
    const username = (form.elements.namedItem("username") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;

    const userData = { username, email };

    if (!window.confirm("Are you sure you want to update?")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/user/${userInfo?.email}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log(result);
      setShowToast(true);
      form.reset(); // Reset form after successful submission
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom align="center">
        Edit Profile
      </Typography>

      <Snackbar
        open={showToast}
        autoHideDuration={3000}
        onClose={() => setShowToast(false)}
      >
        <Alert onClose={() => setShowToast(false)} severity="success">
          Profile updated successfully!
        </Alert>
      </Snackbar>

      {!loading && (
        <form ref={formRef} onSubmit={handleSubmit} noValidate>
           <TextField
            label="User Name"
            name="username"
            defaultValue={userInfo.name}
            fullWidth
            margin="normal"
            variant="outlined"
            
          />
          <TextField
            label="User Email"
            name="email"
            defaultValue={userInfo.email}
            fullWidth
            margin="normal"
            variant="outlined"
            
          />

          <div style={{ textAlign: "center", marginTop: "16px" }}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Update Profile
            </Button>
          </div>
        </form>
      )}
    </Container>
  );
}
