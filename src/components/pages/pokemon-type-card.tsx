import { Card, CardHeader, CardMedia, Button } from "@mui/material";
import { capitaliseFirstLetter } from "./pokemon-card";
import { Pokemon } from "../../model/pokemon";

interface TypeCardProps{
    name: string;
    id: number;
  
}

export function TypeCard(props: TypeCardProps){

    return (
        <div>
          {capitaliseFirstLetter(props.name)}    
        </div>
      );
}