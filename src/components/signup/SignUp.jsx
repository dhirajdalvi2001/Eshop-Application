import React, { useState } from "react";
import "./SignUp.css";
import { Footer } from "../../common/components/Footer/Footer";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";

export const SignUp = () => {
  const [formData, setFormData] = useState({});
  const handleChange = (value, key) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };
  return (
    <div id="signup">
      <IconButton
        sx={{
          backgroundColor: "#F50057",
          ":hover": { backgroundColor: "#ff2370" },
        }}
      >
        <LockOpenIcon style={{ color: "white" }} />
      </IconButton>
      <Typography fontSize="20px">Sign Up</Typography>
      <form className="signup-form">
        <TextField
          type="text"
          label="First Name"
          value={formData?.firstName}
          onChange={(e) => handleChange(e.target.value, "firstName")}
          placeholder="First Name"
          size="small"
          required
        />
        <TextField
          type="text"
          label="Last Name"
          value={formData?.lastName}
          onChange={(e) => handleChange(e.target.value, "lastName")}
          placeholder="Last Name"
          size="small"
          required
        />
        <TextField
          type="email"
          label="Email Address"
          value={formData?.email}
          onChange={(e) => handleChange(e.target.value, "email")}
          placeholder="Email Address"
          size="small"
          required
        />
        <TextField
          type="password"
          label="Password"
          value={formData?.password}
          onChange={(e) => handleChange(e.target.value, "password")}
          placeholder="Password"
          size="small"
          required
        />
        <TextField
          type="password"
          label="Confirm Password"
          value={formData?.confirmPassword}
          onChange={(e) => handleChange(e.target.value, "confirmPassword")}
          placeholder="Confirm Password"
          size="small"
          required
        />
        <TextField
          type="number"
          label="Contact Number"
          value={formData?.contact}
          onChange={(e) => handleChange(e.target.value, "contact")}
          placeholder="Contact Number"
          size="small"
          required
        />
        <Button variant="contained" type="submit" className="button">
          Sign Up
        </Button>
        <a href="/login" style={{ textAlign: "right" }} className="hyperlink">
          Already have an account? Sign in
        </a>
      </form>
      <Footer />
    </div>
  );
};
