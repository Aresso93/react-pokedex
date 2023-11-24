import { PokemonCard } from "./pokemon-card";
import { Ability, Pokemon } from "../../model/pokemon";
import { ChangeEvent, useState } from "react";
import React from "react";

interface PokemonListProps {
  detail: Pokemon[];
}

export function PokemonList(props: PokemonListProps) {

  return (
    <>
   
        {props.detail.map((pokemon: Pokemon) => (
          <React.Fragment key={pokemon.id}>

            <PokemonCard
              name={pokemon.name}
              stats={pokemon.stats}
              art={pokemon.sprites.other["official-artwork"].front_default}
              abilities={pokemon.abilities}
              moves={pokemon.moves}
              types={pokemon.types}
            />
          </React.Fragment>
            ))}
         
    </>
  );
}
