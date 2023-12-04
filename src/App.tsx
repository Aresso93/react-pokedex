import {
  Button,
  ThemeOptions,
  createTheme,
} from "@mui/material";
import "./App.css";
import PokedexHeader from "./components/single-components/header";
import { ThemeProvider } from "@emotion/react";
import { PokemonList } from "./components/pages/pokemon-list";
import { useEffect, useState } from "react";
import { usePokemonApi } from "./components/hooks/pokemon.api";
import { usePokemonSearch } from "./components/hooks/use-search-pokemon";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import {
  PokemonCard,
} from "./components/pages/pokemon-card";
import {
  PokemonContextProvider,
  usePokemonContext,
} from "./contexts/PokemonContext";
import { useAxios } from "./services/axios-api";
import TypesSelect from "./components/single-components/types-select";
import ThemeSwitch from "./components/single-components/theme-switch";

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
  const pokemonApi = usePokemonApi();
  const pokemonContext = usePokemonContext();
  const axiosService = useAxios();

  useEffect(() => {
    pokemonApi.actions.getPokemonData();
  }, []);

  useEffect(() => {
    pokemonApi.actions.getTypeData();
  }, []);

  useEffect(() => {
    pokemonApi.actions.getNextPage()
  }, [])

  //console.log(pokemonApi.states.currentPage);

  return (
    <>
        <div style={{backgroundImage: light ? "url(/pokeball-background.jpg)": "url(/masterball-background.jpg)"}}>
      <PokemonContextProvider>
        <BrowserRouter>
          <ThemeProvider theme={light ? lightTheme : darkTheme}>
            <PokedexHeader/>
            <TypesSelect/>
            <ThemeSwitch
            click= {()=> setLight((prev) => !prev)}
            />
            {/* <Button
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
            </Button> */}

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
                    />
                  }
                />
                <Route
                  path="home"
                  element={
                    <PokemonList detail={pokemonApi.states.pokemonDetail} />
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
