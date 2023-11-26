import { useState } from "react";
import { Pokemon } from "../../model/pokemon";
import { useAxios } from "../../services/axios-api";

export function usePokemonApi() {
  const axiosService = useAxios();
  const [pokemonDetail, setPokemonDetail] = useState([]);
  const [genericData, setGenericData] = useState(0);
  const [moveData, setMoveData] = useState([]);
  const [nextPage, setNextPage] = useState([]);
  const [previousPage, setPreviousPage] = useState([]);

  let offset = 0;
  let currentPage = 1;

  async function getPokemonData() {
    const firstResponse = await axiosService("pokemon/");
    const firstArray = firstResponse.data.results;

    const detailPokemonArray = await Promise.all(
      firstArray.map(async (singlePokemon: Pokemon) => {
        const secondResponse = await axiosService(singlePokemon.url);
        return secondResponse.data;
      })
    );

    const orderedArray = detailPokemonArray;
    setPokemonDetail(orderedArray);
    console.log("UGA BUGA", detailPokemonArray);
    return orderedArray;
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
    currentPage++;
    offset = offset + 20;
    const nextResp = await getOnlyData();
    console.log(nextResp);
  }

  async function getPreviousPage() {
    currentPage--;
    if (offset > 0) {
      offset = offset - 20;
      const prevResp = await getOnlyData();
      console.log(prevResp);
    }
  }

  return {
    actions: {
      getPokemonData,
      getMoveData,
      getData,
      getNextPage,
      getPreviousPage,
    },
    states: {
      pokemonDetail,
      genericData,
      moveData,
      currentPage,
    },
  };
}
