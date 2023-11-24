import { Card, CardHeader, CardMedia, CardContent, Button } from "@mui/material";
import { capitaliseFirstLetter } from "./pokemon-card";

interface PokemonSimpleCard{
    name: string;
    art: string;
    id: number;
}

const capital = capitaliseFirstLetter

export function PokemonSimpleCard(props: PokemonSimpleCard){
    return (
        <Card className="mon-card">
          <CardHeader title={capital(props.name)} />
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
          onClick={() => {console.log('HADOKEN', props.id)}}
          >
            Open pokémon details
          </Button>
          </div>
        </Card>
      );
}