import { useState } from "react";
import { Pokemon } from "../../model/pokemon";
import { useAxios } from "../../services/axios-api";

export function usePokemonApi() {
  const axiosService = useAxios();
  const [pokemonDetail, setPokemonDetail] = useState([]);
  const [singlePokemon, setSinglePokemon] = useState({name: "", id: 0, art: "", abilities: [], types: [], moves: [], stats: []})
  const [genericData, setGenericData] = useState(0);
  const [moveData, setMoveData] = useState([]);
  const [nextPageDetail, setNextPageDetail] = useState(0);
  const [previousPage, setPreviousPage] = useState(0);

  let offset = 0;
  
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
    const response = await axiosService("pokemon");
    console.log('RRRRRRRRRRR', response.data.count)
    setGenericData(response.data.count);
  }
  
  async function getOnlyData() {
    const resp = await axiosService("pokemon/?offset=" + offset + "&limit=40");
    return resp.data.results;
  }
  
  async function getPokemonData() {
    const firstResponse = await axiosService("pokemon/?offset=" + offset + "&limit=40");
    const firstArray = firstResponse.data.results;
    const detailPokemonArray = await Promise.all(
      firstArray.map(async (singlePokemon: Pokemon) => {
        const secondResponse = await axiosService(singlePokemon.url);
        return secondResponse.data;
      })
      );
      setPokemonDetail(detailPokemonArray);
    }

    async function getNextPage() {
      let currentPage = 1;
      currentPage++;
      offset = offset + 40;
      const nextResp = await getOnlyData();
      const nextPageDetailPokemonArray = await Promise.all(
        nextResp.map(async (singlePokemon: Pokemon) => {
          const nextPageResponse = await axiosService(singlePokemon.url);
          console.log('next resp', nextResp);
          return nextPageResponse.data
        })
      );
      setNextPageDetail(nextPageDetailPokemonArray);
    }

  async function getPreviousPage() {
    let currentPage = 1;
    if (currentPage >= 2) {
      currentPage--;
    }

    if (offset > 0) {
      offset = offset - 40;
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
      nextPageDetail,
      previousPage,
      singlePokemon
    },
  };
}
