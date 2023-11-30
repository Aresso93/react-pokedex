import { Pokemon, Type } from "../../model/pokemon";
import React, { useEffect } from "react";
import { PokemonSimpleCard } from "./pokemon-simple-card";
import { TypeCard } from "./pokemon-type-card";

interface TypesListProps {
  detail: [];
}

export function TypesList(props: TypesListProps) {

  return (
    <>
        {props.detail.map((type) => (
          <React.Fragment key={type.id}>
            <TypeCard
            name={type.name} 
            id={type.id}
            />
          </React.Fragment>
            ))}
    </>
  );
}
