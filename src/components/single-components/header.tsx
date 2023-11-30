import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import { usePokemonApi } from '../hooks/pokemon.api';
import { useEffect } from 'react';
import { Button } from '@mui/material';
import { usePokemonSearch } from '../hooks/use-search-pokemon';
import { usePokemonContext } from '../../contexts/PokemonContext';
import { useNavigate } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'sticky',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

interface PokedexHeaderProps{
  search: React.ChangeEventHandler<HTMLInputElement>,
  renderSearch: any;
}

export default function PokedexHeader(props: PokedexHeaderProps) {
  const navigate = useNavigate()
  useEffect(() => {
    pokemonApi.actions.getData();
  }, []);

  const pokemonApi = usePokemonApi()
  const pokemonSearch = usePokemonSearch()
  const pokemonContext = usePokemonContext()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => navigate('/home')}
          >
             <HomeIcon fontSize="large" />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Gotta catch 'em all! Browse {pokemonApi.states.genericData} pokémon (and counting)! <Button variant='contained' color='secondary'>Back</Button> Page {pokemonContext.states.currentPage} <Button variant='contained' color='secondary'>Next</Button>
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search mon…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={props.search}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
