import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";
import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { TopNavbar } from "../../common/components/TopNavbar";
import { themeOptions } from "../../common/lib/theme";
import "./Layout.css";

export const SearchContext = createContext(null);

export const Layout = () => {
  const [searchValue, setSearchValue] = useState("");
  return (
    <SearchContext.Provider value={{ searchValue }}>
      <ThemeProvider theme={themeOptions}>
        <Box component="div" id="app">
          <TopNavbar searchValue={searchValue} setSearchValue={setSearchValue} />
          <Box component="div" id="children">
            <Outlet />
          </Box>
        </Box>
      </ThemeProvider>
    </SearchContext.Provider>
  );
};
