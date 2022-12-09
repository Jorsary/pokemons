import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const NotFound = () => {
  return (
    <Box
      sx={{
        height: "75vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        Такой страницы не существует
      </Typography>
    </Box>
  );
};

export { NotFound };

