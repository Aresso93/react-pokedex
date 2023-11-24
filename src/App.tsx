import { Button, ThemeOptions, createTheme } from "@mui/material";
import "./App.css";
import PokedexHeader from "./components/single-components/header";
import { ThemeProvider } from "@emotion/react";
import { PokemonList } from "./components/pages/pokemon-list";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { Pokemon } from "./model/pokemon";
import { useAxios } from "./services/axios-api";
import { usePokemonApi } from "./components/hooks/pokemon.api";
import { usePokemonSearch } from "./components/hooks/use-search-pokemon";

export const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#202976',
    },
    secondary: {
      main: '#766d20',
    },
    background: {
      default: '#ececec',
    },
  },
};

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
let lightTheme = createTheme(lightThemeOptions)

function App() {
  const pokemonSearch = usePokemonSearch()
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

console.log('AAAAAAA', pokemonApi.states.genericData)
console.log('BBBBBBB', pokemonApi.states.pokemonDetail)
console.log('uuuuuuuuuuuu', pokemonApi.states.moveData);
console.log('INPUTTONE', pokemonSearch.states.input);



  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <Button 
        variant="contained" 
        color="secondary"
        onClick={pokemonApi.actions.getNextPage}
        >
          PROVA PROVA PROSSIMA PAGINA
        </Button>
        <Button 
        variant="contained" 
        color="secondary"
        onClick={pokemonApi.actions.getPreviousPage}
        >
          PROVA PROVA PAGINA PRIMA
        </Button>
      <PokedexHeader 
        search={pokemonSearch.actions.onChange}
        count={pokemonApi.states.genericData} 
        renderSearch={pokemonSearch.actions.pokemonFinder(pokemonApi.states.pokemonDetail, pokemonSearch.states.input)}      />
      <PokemonList detail={pokemonApi.states.pokemonDetail} />

      </ThemeProvider> 
    </>
  );
}

export default App;
