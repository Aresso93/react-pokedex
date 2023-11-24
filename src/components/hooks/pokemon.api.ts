import { useState } from "react";
import { Pokemon } from "../../model/pokemon";
import { useAxios } from "../../services/axios-api";

export function usePokemonApi() {
  const axiosService = useAxios();
  let [pokemonDetail, setPokemonDetail] = useState([]);
  let [genericData, setGenericData] = useState(0);
  let [moveData, setMoveData] = useState([])
  let [nextPage, setNextPage] = useState([])
  let [previousPage, setPreviousPage] = useState([])

  let offset = 0
  
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
      setMoveData(movesResp.data)
    }
    
    async function getData(){
      const response = await axiosService("pokemon/");
      setGenericData(response.data.count)
    }
    
    async function getOnlyData(){
      await axiosService("pokemon/?offset="+offset+"&limit=20");
    }

    async function getNextPage(){
    offset = offset + 20
    let nextResp = await getOnlyData()
    console.log(nextResp);
    
    }

  async function getPreviousPage(){
    offset = offset - 20
    getOnlyData()
  }


  return {
    actions: {
      getPokemonData,
      getMoveData,
      getData,
      getNextPage,
      getPreviousPage
    },
    states: {
        pokemonDetail, 
        genericData,
        moveData
    },
  };
}
