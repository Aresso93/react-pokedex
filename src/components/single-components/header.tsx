import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import { usePokemonApi } from "../hooks/pokemon.api";
import { useEffect } from "react";
import { Button } from "@mui/material";
import { usePokemonContext } from "../../contexts/PokemonContext";
import { useNavigate } from "react-router-dom";
import TypesSelect from "./types-select";
import ThemeSwitch from "./theme-switch";

interface HeaderProps{
  themeSwitch
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
            Gotta browse 'em all! Search amongst {pokemonApi.states.genericData} pokémon
            (and counting)!
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 0, display: { xs: "none", sm: "block" } }}
          >
            

            <ThemeSwitch 
            click={props.themeSwitch}/>
            
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 0, display: { xs: "none", sm: "block" } }}
          >
            <div className="outer-div">

            <TypesSelect/>
            </div>
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 0, display: { xs: "none", sm: "block" } }}
          >
            <div className="page-div">
              <Button variant="contained" color="secondary">
                Back
              </Button>
              Page {pokemonContext.states.currentPage}
              <Button
                variant="contained"
                color="secondary"
                onClick={pokemonApi.actions.getNextPage}
              >
                Next
              </Button>
            </div>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
