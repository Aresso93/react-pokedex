interface CardProps{
    name: string,


}

export function PokemonCard(props: CardProps){

    return (
        <>
        <div>{props.name}</div>
 
        </>
    )
}