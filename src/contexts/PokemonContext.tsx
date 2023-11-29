import { PropsWithChildren, createContext, useContext } from "react";
import { usePokemonApi } from "../components/hooks/pokemon.api";

export const PokemonContext = createContext({
    actions:{
        getSinglePokemon: (pokemonID: number) => {},
    },
    states: {
        currentPage: 1,
        singlePokemon: {
            name: '',
            art: '',
            id: 0,
            stats: [],
            moves: [],
            types: [],
            abilities: [],
        }
    }
})

export const PokemonContextProvider = ({children}: PropsWithChildren) => {
    const pokemonApi = usePokemonApi()
    return (
        <PokemonContext.Provider value={pokemonApi}>
            {children}
        </PokemonContext.Provider>
    )
}

export const usePokemonContext = () => useContext(PokemonContext)