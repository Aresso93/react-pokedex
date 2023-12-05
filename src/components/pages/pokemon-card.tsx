import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { Ability, Mfe, Pokemon, Stat, Type } from "../../model/pokemon";
import { useParams } from "react-router-dom";
import {
  Collapse,
  IconButton,
  IconButtonProps,
  styled,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import { useAxios } from "../../services/axios-api";

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
  weight: number;
  height: number;
}

export function PokemonCard(props: CardProps) {
  const axiosService = useAxios()
  const {pokemonName} = useParams();

  const [pokemon, setPokemon] = useState({name: '', types: [], stats: [], moves: [], abilities: [], id: 0, height: 0, weight: 0})

  useEffect(() => {
    axiosService.get("https://pokeapi.co/api/v2/pokemon/"+pokemonName)
    .then((resp) => setPokemon(resp.data))
    
  }, [pokemonName]);

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className="mon-card">
      <div className="mon-card-header">
      <CardHeader
        title={capitaliseFirstLetter(pokemon.name)}
      />

      </div>
      <div className="upper-div">
        <div className="type-div">
      <h3>
       Type{pokemon.types.length > 1 ? "s" : ""}
      </h3>
      {pokemon.types.map((type: Type) => (
        <div key={type.type.name}>
          <span>{capitaliseFirstLetter(type.type.name)}</span>
        </div>
      ))}

        </div>
        <div className="spacer"></div>
        <div className="pokemon-size-container">
        <h3>Size</h3>
        <span>Weight: {pokemon.weight / 10} kgs</span>
        <span>Height: {pokemon.height / 10} m</span>
        </div>
      </div>
      <CardMedia
        component="img"
        height="500"
        image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
        alt="pokemon"
      />
      <CardContent>
        <h3>Base stats: </h3>
        {pokemon.stats.map((stat: Stat) => (
          <div key={stat.stat.name}>
            <span>
              {capitaliseFirstLetter(stat.stat.name)}:{" " + stat.base_stat}
            </span>
          </div>
        ))}
        <h3>Abilities:</h3>
        {pokemon.abilities.map(
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
        
            <div className="moves-container">

          {pokemon.moves.map((move: Mfe) => (
        
              <div className="move-div" key={move.move.name}>
                {capitaliseFirstLetter(move.move.name)}
              </div>
           
          ))}
         
          </div>
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
