import { Card, CardHeader, CardMedia, CardContent, Button } from "@mui/material";
import { capitaliseFirstLetter } from "./pokemon-card";
import { usePokemonApi } from "../hooks/pokemon.api";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAxios } from "../../services/axios-api";
import { Pokemon } from "../../model/pokemon";

interface PokemonSimpleCard{
    name: string;
    art: string;
    id: number;
}

export function PokemonSimpleCard(props: PokemonSimpleCard){
  const navigate = useNavigate()
  const pokemonApi = usePokemonApi()
  
    return (
        <Card className="mon-card">
          <div className="mon-name">

          <CardHeader title={props.name}/>
          </div>
          <CardMedia
            component="img"
            height="500"
            width="500"
            image={props.art}
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