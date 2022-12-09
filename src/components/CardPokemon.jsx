import { Box, Card, Skeleton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImgPokeball from "../images/Pokeball.png";
import { pokemonTypes } from "../utils/constants";

const CardPokemon = ({ props }) => {
  const { url, name } = props;
  const [isLoading, setIsLoading] = useState(true);

  const [data, setData] = useState();
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(url).then((res) => res.json());
      setData(response);
    }
    fetchData();
  }, []);

  const push = useNavigate();

  return data ? (
    <Card
      sx={{
        display: isLoading ? "none" : "block",
        width: "100%",
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px",
        cursor: "pointer",
        transition: "all .2s ease-in-out",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 10,
        },
      }}
      onClick={() => {
        push(`pokemon/${name}`);
      }}
    >
      <img
        style={{
          maxWidth: "200px",
          maxHeight: "200px",
          display: isLoading ? "none" : "block",
        }}
        onLoad={() => {
          setIsLoading(false);
        }}
        onError={(e) => {
          setIsLoading(false);
          e.target.src = ImgPokeball;
        }}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`}
      />
      <Skeleton
        sx={{ display: isLoading ? "block" : "none", borderRadius: "15px" }}
        variant="rectangular"
        width={"100%"}
        height={200}
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
            fontFamily: "Roboto Mono",
            "::first-letter": {
              textTransform: "uppercase",
            },
          }}
        >
          {name}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          {data &&
            data.types.map((element, i) => (
              <Box
                key={i}
                sx={{
                  backgroundColor: pokemonTypes[element.type.name].color,
                  borderRadius: "30px",
                  color: "#fff",
                  width: "70px",
                  textAlign: "center",
                  fontFamily: "Roboto Mono",
                  fontSize: 13,
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
  ) : (
    <Skeleton
      sx={{ borderRadius: "5px" }}
      variant="rectangular"
      width={"100%"}
      height={300}
    />
  );
};

export { CardPokemon };
