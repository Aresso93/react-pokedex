import { useState } from "react";
import { Pokemon } from "../../model/pokemon";
import { useAxios } from "../../services/axios-api";

export function usePokemonApi() {
  const axiosService = useAxios();
  const [pokemonDetail, setPokemonDetail] = useState([]);
  const [singlePokemon, setSinglePokemon] = useState({name: "", id: 0, art: "", abilities: [], types: [], moves: [], stats: []})
  const [genericData, setGenericData] = useState(0);
  const [moveData, setMoveData] = useState([]);
  const [nextPage, setNextPage] = useState(0);
  const [previousPage, setPreviousPage] = useState(0);

  let offset = 0;
  
  async function getPokemonData() {
    const firstResponse = await axiosService("pokemon/");
    const firstArray = firstResponse.data.results;
    const detailPokemonArray = await Promise.all(
      firstArray.map(async (singlePokemon: Pokemon) => {
        const secondResponse = await axiosService(singlePokemon.url);
        return secondResponse.data;
      })
    );
    setPokemonDetail(detailPokemonArray);
    return detailPokemonArray;
  }

  async function getSinglePokemon(pokemonID: number){
    const pokemonResp = await axiosService("pokemon/"+pokemonID)
    console.log(pokemonResp.data)
    setSinglePokemon(pokemonResp.data)
  }

  async function getMoveData() {
    const movesResp = await axiosService("move/");
    setMoveData(movesResp.data);
  }

  async function getData() {
    const response = await axiosService("pokemon/");
    setGenericData(response.data.count);
  }

  async function getOnlyData() {
    const resp = await axiosService("pokemon/?offset=" + offset + "&limit=20");
    return resp.data.results;
  }
  async function getNextPage() {
    let currentPage = 1;
    currentPage++;
    offset = offset + 20;
    const nextResp = await getOnlyData();
  
    console.log('next resp', nextResp);
    setNextPage(currentPage)
    console.log('PAGGGGGINA', currentPage)
  }

  async function getPreviousPage() {
    let currentPage = 1;
    if (currentPage >= 2) {
      currentPage--;
    }

    if (offset > 0) {
      offset = offset - 20;
      const prevResp = await getOnlyData();
      console.log(prevResp);
    }
    setPreviousPage(currentPage)
    console.log('Pagina attuale', currentPage)
  }
 
  return {
    actions: {
      getPokemonData,
      getMoveData,
      getData,
      getNextPage,
      getPreviousPage,
      getSinglePokemon,
    },
    states: {
      pokemonDetail,
      genericData,
      moveData,
      nextPage,
      previousPage,
      singlePokemon
    },
  };
}
