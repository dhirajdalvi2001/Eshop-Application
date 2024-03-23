import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Button, TextField, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { jwtDecode } from "jwt-decode";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { customFetch } from "../../api/axios";
import Copyright from "../../common/components/Copyright";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { getTokenCookie, setTokenCookie } from "../../utils/helperFunc";

const Login = () => {
  const navigate = useNavigate();

  const token = getTokenCookie();
  const axiosPrivate = useAxiosPrivate();

  // Function to fetch user role based on email and token
  async function fetchUserRole(userEmail, token) {
    try {
      // Fetching user data from the backend server
      const usersData = await axiosPrivate.get("/users", {
        headers: {
          Authorization: "Bearer " + token
        }
      });
      const userFound = usersData.data.filter((user) => user.email === userEmail)[0];
      const userRole = userFound.roles[0].name;
      
      // Storing user role in localStorage
      localStorage.setItem("isAdmin", userRole === "ADMIN");
    } catch (error) {
      if (error.response.status === 403) {
        // Remove isAdmin if exists
        localStorage.removeItem("isAdmin");
      }
    } finally {
      toast.success("User logged in successfully");
      navigate("/");
    }
  }

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // Making a POST request to sign in endpoint
    const result = await customFetch.post("/auth/signin", {
      username: formData.get("email"),
      password: formData.get("password")
    });

    if (result.status === 200) {
      //Setting the token
      setTokenCookie(result.data.token);
      const decoded = jwtDecode(result.data.token);
      localStorage.setItem("email", decoded.sub);
      fetchUserRole(decoded.sub, result.data.token);
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

        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {/* Input fields for Login */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />

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

          {/* Button to submit the form */}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>

          <Link href="/signup" variant="body2">
            Don&apos;t have an account? Sign Up
          </Link>
        </Box>
      </Box>

      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default Login;
