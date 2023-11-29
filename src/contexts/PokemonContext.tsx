import { PropsWithChildren, createContext, useContext } from "react";
import { usePokemonApi } from "../components/hooks/pokemon.api";

export const PokemonContext = createContext({
    actions:{
        getSinglePokemon: (pokemonID: number) => {},
        getData: () => 0,
    },
    states: {
        currentPage: 0,
        singlePokemon: {
            name: '',
            sprites: {
                other:{["official-artwork"]:{
                    front_default: ''
                }},
            },
            id: 0,
            stats: [],
            moves: [],
            types: [],
            abilities: [],
        },
        genericData: 0
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