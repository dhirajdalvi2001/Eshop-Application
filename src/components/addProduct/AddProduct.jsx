import { Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import CreatableSelect from "react-select/creatable";
import "./AddProduct.css";
import { toast } from "react-toastify";

const initialProductState = {
  name: "",
  category: "",
  price: 0.0,
  description: "",
  manufacturer: "",
  availableItems: 0,
  imageUrl: "",
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
        value: category,
      }));
      setCategoryOptions(mappedOptions);
      if (productId) {
        const product = await axiosPrivate.get(`/products/${productId}`);
        if (product.status === 200) {
          Object.entries(formData).forEach(([key, value]) => {
            if (key === "category") {
              setFormData((prev) => ({
                ...prev,
                [key]: { label: product.data[key], value: product.data[key] },
              }));
            } else {
              setFormData((prev) => ({
                ...prev,
                [key]: product.data[key],
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <div
        style={{
          width: "300px",
          margin: "50px auto",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <Typography variant="h5" color="text.secondary" align="center">
          {productId ? "Modify" : "Add"} Product
        </Typography>
        <form className="signup-form" autoComplete="off">
          <TextField
            type="text"
            label="Name"
            value={formData?.name}
            onChange={(e) => handleChange(e.target.value, "name")}
            placeholder="Name"
            size="small"
            required
          />
          <CreatableSelect
            value={formData?.category}
            onChange={(e) => handleChange(e, "category")}
            isClearable
            className="react-select-container"
            options={categoryOptions}
          />
          <TextField
            type="text"
            label="Manufacturer"
            value={formData?.manufacturer}
            onChange={(e) => handleChange(e.target.value, "manufacturer")}
            placeholder="Manufacturer"
            size="small"
            required
          />
          <TextField
            type="number"
            label="Available Items"
            value={formData?.availableItems}
            onChange={(e) => handleChange(e.target.value, "availableItems")}
            placeholder="Available Items"
            size="small"
            required
          />
          <TextField
            type="number"
            label="Price"
            value={formData?.price}
            onChange={(e) => handleChange(e.target.value, "price")}
            placeholder="Price"
            size="small"
            required
          />
          <TextField
            type="text"
            label="Image URL"
            value={formData?.imageUrl}
            onChange={(e) => handleChange(e.target.value, "imageUrl")}
            placeholder="Image URL"
            size="small"
            required
          />
          <TextField
            type="text"
            label="Description"
            value={formData?.description}
            onChange={(e) => handleChange(e.target.value, "description")}
            placeholder="Description"
            size="small"
            required
          />
          <Button
            variant="contained"
            type="submit"
            className="button"
            onClick={productId ? editProduct : addProduct}
          >
            {productId ? "Modify" : "Save"} Product
          </Button>
        </form>
      </div>
    </div>
  );
};
