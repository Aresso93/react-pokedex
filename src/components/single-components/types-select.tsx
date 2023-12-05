import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { usePokemonApi } from "../hooks/pokemon.api";
import { useEffect, useState } from "react";
import { capitaliseFirstLetter } from "../pages/pokemon-card";
import { useAxios } from "../../services/axios-api";
import { Pokemon } from "../../model/pokemon";
import { PokemonList } from "../pages/pokemon-list";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function TypesSelect() {
  const [pokemonType, setPokemonType] = useState<string[]>([]);
  const [filteredMon, setFilteredMon] = useState<Pokemon[]>([]);
  const pokemonApi = usePokemonApi();
  const axiosService = useAxios();
  const [open, setOpen] = useState(false);

  const multipleCall = async (typeArray: string[]) => {
    const macroArray = [];
    for (let i = 0; i < typeArray.length; i++) {
      const type = typeArray[i];
      const singleTypeResp = await axiosService("type/" + type);
      const pokemonArray = singleTypeResp.data.pokemon;
      macroArray.push(pokemonArray);
      const flatMacroArray = macroArray.flat();
      const ids = flatMacroArray.map(({ pokemon }) => pokemon);
      const names = ids.map(({ name }) => name);
      const filtered = ids.filter(
        ({ name }, index) => !names.includes(name, index + 1)
      );
      setFilteredMon(filtered);
    }
  };

  const handleClose = () => {
    setOpen(false);
    multipleCall(pokemonType);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    pokemonApi.actions.getTypeData();
  }, []);

  useEffect(() => {
    filteredMon;
  }, []);

  const handleChange = (event: SelectChangeEvent<typeof pokemonType>) => {
    const {
      target: { value },
    } = event;
    setPokemonType(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    multipleCall(pokemonType);
  }, []);

  console.log(pokemonType);

  return (
    <>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">
          Filter pokémon by type
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={pokemonType}
          onChange={handleChange}
          onClose={handleClose}
          onOpen={handleOpen}
          input={<OutlinedInput label="Types" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {pokemonApi.states.typeData.map((type) => (
            <MenuItem key={type.name} value={type.name}>
              <Checkbox checked={pokemonType.indexOf(type.name) > -1} />
              <ListItemText primary={capitaliseFirstLetter(type.name)} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <div className="outer-div">
        <PokemonList detail={filteredMon} />
      </div>
    </>
  );
}
