import { Button, ThemeOptions, createTheme } from "@mui/material";
import "./App.css";
import PokedexHeader from "./components/single-components/header";
import { ThemeProvider } from "@emotion/react";
import { PokemonList } from "./components/pages/pokemon-list";
import { useEffect, useState } from "react";
import axios from "axios";
import { Pokemon } from "./model/pokemon";
import { useAxios } from "./services/axios-api";
import { usePokemonApi } from "./components/hooks/pokemon.api";

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
 
  const pokemonApi = usePokemonApi()
  useEffect(() => {
    pokemonApi.actions.getPokemonData();
  }, []);
  useEffect(() => {
    pokemonApi.actions.getData();
  }, []);
  useEffect(() => {
    pokemonApi.actions.getMoveData();
  }, []);


console.log('IIIIIIIIIIII', pokemonApi.states.pokemonDetail)
console.log('uuuuuuuuuuuu', pokemonApi.states.moveData);


  return (
    <>
      {/* <ThemeProvider theme={lightTheme}> */}
      <PokedexHeader 
      count={pokemonApi.states.genericData}
      />
      <PokemonList detail={pokemonApi.states.pokemonDetail} />
      {/* </ThemeProvider> */}
    </>
  );
}

export default App;
