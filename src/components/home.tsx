import { ReactNode } from "react"

interface HomeProps{
    children: ReactNode
}

export function HomePage(props: HomeProps){

    return <>
    {props.children}
    </>
}