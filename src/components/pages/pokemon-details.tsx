import { Ability, Mfe, Stat, Type } from "../../model/pokemon"
import { PokemonCard } from "./pokemon-card"

interface PokemonDetailsProps{
    name: string;
    art: string;
    abilities: Ability[];
    moves: Mfe[];
    types: Type[];
    stats: Stat[];
}

export function PokemonDetails(props: PokemonDetailsProps){
    //tutta roba estremamente preliminare che poi dovrò adattare
    return (
    <>
    <h2>{props.name}</h2>
    <PokemonCard
  name={props.name}
  stats={props.stats}
  art={props.art}
  abilities={props.abilities}
  moves={props.moves}
  types={props.types}
/>
    </>
    )
}