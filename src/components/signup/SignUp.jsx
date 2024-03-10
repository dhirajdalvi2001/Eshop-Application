import React, { useEffect, useState } from "react";
import "./SignUp.css";
import { Footer } from "../../common/components/Footer/Footer";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { customFetch } from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { getTokenCookie } from "../../utils/helperFunc";
import { toast } from "react-toastify";

const initialFormData = {
  email: "",
  firstName: "",
  lastName: "",
  contactNumber: "",
  password: "",
  confirmPassword: "",
};

export const SignUp = () => {
  const navigate = useNavigate();
  const token = getTokenCookie();
  const [formData, setFormData] = useState(initialFormData);
  const handleChange = (value, key) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) return;
    const result = await customFetch.post("/auth/signup", formData);
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
      <form className="signup-form" autoComplete="off">
        <TextField
          type="text"
          label="First Name"
          value={formData?.firstName}
          onChange={(e) => handleChange(e.target.value, "firstName")}
          placeholder="First Name"
          size="small"
        />
        <TextField
          type="text"
          label="Last Name"
          value={formData?.lastName}
          onChange={(e) => handleChange(e.target.value, "lastName")}
          placeholder="Last Name"
          size="small"
        />
        <TextField
          type="email"
          label="Email Address"
          value={formData?.email}
          onChange={(e) => handleChange(e.target.value, "email")}
          placeholder="Email Address"
          size="small"
        />
        <TextField
          type="password"
          label="Password"
          value={formData?.password}
          onChange={(e) => handleChange(e.target.value, "password")}
          placeholder="Password"
          size="small"
        />
        <TextField
          type="password"
          label="Confirm Password"
          value={formData?.confirmPassword}
          onChange={(e) => handleChange(e.target.value, "confirmPassword")}
          placeholder="Confirm Password"
          size="small"
        />
        <TextField
          type="number"
          label="Contact Number"
          value={formData?.contact}
          onChange={(e) => handleChange(e.target.value, "contactNumber")}
          placeholder="Contact Number"
          size="small"
        />
        <Button
          variant="contained"
          type="submit"
          className="button"
          onClick={handleSubmit}
        >
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
