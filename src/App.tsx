import { Button, ThemeOptions, createTheme } from '@mui/material';
import './App.css'
import PokedexHeader from './components/single-components/header'
import { ThemeProvider } from '@emotion/react';
import { PokemonList } from './components/pages/pokemon-list';
import { useEffect, useState } from 'react';

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


let lightTheme = createTheme(lightThemeOptions)

function App() {
  let [pokemonList, setPokemonList] = useState({})
  
  async function getData(){
    const resp = await fetch('https://pokeapi.co/api/v2/pokemon')
    const pokemonListData = await resp.json();
    console.log('API', pokemonListData)
    setPokemonList(pokemonListData)
    pokemonList = pokemonListData
    console.log('LISTA', pokemonList)
  }
  useEffect(() => {
    getData()
  },[])

  return (
    <>
    <ThemeProvider theme={lightTheme}>
    <PokedexHeader/>
    <PokemonList
    list={pokemonList}
    />
    </ThemeProvider>
    </>
  )
}

export default App
