import React, { createContext, useState } from "react";
import { TopNavbar } from "../../common/components/TopNavbar/TopNavbar";
import { Outlet } from "react-router-dom";
import "./Layout.css";

export const SearchContext = createContext(null);

export const Layout = () => {
  const [searchValue, setSearchValue] = useState("");
  return (
    <SearchContext.Provider value={{ searchValue }}>
      <div id="app">
        <TopNavbar searchValue={searchValue} setSearchValue={setSearchValue} />
        <div id="children">
          <Outlet />
        </div>
      </div>
    </SearchContext.Provider>
  );
};
