import { MenuItem, Select } from "@mui/material";
import React from "react";

export const Dropdown = ({ options, value, setValue }) => {
  return (
    <div style={{ position: "relative", width: "100%", display: "flex" }}>
      <Select
        labelId="demo-multiple-name-label"
        id="demo-multiple-name"
        value={value}
        size="small"
        fullWidth
        onChange={(e) => setValue(e.target.value)}
        inputProps={{ "aria-label": "Without label" }}
      >
        {options.map((name) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
      <div
        style={{
          margin: "auto 0",
          width: "1px",
          position: "absolute",
          right: "36px",
          top: "3px",
          fontSize: "24px",
          color: "#C4C4C4",
        }}
      >
        |
      </div>
    </div>
  );
};
