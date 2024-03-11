import React, { useEffect, useState } from "react";
import "./Login.css";
import { Footer } from "../../common/components/Footer/Footer";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { customFetch } from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getTokenCookie, setTokenCookie } from "../../utils/helperFunc";
import { jwtDecode } from "jwt-decode";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const initialFormData = {
  username: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const token = getTokenCookie();
  const axiosPrivate = useAxiosPrivate();
  const [formData, setFormData] = useState(initialFormData);
  const handleChange = (value, key) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  async function fetchUserRole(userEmail, token) {
    try {
      const usersData = await axiosPrivate.get("/users", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const userFound = usersData.data.filter(
        (user) => user.email === userEmail
      )[0];
      const userRole = userFound.roles[0].name;
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await customFetch.post("/auth/signin", formData);
    if (result.status === 200) {
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
    <div id="login">
      <IconButton
        sx={{
          backgroundColor: "#F50057",
          ":hover": { backgroundColor: "#ff2370" },
        }}
      >
        <LockOpenIcon style={{ color: "white" }} />
      </IconButton>
      <Typography fontSize="20px">Sign In</Typography>
      <form className="login-form">
        <TextField
          type="email"
          label="Email Address"
          value={formData?.email}
          onChange={(e) => handleChange(e.target.value, "username")}
          placeholder="Email Address"
          autoComplete="off"
          required
        />
        <TextField
          type="password"
          label="Password"
          value={formData?.password}
          onChange={(e) => handleChange(e.target.value, "password")}
          placeholder="Password"
          autoComplete="off"
          required
        />
        <Button
          variant="contained"
          type="submit"
          className="button"
          onClick={handleSubmit}
        >
          Sign In
        </Button>
        <a href="/signup" style={{ fontSize: "14px" }}>
          Don't have an account? Sign Up
        </a>
      </form>
      <Footer />
    </div>
  );
};

export default Login;
