import { PokemonCard } from "./pokemon-card";
import { Ability, Pokemon } from "../../model/pokemon";
import { ChangeEvent, useState } from "react";

interface PokemonListProps {
  detail: Pokemon[];
}

export function PokemonList(props: PokemonListProps) {

  return (
    <>
      <div className="card-container" >
        {props.detail.map((pokemon: Pokemon) => (
          <div key={pokemon.id}>

            <PokemonCard
              name={pokemon.name}
              stats={pokemon.stats}
              art={pokemon.sprites.other["official-artwork"].front_default}
              abilities={pokemon.abilities}
              moves={pokemon.moves}
              types={pokemon.types}
            />
          </div>
            ))}
            </div>
    </>
  );
}
