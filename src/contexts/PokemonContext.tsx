import { PropsWithChildren, createContext, useContext, useState } from "react";

export const PokemonContext = createContext({
  
})

export const PokemonContextProvider = ({children}: PropsWithChildren) => {
    const [isSelectActive, setIsSelectActive] = useState(true||false)

    return (
        <PokemonContext.Provider value={{isSelectActive, setIsSelectActive}}>
            {children}
        </PokemonContext.Provider>
    )
}

export const usePokemonContext = () => useContext(PokemonContext)