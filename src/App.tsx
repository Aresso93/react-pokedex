import { Button, ThemeOptions, createTheme } from '@mui/material';
import './App.css'
import PokedexHeader from './components/single-components/header'
import { ThemeProvider } from '@emotion/react';
import { PokemonList } from './components/pages/pokemon-list';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Pokemon } from './model/pokemon';
import { useAxios } from './services/axios-api';

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
// let lightTheme = createTheme(lightThemeOptions)
//fare file apposta per axios

function App() {
  let [pokemonList, setPokemonList] = useState([])
  let [pokemonDetail, setPokemonDetail] = useState([])

  const axiosService = useAxios()

  function getPokemonData(){

    let detailPokemonArray = []

    axiosService.get('pokemon/')
    .then(response => {response.data.results.map((singlePokemon: Pokemon) => (
      axiosService({url: singlePokemon.url}).then(resp => {
        detailPokemonArray.push(resp.data)
        setPokemonList(response.data.results);
        console.log('DETTAGLIONI', resp.data)
        setPokemonDetail(detailPokemonArray)
        console.log('DETTAGLIIIIIII', pokemonDetail)
        console.log('DETTAGLI', detailPokemonArray)
      })
      ))
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
