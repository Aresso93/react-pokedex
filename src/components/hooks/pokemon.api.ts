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

  const [currentPage, setCurrentPage] = useState(0)
  const [genericData, setGenericData] = useState(0);
  const [moveData, setMoveData] = useState([]);
  const [typeData, setTypeData] = useState([]);
  const [nextPageDetail, setNextPageDetail] = useState([]);
  const [previousPage, setPreviousPage] = useState(0);
  const [allPokemonDetail, setAllPokemonDetail] = useState([]);
  const [pokemonByType, setPokemonByType] = useState([]);

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
    const resp = await axiosService("pokemon/?offset=0&limit=40");
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
      "pokemon/?offset=0&limit=40"
    );
    const pokemonArray = response.data.results;
    setPokemonDetail(pokemonArray);
    return pokemonArray;
  }

  let offset = 0;
  

  async function getNextPage(){
    
    //setCurrentPage(1)
    console.log(currentPage);
    offset = (currentPage) * 40
    const resp = await axiosService("pokemon/?offset=" + offset + "&limit=40");
    console.log(resp.data.results);
    setNextPageDetail(resp.data.results)
    setCurrentPage(currentPage+1)
    
    console.log(currentPage);
    
  }

  async function getPokemonByType(typeName: string) {
    const singleTypeResp = await axiosService("type/" + typeName);
    const pokemonArray = singleTypeResp.data.pokemon;
    console.log('pokemoni tiponi?', pokemonArray);
    setPokemonByType(pokemonArray)
    
  }

  async function getPreviousPage() {
    console.log(currentPage);
    
    offset = (currentPage) * 40
    const resp = await axiosService("pokemon/?offset=" + offset + "&limit=40");
    console.log(resp.data.results);
    setNextPageDetail(resp.data.results)

    if(currentPage > 1){
      setCurrentPage(currentPage-1)
    }
    
    console.log(currentPage);

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
      currentPage,
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
