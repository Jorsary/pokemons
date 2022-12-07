import { Box, Card, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { pokemonTypes } from "../utils/constants";

const CardPokemon = ({ props }) => {
  const { url, name } = props;

  const [data, setData] = useState();
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(url).then(res=>res.json())
      setData(response);
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
        <img
          style={{ maxWidth: "200px", maxHeight: "200px" }}
          
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
            width: "100%",
            paddingTop: "15px",
          }}
        >
          <Typography
            sx={{
              "::first-letter": {
                textTransform: "uppercase",
              },
            }}
          >
            {name}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            {data && data.types.map((element, i) => (
              <Box
                key={i}
                sx={{
                  backgroundColor: pokemonTypes[element.type.name].color,
                  borderRadius: "30px",
                  color: "#fff",
                  width: "70px",
                  textAlign: "center",
                  "::first-letter": {
                    textTransform: "uppercase",
                  },
                }}
              >
                {element.type.name}
              </Box>
            ))}
          </Box>
        </Box>
      </Card>
    )
  );
};

export default CardPokemon;
