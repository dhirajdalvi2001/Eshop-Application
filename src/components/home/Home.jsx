import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Skeleton,
  Slide,
  Typography
} from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Dropdown } from "../../common/components/Dropdown";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { formatToIndianCurrency, getTokenCookie } from "../../utils/helperFunc";
import { SearchContext } from "../layout/Layout";
import "./Home.css";

export const Home = () => {
  const { searchValue } = useContext(SearchContext);

  const navigate = useNavigate();

  const token = getTokenCookie();

  const axiosPrivate = useAxiosPrivate();
  const isAdmin = localStorage.getItem("isAdmin");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [categories, setCategories] = useState(["ALL"]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteProductName, setDeleteProductName] = useState(null);
  const [selectedSortOption, setSelectedSortOption] = useState("Default");
  const [callFetchProducts, setCallFetchProducts] = useState(0);
  const sortingOptions = ["Default", "Price: High to Low", "Price: Low to High", "Newest"];

  // Function to fetch products and categories
  async function fetchData() {
    // Fetching categories
    if (categories.length <= 1) {
      setCategoriesLoading(true);
      const categoriesData = await axiosPrivate.get("/products/categories");
      setCategories((prev) => [...prev, ...categoriesData.data]);
      setCategoriesLoading(false);
    }
    // Fetching products
    const productsData = await axiosPrivate.get("/products");
    setProducts(productsData.data);
    setFilteredProducts(productsData.data);
  }
  // Function to delete product
  async function deleteProduct() {
    try {
      const result = await axiosPrivate.delete(`/products/${deleteId}`);
      if (result.status === 204) {
        toast.success(`Product ${deleteProductName} deleted successfully`);
        setDeleteId(null);
        setDeleteProductName(null);
        setCallFetchProducts((prev) => prev + 1);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Function to sort products in ascending order
  function sortAscending() {
    const sortedProducts = [...products].sort((a, b) => a.price - b.price);
    setFilteredProducts(sortedProducts);
  }
  // Function to sort products in descending order
  function sortDescending() {
    const sortedProducts = [...products].sort((a, b) => b.price - a.price);
    setFilteredProducts(sortedProducts);
  }
  // Function to perform delayed call
  function delayedCall(func) {
    setProductsLoading(true);
    setTimeout(() => {
      func();
      setProductsLoading(false);
    }, 500);
  }
  // Function to search products
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
  function handleClose() {
    setDeleteId(null);
    setDeleteProductName(null);
  }

  useEffect(() => {
    fetchData();
  }, [callFetchProducts]);

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
        filteredProducts = products.filter((product) => product.category === selectedCategory);
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
      {/* ToggleButtonGroup for selecting categories */}
      <ToggleButtonGroup
        value={categories}
        exclusive
        onChange={(e, value) => setSelectedCategory(value)}
        aria-label="text alignment"
        size="small"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center"
        }}>
        {categoriesLoading ? (
          <div style={{ display: "flex", gap: "10px" }}>
            {Array("d", "e", "f").map((e) => {
              return <Skeleton key={e} width={100} height={50} />;
            })}
          </div>
        ) : (
          // Displaying categories as toggle buttons
          categories?.map((category) => {
            return (
              <ToggleButton
                key={category}
                value={category}
                className={`${
                  selectedCategory === category ? "active-category-tab" : "category-tab"
                }`}>
                {category}
              </ToggleButton>
            );
          })
        )}
      </ToggleButtonGroup>
      {/* Dropdown for sorting options */}
      <div
        style={{
          margin: "20px 100px",
          width: "260px",
          display: "flex",
          flexDirection: "column"
        }}>
        <Typography variant="caption">Sort By</Typography>
        <Dropdown
          options={sortingOptions}
          value={selectedSortOption}
          setValue={setSelectedSortOption}
        />
      </div>
      {/* Displaying products */}
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
          // Displaying product cards
          filteredProducts.map((product) => {
            return (
              <Card key={product?.id} className="product-card">
                <CardMedia sx={{ height: 200 }} image={product.imageUrl} title="green iguana" />
                <CardContent>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      style={{ margin: "auto 0" }}>
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
                    alignItems: "center"
                  }}>
                  <Button
                    variant="contained"
                    size="small"
                    className="button"
                    onClick={() => navigate(`/product/${product.id}`)}>
                    BUY
                  </Button>
                  {/* Edit and delete icons for admin */}
                  {isAdmin === "true" && (
                    <div>
                      <IconButton onClick={() => navigate(`/edit-product/${product.id}`)}>
                        <EditIcon style={{ width: "20px", height: "20px" }} />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          setDeleteId(product.id);
                          setDeleteProductName(product.name);
                        }}>
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
      {/* Confirmation dialog for deleting a product */}
      <Dialog
        open={deleteId ? true : null}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle>Confirm deletion of product!</DialogTitle>
        <DialogContent style={{ margin: "5px auto" }}>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete the product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteProduct} variant="contained">
            Ok
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
