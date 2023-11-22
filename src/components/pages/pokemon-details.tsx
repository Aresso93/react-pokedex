interface PokemonDetailsProps{
    name: string,
    abilities: string[],
    moves: string[],
    types: string[],
    stats: []
}

export function PokemonDetails(props: PokemonDetailsProps){
    //tutta roba estremamente preliminare che poi dovrò adattare
    return (
    <>
    <h2>{props.name}</h2>
    <div>
        {props.abilities.map((ability) => (

        <div>{ability}</div>
        ))}
    </div>
    <span></span>
    </>
    )
}