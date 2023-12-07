import { Button, ThemeOptions, createTheme } from "@mui/material";
import "./App.css";
import PokedexHeader from "./components/single-components/header";
import { ThemeProvider } from "@emotion/react";
import { PokemonList } from "./components/pages/pokemon-list";
import { useEffect, useState } from "react";
import { usePokemonApi } from "./components/hooks/pokemon.api";
import { Routes, Route, Navigate, BrowserRouter, useNavigate } from "react-router-dom";
import { PokemonCard } from "./components/pages/pokemon-card";
import {
  PokemonContextProvider, usePokemonContext,
} from "./contexts/PokemonContext";
import TypesSelect from "./components/single-components/types-select";

export const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#f98f39",
    },
    secondary: {
      main: "#ecc320",
    },
    background: {
      default: "#ececec",
      paper: "#F28345"
    },
  },
};

export const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#e9b4fc",
    },
    background: {
      default: "#2b2929",
      paper: "#7130ca"
    },
  },
};
let lightTheme = createTheme(lightThemeOptions);
let darkTheme = createTheme(darkThemeOptions);

function App() {
  const [light, setLight] = useState(true);
  const pokemonApi = usePokemonApi();
  const pokemonContext = usePokemonContext()
  const currentPage = pokemonApi.states.currentPage
  //const pokemonContext = usePokemonContext();
  
  useEffect(() => {
    pokemonApi.actions.getPreviousPage()
  }, [])

  useEffect(() => {
    pokemonApi.actions.getPokemonData();
  }, []);

 useEffect(() => {
   pokemonApi.actions.getNextPage();
 }, []);

 useEffect(() => {
  pokemonApi.actions.getPokemonByPage(currentPage);
 }, [pokemonApi.states.currentPage]);
  
  console.log('Pagina corrente', currentPage);
  console.log(pokemonContext);
  

  return (
    <>
      <div
        style={{
          backgroundImage: light
            ? "url(/pokeball-background.jpg)"
            : "url(/masterball-background.jpg)",
        }}
      >
        <PokemonContextProvider>
          <BrowserRouter>
            <ThemeProvider theme={light ? lightTheme : darkTheme}>
              <PokedexHeader themeSwitch={() => setLight((prev) => !prev)} />
              
              <TypesSelect/>
              <div className="page-controls">

              <Button
                variant="contained"
                color="primary"
                onClick={pokemonApi.actions.goToPreviousPage}
                >
                Back
                </Button>
                <div>
                  {currentPage+1}
                </div>
                <Button
                variant="contained"
                color="primary"
                onClick={
                  pokemonApi.actions.goToNextPage
                }
                >
                Next
              </Button>
              </div>
              <div className="outer-div">
                <Routes>
                  <Route
                    path="details/:pokemonName"
                    element={
                      <PokemonCard
                        name={pokemonApi.states.singlePokemon.name}
                        art={""}
                        abilities={[]}
                        moves={[]}
                        types={[]}
                        stats={[]} 
                        weight={0} 
                        height={0}/>
                    }
                  />
                  <Route
                    path="home"
                    element={
                        <PokemonList detail={pokemonContext ? [] : pokemonApi.states.pokemonByPage}/>
                    }
                  />
                  <Route
                    path="page/:currentPage"
                    element={
                      <PokemonList detail={pokemonApi.states.pokemonByPage} />
                    }
                  /> 
                  <Route path="*" element={<Navigate to="/home" />} />
                </Routes>
              </div>
            </ThemeProvider>
          </BrowserRouter>
        </PokemonContextProvider>
      </div>
    </>
  );
}

export default App;
