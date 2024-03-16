import { Button, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import "./AddProduct.css";

const initialProductState = {
  name: "",
  category: "",
  price: 0.0,
  description: "",
  manufacturer: "",
  availableItems: 0,
  imageUrl: ""
};

export const AddProduct = () => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { productId } = useParams();
  const isAdmin = localStorage.getItem("isAdmin");
  const [formData, setFormData] = useState(initialProductState);
  const [categoryOptions, setCategoryOptions] = useState([]);

  const handleChange = (value, key) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  async function fetchData() {
    try {
      const result = await axiosPrivate.get("/products/categories");
      const mappedOptions = result.data.map((category) => ({
        label: category,
        value: category
      }));
      setCategoryOptions(mappedOptions);
      if (productId) {
        const product = await axiosPrivate.get(`/products/${productId}`);
        if (product.status === 200) {
          // eslint-disable-next-line no-unused-vars
          Object.entries(formData).forEach(([key, value]) => {
            if (key === "category") {
              setFormData((prev) => ({
                ...prev,
                [key]: { label: product.data[key], value: product.data[key] }
              }));
            } else {
              setFormData((prev) => ({
                ...prev,
                [key]: product.data[key]
              }));
            }
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function addProduct(e) {
    e.preventDefault();
    try {
      const payload = formData;
      payload.category = formData.category.label;
      const result = await axiosPrivate.post("/products/", payload);
      if (result.status === 201) {
        toast.success(`Product ${formData?.name} added successfully`);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function editProduct(e) {
    e.preventDefault();
    try {
      const payload = formData;
      payload.category = formData.category.label;
      const result = await axiosPrivate.put(`/products/${productId}`, payload);
      if (result.status === 200) {
        toast.success(`Product ${formData?.name} modified successfully`);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (!isAdmin) {
    navigate("/");
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
        <Typography variant="h5" color="text.secondary" align="center">
          {productId ? "Modify" : "Add"} Product
        </Typography>

        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            type="text"
            label="Name"
            value={formData?.name}
            onChange={(e) => handleChange(e.target.value, "name")}
            placeholder="Name"
            size="small"
            autoFocus
            required
            fullWidth
            sx={{ mt: 3 }}
          />

          <CreatableSelect
            value={formData?.category}
            onChange={(e) => handleChange(e, "category")}
            isClearable
            className="react-select-container"
            options={categoryOptions}
            fullWidth
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                marginTop: 20
              })
            }}
          />

          <TextField
            type="text"
            label="Manufacturer"
            value={formData?.manufacturer}
            onChange={(e) => handleChange(e.target.value, "manufacturer")}
            placeholder="Manufacturer"
            size="small"
            required
            fullWidth
            sx={{ mt: 3 }}
          />

          <TextField
            type="number"
            label="Available Items"
            value={formData?.availableItems}
            onChange={(e) => handleChange(e.target.value, "availableItems")}
            placeholder="Available Items"
            size="small"
            required
            fullWidth
            sx={{ mt: 3 }}
          />

          <TextField
            type="number"
            label="Price"
            value={formData?.price}
            onChange={(e) => handleChange(e.target.value, "price")}
            placeholder="Price"
            size="small"
            required
            fullWidth
            sx={{ mt: 3 }}
          />

          <TextField
            type="text"
            label="Image URL"
            value={formData?.imageUrl}
            onChange={(e) => handleChange(e.target.value, "imageUrl")}
            placeholder="Image URL"
            size="small"
            required
            fullWidth
            sx={{ mt: 3 }}
          />

          <TextField
            type="text"
            label="Description"
            value={formData?.description}
            onChange={(e) => handleChange(e.target.value, "description")}
            placeholder="Description"
            size="small"
            required
            fullWidth
            sx={{ mt: 3 }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={productId ? editProduct : addProduct}>
            {productId ? "Modify" : "Save"} Product
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
