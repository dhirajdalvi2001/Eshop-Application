import React, { useState } from "react";
import "./Login.css";
import { Footer } from "../../common/components/Footer/Footer";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";

const Login = () => {
  const [formData, setFormData] = useState({});
  const handleChange = (value, key) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };
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
          onChange={(e) => handleChange(e.target.value, "email")}
          placeholder="Email Address"
          required
        />
        <TextField
          type="password"
          label="Password"
          value={formData?.password}
          onChange={(e) => handleChange(e.target.value, "password")}
          placeholder="Password"
          required
        />
        <Button variant="contained" type="submit" className="button">
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
