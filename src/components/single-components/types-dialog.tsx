import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import { usePokemonApi } from '../hooks/pokemon.api';
import { useEffect } from 'react';
import { capitaliseFirstLetter } from '../pages/pokemon-card';

export interface ConfirmationDialogRawProps {
  id: string;
  keepMounted: boolean;
  value: string;
  open: boolean;
  onClose: (value?: string) => void;
}


function ConfirmationDialogRaw(props: ConfirmationDialogRawProps) {
  const pokemonApi = usePokemonApi()
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const radioGroupRef = React.useRef<HTMLElement>(null);
  
  
  let pokemonTypes = pokemonApi.states.typeData 

  console.log('TIPI', pokemonTypes);
  
  
  useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  useEffect(() => {
    pokemonApi.actions.getTypeData()
  },[])

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle>Pokémon types</DialogTitle>
      <DialogContent dividers>
        <RadioGroup
          ref={radioGroupRef}
          aria-label="ringtone"
          name="ringtone"
          value={value}
          onChange={handleChange}
        >
          {pokemonTypes.map((type) => (
            <FormControlLabel
              value={type.name}
              key={type.name}
              control={<Radio />}
              label={capitaliseFirstLetter(type.name)}
            />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk}>Apply filters</Button>
      </DialogActions>
    </Dialog>
  );
}

export default function TypesDialog() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('Dione');

  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = (newValue?: string) => {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
    }
  };

  return (
    <>
        <button
          onClick={handleClickListItem}
        >
          Filter pokémon by type
        </button>
   
        <ConfirmationDialogRaw
          id="ringtone-menu"
          keepMounted
          open={open}
          onClose={handleClose}
          value={value}
        />
     
</>
  );
}
