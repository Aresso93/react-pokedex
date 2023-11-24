import { Pokemon } from "../../model/pokemon";
import React, { useEffect } from "react";
import { PokemonSimpleCard } from "./pokemon-simple-card";
import { usePokemonApi } from "../hooks/pokemon.api";

interface PokemonListProps {
  detail: Pokemon[];
}

export function PokemonList(props: PokemonListProps) {
  const pokemonApi = usePokemonApi()

  return (
    <>
   
        {props.detail.map((pokemon: Pokemon) => (
          <React.Fragment key={pokemon.id}>

            <PokemonSimpleCard 
            name={pokemon.name} 
            art={pokemon.sprites.other["official-artwork"].front_default}
            id={pokemon.id}
            />
        
          </React.Fragment>
            ))}
         
    </>
  );
}

