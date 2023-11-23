import { PokemonCard } from "./pokemon-card";
import { Ability, Pokemon } from "../../model/pokemon";

interface PokemonListProps {

  detail: Pokemon[]
}
function capitaliseFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function PokemonList(props: PokemonListProps) {
  return (
    <>
        <div className="card-container">
          {props.detail.map((pokemon: Pokemon) => (
            <div key={pokemon.id}>
            <PokemonCard 
                
                name={capitaliseFirstLetter(pokemon.name)} 
                art={pokemon.sprites.other["official-artwork"].front_default}
                abilities={pokemon.abilities}
                moves={pokemon.moves}
                
              />
            </div>
          ))}
        </div>
      
    </>
  );
}
