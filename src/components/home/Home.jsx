import React, { useContext, useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { formatToIndianCurrency, getTokenCookie } from "../../utils/helperFunc";
import { useNavigate } from "react-router-dom";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import "./Home.css";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Skeleton,
  Typography,
} from "@mui/material";
import { SearchContext } from "../layout/Layout";
import { Dropdown } from "../../common/components/Dropdown/Dropdown";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const Home = () => {
  const { searchValue } = useContext(SearchContext);
  const token = getTokenCookie();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const isAdmin = localStorage.getItem("isAdmin");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [categories, setCategories] = useState(["ALL"]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);
  const [selectedSortOption, setSelectedSortOption] = useState("Default");
  const sortingOptions = [
    "Default",
    "Price: High to Low",
    "Price: Low to High",
    "Newest",
  ];

  async function fetchData() {
    setCategoriesLoading(true);
    setProductsLoading(true);
    const categoriesData = await axiosPrivate.get("/products/categories");
    setCategories((prev) => [...prev, ...categoriesData.data]);
    const productsData = await axiosPrivate.get("/products");
    setProducts(productsData.data);
    setFilteredProducts(productsData.data);
    setCategoriesLoading(false);
    setProductsLoading(false);
  }

  function sortAscending() {
    const sortedProducts = [...products].sort((a, b) => a.price - b.price);
    setFilteredProducts(sortedProducts);
  }
  function sortDescending() {
    const sortedProducts = [...products].sort((a, b) => b.price - a.price);
    setFilteredProducts(sortedProducts);
  }
  function delayedCall(func) {
    setProductsLoading(true);
    setTimeout(() => {
      func();
      setProductsLoading(false);
    }, 500);
  }
  function searchProducts() {
    const filteredProducts = products
      .map((product) => {
        const productName = product.name?.toLowerCase();
        const searchTerm = searchValue?.toLowerCase();
        if (productName.includes(searchTerm)) {
          return product;
        }
        return null;
      })
      .filter(Boolean);
    setFilteredProducts(filteredProducts);
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    products?.length > 0 && delayedCall(searchProducts);
  }, [searchValue]);

  useEffect(() => {
    if (selectedSortOption) {
      const lowerCasedSort = selectedSortOption.toLowerCase();
      const sortArray = lowerCasedSort.split(" ")[1];
      if (lowerCasedSort.startsWith("price")) {
        if (sortArray === "high") {
          delayedCall(sortDescending);
        } else if (sortArray === "low") {
          delayedCall(sortAscending);
        }
      }
    }
  }, [selectedSortOption]);

  useEffect(() => {
    if (selectedCategory && products.length > 0) {
      if (selectedCategory === "ALL") {
        delayedCall(() => setFilteredProducts(products));
      } else {
        let filteredProducts = [];
        filteredProducts = products.filter(
          (product) => product.category === selectedCategory
        );
        delayedCall(() => setFilteredProducts(filteredProducts));
      }
    }
  }, [selectedCategory, products]);

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
        onChange={(e, value) => setSelectedCategory(value)}
        aria-label="text alignment"
        size="small"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {categoriesLoading ? (
          <div style={{ display: "flex", gap: "10px" }}>
            {Array(3)
              .fill("d")
              .map((e) => {
                return <Skeleton key={e} width={100} height={50} />;
              })}
          </div>
        ) : (
          categories?.map((category) => {
            return (
              <ToggleButton
                key={category}
                value={category}
                className={`${
                  selectedCategory === category
                    ? "active-category-tab"
                    : "category-tab"
                }`}
              >
                {category}
              </ToggleButton>
            );
          })
        )}
      </ToggleButtonGroup>
      <div
        style={{
          margin: "20px 100px",
          width: "260px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="caption">Sort By</Typography>
        <Dropdown
          options={sortingOptions}
          value={selectedSortOption}
          setValue={setSelectedSortOption}
        />
      </div>
      <div className="products-container">
        {productsLoading ? (
          <>
            {Array(3)
              .fill("d")
              .map((e, index) => (
                <div key={index} style={{ position: "relative" }}>
                  <Skeleton variant="rectangular" width={340} height={200} />
                  <Box sx={{ pt: 0.5, width: "100%" }}>
                    <Skeleton height={50} />
                    <Skeleton width="60%" height={50} />
                  </Box>
                </div>
              ))}
          </>
        ) : filteredProducts?.length > 0 ? (
          filteredProducts.map((product) => {
            return (
              <Card key={product?.id} className="product-card">
                <CardMedia
                  sx={{ height: 200 }}
                  image={product.imageUrl}
                  title="green iguana"
                />
                <CardContent>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      style={{ margin: "auto 0" }}
                    >
                      {product.name}
                    </Typography>
                    <div>{formatToIndianCurrency(product.price)}</div>
                  </div>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                </CardContent>
                <CardActions
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Button variant="contained" size="small" className="button">
                    BUY
                  </Button>
                  {isAdmin === "true" && (
                    <div>
                      <IconButton>
                        <EditIcon style={{ width: "20px", height: "20px" }} />
                      </IconButton>
                      <IconButton>
                        <DeleteIcon style={{ width: "20px", height: "20px" }} />
                      </IconButton>
                    </div>
                  )}
                </CardActions>
              </Card>
            );
          })
        ) : (
          <Typography variant="h5" color="text.secondary">
            No products found
          </Typography>
        )}
      </div>
    </div>
  );
};
