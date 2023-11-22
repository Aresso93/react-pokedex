import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Ability } from '../../model/pokemon';

interface CardProps{
    name: string;
}

export function PokemonCard(props: CardProps){

    return (
        <div className='temp-card'>
            <h1>{props.name}</h1>
        </div>
    )
}