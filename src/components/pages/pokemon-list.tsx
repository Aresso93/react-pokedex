import { useEffect } from "react";
import { usePokemonApi } from "../hooks/pokemon.api";
import { PokemonCard } from "./pokemon-card";
import { Pokemon } from "../../model/pokemon";

interface PokemonListProps{
    list: Pokemon[]
}

export function PokemonList(props: PokemonListProps){
    
    return (
        <>
        <div>
        LISTAAAAAAAAAAAAAAA
        <div>
            {props.list.results.map((pokemon)=> (
                <PokemonCard 
                name={pokemon.name} 
               
                />

            ))}
        </div>
        </div>
        </>
    )
}