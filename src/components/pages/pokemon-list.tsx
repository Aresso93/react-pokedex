import { PokemonCard } from "./pokemon-card";
import { Ability, Pokemon } from "../../model/pokemon";

interface PokemonListProps {
  list: Pokemon[];
}
function capitaliseFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function PokemonList(props: PokemonListProps) {
  return (
    <>
        <div className="card-container">
          {props.list.map((pokemon: Pokemon) => (
            <div key={pokemon.name}>
              <PokemonCard 
                
                name={capitaliseFirstLetter(pokemon.name)} 
                art={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`}
                
              />
            </div>
          ))}
        </div>
      
    </>
  );
}
