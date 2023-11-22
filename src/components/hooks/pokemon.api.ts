import { useState } from "react";

export function usePokemonApi(){

    let [pokemonList, setPokemonList] = useState({})
          
          async function getPokemonList(){
              const resp = await fetch('https://pokeapi.co/api/v2/pokemon')
              const pokemonListData = await resp.json();
              console.log('API', pokemonListData)
              setPokemonList(pokemonListData)
              pokemonList = pokemonListData
              console.log('LISTA', pokemonList)
            }


            return {
                actions:{
                    getPokemonList
                },
                states: {pokemonList}
            }


}

