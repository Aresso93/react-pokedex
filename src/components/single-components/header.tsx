import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import { usePokemonApi } from "../hooks/pokemon.api";
import { useEffect } from "react";
import { usePokemonContext } from "../../contexts/PokemonContext";
import { useNavigate } from "react-router-dom";
import TypesSelect from "./types-select";
import ThemeSwitch from "./theme-switch";

interface HeaderProps {
  themeSwitch: VoidFunction
}

export default function PokedexHeader(props: HeaderProps) {
  const navigate = useNavigate();
  useEffect(() => {
    pokemonApi.actions.getData();
  }, []);

  const pokemonApi = usePokemonApi();
  const pokemonContext = usePokemonContext();

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
            onClick={() => navigate("/home")}
          >
            <HomeIcon fontSize="large" />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Gotta browse 'em all! Search amongst {pokemonApi.states.genericData} pokémon (and counting)!
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 0, display: { xs: "none", sm: "block" } }}
          >
            <ThemeSwitch click={props.themeSwitch} />
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 0, display: { xs: "none", sm: "block" } }}
          >
            <div className="link-div">
              <a href="https://www.pokemon.com/uk" target="blank" >Visit the official website </a>
              
              <img src="./public/pokeball.png" alt="pokemon" width={24} height={24}/>
            </div>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
