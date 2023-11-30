import { Button, ThemeOptions, createTheme } from "@mui/material";
import "./App.css";
import PokedexHeader from "./components/single-components/header";
import { ThemeProvider } from "@emotion/react";
import { PokemonList } from "./components/pages/pokemon-list";
import { ChangeEvent, useEffect, useState } from "react";
import { usePokemonApi } from "./components/hooks/pokemon.api";
import { usePokemonSearch } from "./components/hooks/use-search-pokemon";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { PokemonCard } from "./components/pages/pokemon-card";
import { PokemonContextProvider, usePokemonContext } from "./contexts/PokemonContext";
import { useAxios } from "./services/axios-api";

export const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#202976",
    },
    secondary: {
      main: "#766d20",
    },
    background: {
      default: "#ececec",
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
      default: "#2b2929",
    },
  },
};
let lightTheme = createTheme(lightThemeOptions);
let darkTheme = createTheme(darkThemeOptions);

function App() {
  const pokemonSearch = usePokemonSearch();
  const pokemonApi = usePokemonApi();
  const pokemonContext = usePokemonContext();
  const axiosService = useAxios();
    
  useEffect(() => {
    pokemonApi.actions.getPokemonData();
  }, []);

  //useEffect(() => {
  //  pokemonApi.actions.getNextPage()
  //}, [pokemonApi.actions.getNextPage])

  console.log("HHHHHHHHH", usePokemonContext().states.currentPage)
  //console.log('INPUTTONE', pokemonSearch.states.input);
  //console.log(pokemonApi.states.currentPage);

  return (
    <>
    <PokemonContextProvider>
      <BrowserRouter>
        <ThemeProvider theme={darkTheme}>
          <PokedexHeader
            search={pokemonSearch.actions.onChange}
            renderSearch={pokemonSearch.actions.pokemonFinder(
              pokemonApi.states.pokemonDetail,
              pokemonSearch.states.input
            )}
          />
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
          <div className="outer-div">
            <Routes>
              <Route
                path="details/:pokemonID"
                element={
                  <PokemonCard
                    name={pokemonContext.states.singlePokemon.name}
                    art={""}
                    abilities={[]}
                    moves={[]}
                    types={[]}
                    stats={[]}
                  />
                }
              />
              <Route
                path="home"
                element={
                  <PokemonList detail={pokemonApi.states.pokemonDetail} />
                }
              />
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
          </div>
        </ThemeProvider>
      </BrowserRouter>
      </PokemonContextProvider>
    </>
  );
}

export default App;
