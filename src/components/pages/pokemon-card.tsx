/* eslint-disable prefer-const */
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { Ability, Mfe, Stat, Type } from "../../model/pokemon";
import { usePokemonContext } from "../../contexts/PokemonContext";
import {
  Collapse,
  IconButton,
  IconButtonProps,
  styled,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

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

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface CardProps {
  name: string;
  art: string;
  abilities: Ability[];
  moves: Mfe[];
  types: Type[];
  stats: Stat[];
}

export function PokemonCard(props: CardProps) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const pokemonContext = usePokemonContext();

  return (
    <Card className="mon-card">
      <CardHeader
        title={capitaliseFirstLetter(pokemonContext.states.singlePokemon.name)}
      />
      <h3>
      Type{pokemonContext.states.singlePokemon.types.length > 1 ? "s" : ""}:
      </h3>
      {pokemonContext.states.singlePokemon.types.map((type: Type) => (
        <div key={type.type.name}>
          <span>{capitaliseFirstLetter(type.type.name)}</span>
        </div>
      ))}
      <CardMedia
        component="img"
        height="300"
        width="300"
        image={pokemonContext.states.singlePokemon.art}
        alt="pokemon"
      />
      <CardContent>
        <h3>Base stats: </h3>
        {pokemonContext.states.singlePokemon.stats.map((stat: Stat) => (
          <div key={stat.stat.name}>
            <span>
              {capitaliseFirstLetter(stat.stat.name)}:{" " + stat.base_stat}
            </span>
          </div>
        ))}
        <h3>Abilities:</h3>
        {pokemonContext.states.singlePokemon.abilities.map(
          (ability: Ability) => (
            <div key={ability.ability.name}>
              <span>
                {capitaliseFirstLetter(ability.ability.name)}
                {ability.is_hidden === true ? " (hidden ability)" : ""}
              </span>
            </div>
          )
        )}

        <h3>Moves:</h3>
          Click to expand 
          <hr/>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          {pokemonContext.states.singlePokemon.moves.map((move: Mfe) => (
            <div>
              <span key={move.move.name}>
                {capitaliseFirstLetter(move.move.name)}
              </span>
            </div>
          ))}
        </Collapse>
      </CardContent>

      <ExpandMore
        expand={expanded}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <ExpandMoreIcon />
      </ExpandMore>
    </Card>
  );
}
