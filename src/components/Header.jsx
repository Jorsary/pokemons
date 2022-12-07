import React from "react";
import { AppBar, Toolbar } from "@mui/material";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
        <img style={{ width: "100px" }} src={"./logo.svg"} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
