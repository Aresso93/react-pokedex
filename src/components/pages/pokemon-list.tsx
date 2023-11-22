import { PokemonCard } from "./pokemon-card";
import { Pokemon } from "../../model/pokemon";

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
                art="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
             
              />
            </div>
          ))}
        </div>
      
    </>
  );
}
