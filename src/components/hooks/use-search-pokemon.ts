import { ChangeEvent, useState } from "react";
import { Pokemon } from "../../model/pokemon";
import { usePokemonApi } from "./pokemon.api";

export function usePokemonSearch(){
    const pokemonApi = usePokemonApi()
    const [input, setInput] = useState('')
    
    function onChange(event: ChangeEvent<HTMLInputElement>){
        const userInput = event.currentTarget.value;
        setInput(userInput)
        pokemonFinder(pokemonApi.states.pokemonDetail, userInput)
      }

    function pokemonFinder(array: Pokemon[], input:string){
        array = pokemonApi.states.pokemonDetail
        const filteredPokemon = array.filter((pokemon) => pokemon.name.includes(input.toLowerCase()))
        console.log('Pokémon filtrati', filteredPokemon);
        return filteredPokemon;
      }
    

      return{
        actions:{
            onChange,
            pokemonFinder
        },
        states:{
            input
        }
      }

}