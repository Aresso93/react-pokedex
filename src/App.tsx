import { Button, ThemeOptions, createTheme } from "@mui/material";
import "./App.css";
import PokedexHeader from "./components/single-components/header";
import { ThemeProvider } from "@emotion/react";
import { PokemonList } from "./components/pages/pokemon-list";
import { useEffect, useState } from "react";
import axios from "axios";
import { Pokemon } from "./model/pokemon";
import { useAxios } from "./services/axios-api";

// export const lightThemeOptions: ThemeOptions = {
//   palette: {
//     mode: 'light',
//     primary: {
//       main: '#202976',
//     },
//     secondary: {
//       main: '#766d20',
//     },
//     background: {
//       default: '#ececec',
//     },
//   },
// };

export const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#a54208",
    },
    secondary: {
      main: "#086ca5",
    },
    error: {
      main: "#c71d0f",
    },
  },
};
// let lightTheme = createTheme(lightThemeOptions)
//fare file apposta per axios

function App() {
  let [pokemonList, setPokemonList] = useState([]);
  let [pokemonDetail, setPokemonDetail] = useState([]);

  const axiosService = useAxios();

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

  useEffect(() => {
    getPokemonData();
  }, []);

  console.log("Dettagli!?", pokemonDetail)

  return (
    <>
      {/* <ThemeProvider theme={lightTheme}> */}
      <PokedexHeader />
      <PokemonList detail={pokemonDetail} />
      {/* </ThemeProvider> */}
    </>
  );
}

export default App;
