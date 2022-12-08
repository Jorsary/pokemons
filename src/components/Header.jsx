import React from "react";
import { AppBar, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const push = useNavigate();
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
        <img
          style={{ width: "100px" }}
          src={"../logo.svg"}
        />
      </Toolbar>
    </AppBar>
  );
};

export { Header };
