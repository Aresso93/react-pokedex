import { Button, ThemeOptions, createTheme } from '@mui/material';
import './App.css'
import PokedexHeader from './components/single-components/header'
import { ThemeProvider } from '@emotion/react';
import { PokemonList } from './components/pages/pokemon-list';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Pokemon } from './model/pokemon';

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
    mode: 'dark',
    primary: {
      main: '#a54208',
    },
    secondary: {
      main: '#086ca5',
    },
    error: {
      main: '#c71d0f',
    },
  },
};

const instance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
  url: 'pokemon/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

// let lightTheme = createTheme(lightThemeOptions)

function App() {
  let [pokemonList, setPokemonList] = useState([])
  
  function getPokemonData(){
    axios({
      url: 'pokemon/',
      baseURL: 'https://pokeapi.co/api/v2/'
    })
    .then(response => {response.data.results.map((singlePokemon: Pokemon) => (
      axios({url: singlePokemon.url}).then(resp => console.log(resp.data))
    ))
    setPokemonList(response.data.results);
  })}

  useEffect(() => {
    getPokemonData()
  },[])

  return (
    <>
    {/* <ThemeProvider theme={lightTheme}> */}
    <PokedexHeader/>
    <PokemonList
    list={pokemonList}
    />
    {/* </ThemeProvider> */}
    </>
  )
}

export default App
