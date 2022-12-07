import { MenuItem, Pagination, Select } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  setCurrentPage,
  setItemsPerPage,
} from "../redux/slices/pokemons/pokemonsSlice";

const Paginator = () => {
  const { itemsPerPage, totalPages, currentPage } = useAppSelector(
    (state) => state.pokemon
  );

  const dispatch = useAppDispatch();

  const handleChange = (event, value) => {
    dispatch(setCurrentPage(value));
  };

  const handleItemsPerPageChange = (event) => {
    dispatch(setItemsPerPage(event.target.value));
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: {xs:'column', sm:'row'},
        gap:'10px'
      }}
    >
      <Select
        variant="standard"
        value={itemsPerPage}
        onChange={handleItemsPerPageChange}
      >
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={20}>20</MenuItem>
        <MenuItem value={50}>50</MenuItem>
      </Select>
      <Pagination
        size="small"
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
      />
    </Box>
  );
};

export default Paginator;
