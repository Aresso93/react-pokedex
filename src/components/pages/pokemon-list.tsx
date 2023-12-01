import { Pokemon } from "../../model/pokemon";
import React, { useEffect, useState } from "react";
import { PokemonSimpleCard } from "./pokemon-simple-card";
import { usePokemonApi } from "../hooks/pokemon.api";
import { useAxios } from "../../services/axios-api";
import { capitaliseFirstLetter } from "./pokemon-card";

interface PokemonListProps {
  detail: Pokemon[];
}

export function PokemonList(props: PokemonListProps) {

  const pokemonApi = usePokemonApi()
  //const [detailedPokemon, setDetailedPokemon] = useState([])
  const axiosService = useAxios()
  
  
  //  async function getDetailedPokemon() {
  //    const detailPokemonArray = await Promise.all(
  //      props.detail.map(async (pokemon: Pokemon) => {
  //        const detailedResponse = await axiosService(pokemon.url);
  //        console.log("Risposta dettagliata", detailedResponse.data);
  //        return detailedResponse.data;
  //      })
  //    )
  //    setDetailedPokemon(detailPokemonArray);
  //  }

  //  useEffect(() => {
  //    getDetailedPokemon();
  //  }, [props.detail]);

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

