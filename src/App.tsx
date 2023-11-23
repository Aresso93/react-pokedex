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

  async function getPokemonData() {
    const firstResponse = await axiosService("pokemon/");
    let arrayScrauso = firstResponse.data.results;
    console.log(arrayScrauso);

    let detailPokemonArray: Pokemon[] = [];

    arrayScrauso.map(
      async (singlePokemon: Pokemon) =>
        await axiosService(singlePokemon.url).then(
          (secondResponse) => {
            console.log(secondResponse.data);
            detailPokemonArray.push(secondResponse.data);
            setPokemonList(firstResponse.data.results);
            console.log("DETTAGLI QUELLO CHE MI SERVE", detailPokemonArray);
            setPokemonDetail(detailPokemonArray);
            pokemonDetail = detailPokemonArray;
            pokemonList = firstResponse.data.results
            console.log("HADOKEN", pokemonDetail);
            console.log('AAAAAAAAAAAA', pokemonDetail, 'NNNNNNNNNNNNN', pokemonList)
          }
        )
    );
  }

  useEffect(() => {
    getPokemonData();
  }, []);


  return (
    <>
      {/* <ThemeProvider theme={lightTheme}> */}
      <PokedexHeader />
      <PokemonList list={pokemonDetail} />
      {/* </ThemeProvider> */}
    </>
  );
}

export default App;
