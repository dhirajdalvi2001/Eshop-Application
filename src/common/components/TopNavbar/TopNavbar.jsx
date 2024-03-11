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
import "./TopNavbar.css";
import { clearTokenCookie, getTokenCookie } from "../../../utils/helperFunc";
import { useNavigate } from "react-router-dom";

export const TopNavbar = ({ searchValue, setSearchValue }) => {
  const token = getTokenCookie();
  const navigate = useNavigate();

  function logoutHandler() {
    clearTokenCookie();
    navigate("/login");
  }

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
                <Link
                  href="/"
                  color="#fff"
                  fontSize="14px"
                  style={{ textDecoration: "none" }}
                >
                  upGrad E-Shop
                </Link>
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
              <Link href="/" color="#fff" fontSize="14px">
                Home
              </Link>
              {/* User Not Logged In */}
              {!token && (
                <React.Fragment>
                  <Link href="/login" color="#fff" fontSize="14px">
                    Login
                  </Link>
                  <Link href="/signup" color="#fff" fontSize="14px">
                    Sign Up
                  </Link>
                </React.Fragment>
              )}
              {/* User Not Logged In */}

              {/* User is Admin */}
              <Link href="/" color="#fff" fontSize="14px">
                Add Product
              </Link>
              {/* User is Admin */}
              {token && (
                <Button
                  variant="primary"
                  sx={{
                    backgroundColor: "#F50057",
                    ":hover": { backgroundColor: "#ff2370" },
                  }}
                  onClick={logoutHandler}
                >
                  Logout
                </Button>
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
