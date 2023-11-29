/* eslint-disable prefer-const */
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { Ability, Mfe, Stat, Type } from "../../model/pokemon";

export function capitaliseFirstLetter(string: string) {
  if (string.includes("-")) {
    let splitArray = string.split("-");
    let newArray = [];
    for (let i = 0; i < splitArray.length; i++) {
      const arrayString = splitArray[i];
      const newString =
        arrayString.charAt(0).toUpperCase() + arrayString.slice(1);
      newArray.push(newString);
    }
    return newArray.join(" ");
  } else {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
interface CardProps {
  name: string;
  art: string;
  abilities: Ability[];
  moves: Mfe[];
  types: Type[];
  stats: Stat[];
}

export function PokemonCard(props: CardProps) {
  return (
    <Card className="mon-card">
      <CardHeader title={capitaliseFirstLetter(props.name)} />
      <h3>Type{props.types.length > 1 ? "s" : ""}:</h3>
      {props.types.map((type: Type) => (
        <div key={type.type.name}>
          <span>{capitaliseFirstLetter(type.type.name)}</span>
        </div>
      ))}
      <CardMedia
        component="img"
        height="300"
        width="300"
        image={props.art}
        alt="pokemon"
      />
      <CardContent>
        <h3>Base stats: </h3>
        {props.stats.map((stat: Stat) => (
          <div key={stat.stat.name}>
            <span>
              {capitaliseFirstLetter(stat.stat.name)}:{" " + stat.base_stat}
            </span>
          </div>
        ))}
        <h3>Abilities:</h3>
        {props.abilities.map((ability: Ability) => (
          <div key={ability.ability.name}>
            <span>
              {capitaliseFirstLetter(ability.ability.name)}
              {ability.is_hidden === true ? " (hidden ability)" : ""}
            </span>
          </div>
        ))}
        <h3>Moves:</h3>
        {props.moves.map((move: Mfe) => (
          <div>
            <span key={move.move.name}>
              {capitaliseFirstLetter(move.move.name)}
              {}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
