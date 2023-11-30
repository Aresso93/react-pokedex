import { Card, CardHeader, CardMedia, CardContent, Button } from "@mui/material";
import { capitaliseFirstLetter } from "./pokemon-card";
import { usePokemonApi } from "../hooks/pokemon.api";
import { Navigate, useNavigate } from "react-router-dom";
import { usePokemonContext } from "../../contexts/PokemonContext";

interface PokemonSimpleCard{
    name: string;
    art: string;
    id: number;
}

export function PokemonSimpleCard(props: PokemonSimpleCard){
  const navigate = useNavigate()
  const pokemonApi = usePokemonApi()
  const pokemonContext = usePokemonContext()
    return (
        <Card className="mon-card">
          <CardHeader title={capitaliseFirstLetter(props.name)} />
          <CardMedia
            component="img"
            height="300"
            width="300"
            image={props.art}
            alt="pokemon"
          />
          <div className="card-button">
          <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            navigate(`/details/${props.id}`)
          }}
          >
            Open pokémon details
          </Button>
          </div>
        </Card>
      );
}