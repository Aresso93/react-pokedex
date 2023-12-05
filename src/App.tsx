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
  PokemonContextProvider,
  usePokemonContext,
} from "./contexts/PokemonContext";
import { useAxios } from "./services/axios-api";
import TypesSelect from "./components/single-components/types-select";
import { HomePage } from "./components/home";
import BackToTopButton from "./components/single-components/button";

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
      main: "#e9b4fc",
    },
    background: {
      default: "#2b2929",
    },
  },
};
let lightTheme = createTheme(lightThemeOptions);
let darkTheme = createTheme(darkThemeOptions);

function App() {
  const [light, setLight] = useState(true);
  //const navigate = useNavigate()
  const pokemonApi = usePokemonApi();
  //const pokemonContext = usePokemonContext();
  
  useEffect(() => {
    pokemonApi.actions.getPokemonData();
  }, []);

  useEffect(() => {
    pokemonApi.actions.getTypeData();
  }, []);

  //useEffect(() => {
  //  pokemonApi.actions.getNextPage();
  //}, []);

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
              
              <TypesSelect />
              <Button
                variant="contained"
                color="secondary"
                onClick={pokemonApi.actions.getPreviousPage}
                >
                PREVIOUS PAGE TEST
                </Button>
                <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  pokemonApi.actions.getNextPage()
                  //navigate(`/page/${pokemonApi.states.currentPage}`)
                }} 
                >
                NEXT PAGE TEST
              </Button>

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
                        stats={[]} weight={0} height={0}                      />
                    }
                  />
                  <Route
                    path="home"
                    element={
                      <HomePage>
                        <PokemonList detail={pokemonApi.states.pokemonDetail} />
                      </HomePage>
                    }
                  />
                  <Route
                    path="page/:pageNumber"
                    element={
                      <PokemonList detail={pokemonApi.states.nextPageDetail} />
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
