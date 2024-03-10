import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { getTokenCookie } from "../../utils/helperFunc";
import { useNavigate } from "react-router-dom";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export const Home = () => {
  const token = getTokenCookie();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [categories, setCategories] = useState();

  async function getCategories() {
    const result = await axiosPrivate.get("/products/categories");
    setCategories(result.data);
  }

  useEffect(() => {
    getCategories();
  }, []);

  // Redirect to root if user's already logged in
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  if (!token) {
    return null;
  }

  return (
    <div style={{ padding: "20px" }}>
      <ToggleButtonGroup
        value={categories}
        exclusive
        onChange={(e, value) => setCategories(value)}
        aria-label="text alignment"
        size="small"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {categories?.map((category) => {
          return (
            <ToggleButton
              key={category}
              value={category}
              style={{ color: "#B4A479" }}
            >
              {category}
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
    </div>
  );
};
