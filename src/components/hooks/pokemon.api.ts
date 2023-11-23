import { useState } from "react";
import { Pokemon } from "../../model/pokemon";
import { useAxios } from "../../services/axios-api";

export function usePokemonApi(){
    const axiosService = useAxios();
    let [pokemonDetail, setPokemonDetail] = useState([]);

    function listPokemonByID(a: Pokemon, b: Pokemon){
        return a.id - b.id
      }
    
      async function getPokemonData() {
        const firstResponse = await axiosService("pokemon/");
        let firstArray = firstResponse.data.results;
        let detailPokemonArray: Pokemon[] = [];
        firstArray.map(
          async (singlePokemon: Pokemon) => await axiosService(singlePokemon.url)
          .then((secondResponse) => {
            detailPokemonArray.push(secondResponse.data)
            const orderedArray = detailPokemonArray.sort(listPokemonByID)
            setPokemonDetail(orderedArray);
            return orderedArray
          })
          )
      }
            return {
                actions:{
                    getPokemonData
                },
                states: {pokemonDetail}
            }


}

