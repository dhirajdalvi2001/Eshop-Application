import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import {
  AppBar,
  Box,
  Button,
  Link,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import "./Navbar.css";

export const Navbar = () => {
  const [searchValue, setSearchValue] = React.useState("");
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" id="navbar">
        <Toolbar>
          <Box
            width="100%"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box component="div" display="flex" gap="12px" alignItems="center">
              <ShoppingCartIcon />
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: "none", sm: "block" } }}
                fontSize="16px"
              >
                upGrad E-Shop
              </Typography>
            </Box>
            <Box width="20%" position="relative">
              <SearchIcon className="navbar-search-icon" />
              <TextField
                placeholder="Search"
                size="small"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="navbar-search"
                sx={{ borderRadius: "6px" }}
                InputProps={{
                  style: {
                    paddingLeft: "32px",
                    color: "#99A2D7",
                    borderRadius: "6px",
                  }, // Apply indentation using paddingLeft
                }}
                fullWidth
              />
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              gap="26px"
            >
              {/* User Not Logged In */}
              <React.Fragment>
                <Link href="/login" color="#fff" fontSize="14px">
                  Login
                </Link>
                <Link href="/signup" color="#fff" fontSize="14px">
                  Sign Up
                </Link>
              </React.Fragment>
              {/* User Not Logged In */}

              <Link href="/" color="#fff" fontSize="14px">
                Home
              </Link>
              {/* User is Admin */}
              <Link href="/" color="#fff" fontSize="14px">
                Add Product
              </Link>
              {/* User is Admin */}
              <Button
                variant="primary"
                sx={{
                  backgroundColor: "#F50057",
                  ":hover": { backgroundColor: "#ff2370" },
                }}
              >
                Logout
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
