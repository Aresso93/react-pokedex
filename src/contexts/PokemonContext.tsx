import { PropsWithChildren, createContext, useContext } from "react";
import { usePokemonApi } from "../components/hooks/pokemon.api";

export const PokemonContext = createContext({
    actions:{
    
    },
    states: {currentPage: 1}
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