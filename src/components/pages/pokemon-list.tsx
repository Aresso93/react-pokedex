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
            {props.list.map((pokemon: Pokemon)=> (
                <PokemonCard 
                name={pokemon.name} 
               
                />

            ))}
        </div>
        </div>
        </>
    )
}