import { useState } from "react";
import { Pokemon, Type } from "../../model/pokemon";
import { useAxios } from "../../services/axios-api";

export function usePokemonApi() {
  const axiosService = useAxios();
  const [pokemonDetail, setPokemonDetail] = useState([]);
  const [singlePokemon, setSinglePokemon] = useState({
    name: "",
    id: 0,
    art: "",
    abilities: [],
    types: [],
    moves: [],
    stats: [],
  });
  const [genericData, setGenericData] = useState(0);
  const [moveData, setMoveData] = useState([]);
  const [typeData, setTypeData] = useState([]);
  const [nextPageDetail, setNextPageDetail] = useState(0);
  const [previousPage, setPreviousPage] = useState(0);
  const [allPokemonDetail, setAllPokemonDetail] = useState([]);
  const [pokemonByType, setPokemonByType] = useState([]);

  let offset = 0;

  async function getSinglePokemon(pokemonName: string) {
    const pokemonResp = await axiosService("pokemon/" + pokemonName);
    setSinglePokemon(pokemonResp.data);
  }

  async function getMoveData() {
    const movesResp = await axiosService("move/");
    setMoveData(movesResp.data);
  }

  async function getData() {
    const response = await axiosService("pokemon");
    setGenericData(response.data.count);
  }

  async function getOnlyData() {
    const resp = await axiosService("pokemon/?offset=" + offset + "&limit=40");
    return resp.data.results;
  }

  async function getTypeData() {
    const typesResp = await axiosService("type/");
    const typesArray = typesResp.data.results;
    const detailTypeArray = await Promise.all(
      typesArray.map(async (singleType: Type) => {
        const secondResponse = await axiosService(singleType.url);
        return secondResponse.data;
      })
    );
    setTypeData(detailTypeArray);
  }

  async function getAllPokemon() {
    const allMonResp = await axiosService("pokemon/?offset=0&limit=2000");
    const allMonArray = allMonResp.data.results;
    const detailAllPokemonArray = await Promise.all(
      allMonArray.map(async (singlePokemon: Pokemon) => {
        const secondResponse = await axiosService(singlePokemon.url);
        return secondResponse.data;
      })
    );
    setAllPokemonDetail(allMonArray);
    return allMonArray
  }

  async function getPokemonData() {
    const response = await axiosService(
      "pokemon/?offset=" + offset + "&limit=40"
    );
    const pokemonArray = response.data.results;
    setPokemonDetail(pokemonArray);
    return pokemonArray;
  }
  // async function getNextPage() {
  //   //let currentPage = 1;
  //   //currentPage++;
  //   offset = offset + 40;
  //   console.log(offset);
    
  //   const nextResp = await getOnlyData();
  //   console.log("next resp", nextResp);
  //   const nextPageDetailPokemonArray = await Promise.all(
  //     nextResp.map(async (singlePokemon: Pokemon) => {
  //       const nextPageResponse = await axiosService(singlePokemon.url);
  //       return nextPageResponse.data;
  //     })
  //   );
  //   setNextPageDetail(nextPageDetailPokemonArray);
  // }

  async function getNextPage(){
    offset = offset + 40
    getOnlyData()
    let nextResp = await getOnlyData()
    console.log(nextResp);
    setNextPageDetail(nextResp)
  }

  async function getPokemonByType(typeName: string) {
    const singleTypeResp = await axiosService("type/" + typeName);
    const pokemonArray = singleTypeResp.data.pokemon;
    console.log('pokemoni tiponi?', pokemonArray);
    setPokemonByType(pokemonArray)
    
  }

  async function getPreviousPage() {
   //let currentPage = 1;
   //if (currentPage >= 2) {
   //  currentPage--;
   //}

    if (offset > 0) {
      offset = offset - 40;
      const prevResp = await getOnlyData();
      console.log(prevResp);
    }
    //setPreviousPage(currentPage);
    //console.log("Pagina attuale", currentPage);
  }

  return {
    actions: {
      getPokemonData,
      getPokemonByType,
      getMoveData,
      getData,
      getNextPage,
      getPreviousPage,
      getSinglePokemon,
      getTypeData,
      getAllPokemon,
    },
    states: {
      pokemonDetail,
      genericData,
      moveData,
      nextPageDetail,
      previousPage,
      singlePokemon,
      typeData,
      allPokemonDetail,
      pokemonByType
    },
  };
}
