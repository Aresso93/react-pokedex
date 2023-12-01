import { Card, CardHeader, CardMedia, CardContent, Button } from "@mui/material";
import { capitaliseFirstLetter } from "./pokemon-card";
import { usePokemonApi } from "../hooks/pokemon.api";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAxios } from "../../services/axios-api";
import { Pokemon } from "../../model/pokemon";

interface PokemonSimpleCard{
    name: string;
}

export function PokemonSimpleCard(props: PokemonSimpleCard){
  const navigate = useNavigate()
  const pokemonApi = usePokemonApi()
  const axiosService = useAxios()
  const [singlePokemon, setSinglePokemon] = useState({
    name: "",
    id: 0,
    abilities: [],
    types: [],
    moves: [],
    stats: [],
    sprites: {
      other: {"official-artwork": ''},
    },
  });

  console.log(singlePokemon);

  async function getSinglePokemon(pokemonName: string) {
    const pokemonResp = await axiosService("pokemon/" + pokemonName);
    setSinglePokemon(pokemonResp.data);
  }

  useEffect(() => {
    getSinglePokemon(props.name);
  }, []);

    return (
        <Card className="mon-card">
          <div className="mon-name">

          <CardHeader title={capitaliseFirstLetter(props.name)}/>
          </div>
          <CardMedia
            component="img"
            height="500"
            width="500"
            image={singlePokemon.sprites.other["official-artwork"].front_default}
            alt={`${props.name}-img`}
          />
          <div className="card-button">
          <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            navigate(`/details/${props.name}`)
          }}
          >
            Open pokémon details
          </Button>
          </div>
        </Card>
      );
}