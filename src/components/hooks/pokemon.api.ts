import { useState } from "react";
import { Pokemon } from "../../model/pokemon";
import { useAxios } from "../../services/axios-api";

export function usePokemonApi() {
  const axiosService = useAxios();
  let [pokemonDetail, setPokemonDetail] = useState([]);
  let [genericData, setGenericData] = useState(0)

  function listPokemonByID(a: Pokemon, b: Pokemon) {
    return a.id - b.id;
  }

  async function getPokemonData() {
    const firstResponse = await axiosService("pokemon/");
    let firstArray = firstResponse.data.results;
    let detailPokemonArray: Pokemon[] = [];
    firstArray.map(
      async (singlePokemon: Pokemon) =>
        await axiosService(singlePokemon.url).then((secondResponse) => {
          detailPokemonArray.push(secondResponse.data);
          const orderedArray = detailPokemonArray.sort(listPokemonByID);
          setPokemonDetail(orderedArray);
          return orderedArray;
        })
    );
  }

  async function getMoveData(){
    const movesResp = await axiosService("move/");
    console.log('UUUUUU', movesResp.data)
  }

  async function getData(){
    const response = await axiosService("pokemon/");
    setGenericData(response.data.count)
  }

  return {
    actions: {
      getPokemonData,
      getMoveData,
      getData
    },
    states: {
        pokemonDetail, 
        genericData
    },
  };
}
