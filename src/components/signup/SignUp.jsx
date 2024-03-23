import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Button, TextField, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { customFetch } from "../../api/axios";
import Copyright from "../../common/components/Copyright";
import { getTokenCookie } from "../../utils/helperFunc";

export const SignUp = () => {
  const navigate = useNavigate();

  const token = getTokenCookie();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // Check if password and confirm password match
    if (formData.password !== formData.confirmPassword) return;

    // Making a POST request to sign up endpoint
    const result = await customFetch.post("/auth/signup", {
      email: formData.get("email"),
      firstName: formData.get("fname"),
      lastName: formData.get("lname"),
      contactNumber: formData.get("phone"),
      password: formData.get("password"),
      confirmPassword: formData.get("cpassword")
    });

    if (result.status === 200) {
      navigate("/login");
      toast.success(result.data.message);
    }
  };

  // Redirect to root if user's already logged in
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  if (token) {
    return null;
  }

  return (
    <Container component="div" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>

        {/* the form title */}
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {/* Input fields for user details */}

          {/* Input field for First Name */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="fname"
            label="First Name"
            name="fname"
            autoFocus
            autoComplete="fname"
          />

          {/* Input field for Last Name */}
          <TextField
            margin="normal"
            required
            fullWidth
            name="lname"
            label="Last Name"
            id="lname"
            autoComplete="lname"
          />

          {/* Input field for Email */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />

          {/* Input field for Password */}
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          {/* Input field for Confirm Password */}
          <TextField
            margin="normal"
            required
            fullWidth
            name="cPassword"
            label="Confirm Password"
            type="password"
            id="cpassword"
            autoComplete="current-password"
          />

          {/* Input field for Contact Number */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Contact Number"
            name="phone"
            autoComplete="phone"
            type="tel"
          />
          
          {/* Button to submit the form */}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>

          {/* Lnk to the login page */}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};
