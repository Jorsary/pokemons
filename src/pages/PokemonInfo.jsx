import styled from "@emotion/styled";
import {
  Box,
  Card,
  Container,
  IconButton,
  LinearProgress,
  Typography,
} from "@mui/material";
import { linearProgressClasses } from "@mui/material/LinearProgress";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { PokemonStats, pokemonTypes } from "../utils/constants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { setLoading } from "../redux/slices/pokemons/pokemonsSlice";
const BorderLinearProgress = styled(LinearProgress)(({ theme, props }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: props.main,
  },
}));

export const Subtitle = styled(Typography)(() => ({
  fontWeight: 500,
  fontFamily: "Roboto Mono",
  fontSize: 16,
  justifySelf: "start",
}));

const PokemonInfo = () => {
  const { pokemons } = useAppSelector((state) => state.pokemon);
  const [data, setData] = useState();
  const { id } = useParams();
  const push = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    const fetchPokemon = async () =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((res) => res.json())
        .then((data) => setData(data))
    fetchPokemon();
  }, [pokemons]);

  return (
    <Container maxWidth="sm" sx={{}}>
      {data && (
        <>
          <Box
            sx={{
              display: "flex",
              padding: "15px",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <IconButton onClick={() => push(-1)}>
              <ArrowBackIcon />
            </IconButton>
            <Box
              sx={{
                display: "flex",
                gap: "5px",
              }}
            >
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
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "20px",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontWeight: 500,
                fontFamily: "Roboto Mono",
                fontSize: 20,
                textTransform: "uppercase",
              }}
            >
              {data.name}
            </Typography>

            <img
              style={{ maxWidth: "400px", maxHeight: "400px", width: "100%" }}
              onLoad={()=>dispatch(setLoading(false))}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`}
            />
            <Box sx={{ display: "flex", alignSelf: "stretch", gap: "20px" }}>
              <Box
                sx={{
                  width: "30%",
                }}
              >
                <Subtitle>Abilities:</Subtitle>
                {data.abilities.map((item, i) => (
                  <Box
                    key={i}
                    sx={{
                      fontFamily: "Roboto Mono",
                      fontSize: 15,
                      "::first-letter": {
                        textTransform: "uppercase",
                      },
                    }}
                  >
                    {item.ability.name}
                  </Box>
                ))}
                <Subtitle sx={{ paddingTop: "10px" }}>Other:</Subtitle>
                <Box
                  sx={{ gap: "10px", display: "flex", flexDirection: "column" }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Roboto Mono",
                      fontSize: 15,
                      border: "1px solid gray",
                      borderRadius: "15px",
                      textAlign: "center",
                    }}
                  >
                    {"Height " + data.height}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Roboto Mono",
                      fontSize: 15,
                      border: "1px solid gray",
                      borderRadius: "15px",
                      textAlign: "center",
                    }}
                  >
                    {"Weight " + data.weight}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  width: "70%",
                }}
              >
                <Subtitle>Stats:</Subtitle>
                {data.stats.map((item, i) => (
                  <Box key={i}>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "Roboto Mono",
                          "::first-letter": {
                            textTransform: "uppercase",
                          },
                        }}
                      >
                        {item.stat.name}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "Roboto Mono",
                          "::first-letter": {
                            textTransform: "uppercase",
                          },
                        }}
                      >
                        {item.base_stat}
                      </Typography>
                    </Box>
                    <BorderLinearProgress
                      props={{ main: PokemonStats[item.stat.name] }}
                      variant="determinate"
                      value={item.base_stat}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </Card>
        </>
      )}
    </Container>
  );
};

export { PokemonInfo };
