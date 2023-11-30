import { Pokemon } from "../../model/pokemon";
import React, { useEffect, useState } from "react";
import { PokemonSimpleCard } from "./pokemon-simple-card";
import { usePokemonApi } from "../hooks/pokemon.api";
import { useAxios } from "../../services/axios-api";

interface PokemonListProps {
  detail: Pokemon[];
}

export function PokemonList(props: PokemonListProps) {

  const pokemonApi = usePokemonApi()
  
  const [detailedPokemon, setDetailedPokemon] = useState([])
  const axiosService = useAxios()

  useEffect(()=> {
    getDetailedPokemon()
  }, [])

  async function getDetailedPokemon(){
    const detailPokemonArray = await Promise.all(
      props.detail.map(async (pokemon: Pokemon) => {
        const detailedResponse = await axiosService(pokemon.url)
        console.log('Risposta dettagliata', detailedResponse.data);
        return detailedResponse.data
        
      })

    )
    
    setDetailedPokemon(detailPokemonArray)
  }

  return (
    <>
   
        {detailedPokemon.map((pokemon: Pokemon) => (
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

