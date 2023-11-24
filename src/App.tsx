import { Button, ThemeOptions, createTheme } from "@mui/material";
import "./App.css";
import PokedexHeader from "./components/single-components/header";
import { ThemeProvider } from "@emotion/react";
import { PokemonList } from "./components/pages/pokemon-list";
import { ChangeEvent, useEffect, useState } from "react";
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
    background: {
      default: '#2b2929',
    },
  },
};
let lightTheme = createTheme(lightThemeOptions)
let darkTheme = createTheme(darkThemeOptions)

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
    pokemonApi.actions.getNextPage()
  })
  // useEffect(() => {
  //   pokemonApi.actions.getMoveData();
  // }, []);

console.log('AAAAAAA', pokemonApi.states.genericData)
console.log('BBBBBBB', pokemonApi.states.pokemonDetail)
console.log('INPUTTONE', pokemonSearch.states.input);
console.log(pokemonApi.states.currentPage)

  return (
    <>
      <ThemeProvider theme={darkTheme}>
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
      <div className="outer-div">
      <PokemonList detail={pokemonApi.states.pokemonDetail} />
      </div>

      </ThemeProvider> 
    </>
  );
}

export default App;
