import { Card, CardHeader, CardMedia, CardContent, Button } from "@mui/material";
import { capitaliseFirstLetter } from "./pokemon-card";
import { usePokemonApi } from "../hooks/pokemon.api";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAxios } from "../../services/axios-api";
import { Pokemon } from "../../model/pokemon";

interface PokemonSimpleCard{
    name: string;
    //art: string;
    id: number;
}

export function PokemonSimpleCard(props: PokemonSimpleCard){
  const navigate = useNavigate()
  const pokemonApi = usePokemonApi()
  
    return (
        <Card className="mon-card">
          <CardHeader title={capitaliseFirstLetter(props.name)} />
          <CardMedia
            component="img"
            height="300"
            width="300"
            image={`https://img.pokemondb.net/artwork/large/${props.name}.jpg`}
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