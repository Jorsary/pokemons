import React, { useEffect, useState } from "react";
import { Box, Typography, Card, Button } from "@mui/material";
import { overgrow, pokemonTypes } from "../utils/constants";
import axios from "axios";

const CardPokemon = ({ props }) => {
  const { url, name } = props;

  const [data, setData] = useState();
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(url);
      setData(response.data);
    }

    fetchData();
  }, []);

  return (
    data && (
      <Card
        sx={{
          width: "100%",
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        {/* <img
          style={{ maxWidth: "200px", maxHeight: "200px" }}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`}
        /> */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography>
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            {overgrow.types.map((element) => (
              <Button
                sx={{
                  backgroundColor: pokemonTypes[element.type.name].color,
                  borderRadius: "30px",
                  padding: "0 10px",
                  color: "#fff",
                }}
              >
                {element.type.name}
              </Button>
            ))}
          </Box>
        </Box>
      </Card>
    )
  );
};

export default CardPokemon;
