import { Pokemon } from "../../model/pokemon";
import React, {  } from "react";
import { PokemonSimpleCard } from "./pokemon-simple-card";

interface PokemonListProps {
  detail: Pokemon[];
}

export function PokemonList(props: PokemonListProps) {
  
  return (
    <>
        {props.detail.map((pokemon: Pokemon) => (
          <React.Fragment key={pokemon.name}>

            <PokemonSimpleCard 
            name={pokemon.name}
            />
        
          </React.Fragment>
            ))}
         
    </>
  );
}

