import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { usePokemonApi } from '../hooks/pokemon.api';
import { useEffect, useState } from 'react';
import { capitaliseFirstLetter } from '../pages/pokemon-card';

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
  const pokemonApi = usePokemonApi()
  useEffect(() => {
    pokemonApi.actions.getTypeData()
  },[])

  const handleChange = (event: SelectChangeEvent<typeof pokemonType>) => {
    const {
      target: { value },
    } = event;
    setPokemonType(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
      );
      console.log(value)
      for (let i = 0; i < value.length; i++) {
        const string = value[i];
        pokemonApi.actions.getPokemonByType(string)
        
      }
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Filter pokémon by type</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={pokemonType}
          onChange={handleChange}
          input={<OutlinedInput label="Types" />}
          renderValue={(selected) => selected.join(', ')}
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
    </div>
  );
}