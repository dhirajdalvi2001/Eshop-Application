import SearchIcon from "@mui/icons-material/Search";
import { AppBar, Box, Button, Link, Toolbar, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";
import { clearTokenCookie, getTokenCookie } from "../../utils/helperFunc";

import { ShoppingCart } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import { alpha, styled } from "@mui/material/styles";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto"
  }
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "30ch",
      "&:focus": {
        width: "40ch"
      }
    }
  }
}));

export const TopNavbar = ({ searchValue, setSearchValue }) => {
  const token = getTokenCookie();
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("isAdmin");

  function logoutHandler() {
    clearTokenCookie();
    navigate("/login");
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" id="navbar">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "inline-flex" }}>
            <IconButton href="/" edge="start" color="inherit" aria-label="eShop" sx={{ mr: 2 }}>
              <ShoppingCart />
            </IconButton>

            <Typography
              variant="h6"
              component="div"
              sx={{ mt: 0.5, display: { md: "flex", xs: "none" } }}>
              upGrad E-Shop
            </Typography>
          </Box>

          {token && (
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          )}

          <Box>
            {!token && (
              <>
                <Link href="/login" color="inherit" mr={2}>
                  Login
                </Link>
                <Link href="/signup" color="inherit" mr={2}>
                  Sign Up
                </Link>
              </>
            )}
            {token && (
              <>
                <Link href="/" color="inherit" mr={2}>
                  Home
                </Link>
                {isAdmin == "true" && (
                  <Link href="/add-product" color="inherit" mr={2}>
                    Add Product
                  </Link>
                )}
                <Button onClick={logoutHandler} variant="contained" color="error">
                  Logout
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

TopNavbar.propTypes = {
  searchValue: PropTypes.string,
  setSearchValue: PropTypes.func
};
