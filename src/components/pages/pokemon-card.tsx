import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Ability } from '../../model/pokemon';

interface CardProps{
    name: string,
    height: number,
}

export function PokemonCard(props: CardProps){

    return (
        <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          sx={{ height: 300}}
         
          title={props.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
        
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
        </CardActions>
      </Card>
    )
}