import { ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { usePokemonApi } from "./hooks/pokemon.api"

interface HomeProps{
    children: ReactNode
}

export function HomePage(props: HomeProps){
    const pokemonApi = usePokemonApi()
    const navigate = useNavigate()
    navigate(`/pages/${pokemonApi.states.currentPage}`)
    return <>
    {props.children}
    </>
}