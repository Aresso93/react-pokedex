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
            <div >
              <PokemonCard 
                name={capitaliseFirstLetter(pokemon.name)} 
              />
            </div>
          ))}
        </div>
      
    </>
  );
}
