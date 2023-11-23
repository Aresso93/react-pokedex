import { PokemonCard } from "./pokemon-card";
import { Ability, Pokemon } from "../../model/pokemon";

interface PokemonListProps {
  detail: Pokemon[];
}


export function PokemonList(props: PokemonListProps) {
  return (
    <>
    
        {props.detail.map((pokemon: Pokemon) => (
            <PokemonCard
              name={pokemon.name}
              pokedexNumber={pokemon.id}
              art={pokemon.sprites.other["official-artwork"].front_default}
              abilities={pokemon.abilities}
              moves={pokemon.moves}
              types={pokemon.types}
            />
        ))}
     
    </>
  );
}
