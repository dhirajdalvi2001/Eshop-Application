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
  Skeleton,
  Typography,
} from "@mui/material";
import { SearchContext } from "../layout/Layout";

export const Home = () => {
  const { searchValue } = useContext(SearchContext);
  const token = getTokenCookie();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [categories, setCategories] = useState(["ALL"]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);

  async function fetchData() {
    setCategoriesLoading(true);
    setProductsLoading(true);
    const categoriesData = await axiosPrivate.get("/products/categories");
    setCategories((prev) => [...prev, ...categoriesData.data]);
    const productsData = await axiosPrivate.get("/products");
    setProducts(productsData.data);
    setCategoriesLoading(false);
    setProductsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
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
  }, [searchValue]);

  useEffect(() => {
    if (selectedCategory && products.length > 0) {
      if (selectedCategory === "ALL") {
        setFilteredProducts(products);
      } else {
        let filteredProducts = [];
        filteredProducts = products.filter(
          (product) => product.category === selectedCategory
        );
        setFilteredProducts(filteredProducts);
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
                <CardActions>
                  <Button variant="contained" size="small" className="button">
                    BUY
                  </Button>
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
