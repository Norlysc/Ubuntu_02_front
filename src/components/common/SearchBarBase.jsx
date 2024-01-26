import { SearchIcon } from '@/components/icons';
import { Box, Grid, InputBase } from '@mui/material';
import { useState } from 'react';

/**
 * SearchBar
 * @param {object} props - Props
 * @param {import('@mui/material').SxProps} [props.sx] - MUI sx prop
 * @param {string} [props.placeholder] - Placeholder of input
 * @param {string} [props.state] - State of input
 * @param {Function} [props.onStateChange] - Function to call when state changes
 * @param {Function} props.onSubmit - Function to call when form is submitted
 * @returns {React.ReactElement} SearchBar component
 **/

export default function SearchBarBase({
  sx = {},
  placeholder = 'Buscar Microemprendimientos',
  state,
  onStateChange,
  onSubmit,
}) {
  const [value, setValue] = useState('');
  const isControlled = state !== undefined && onStateChange !== undefined;

  function handleChange(e) {
    if (isControlled) {
      onStateChange(e.target.value);
      return;
    }
    setValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (isControlled) {
      onSubmit(state);
      return;
    }
    onSubmit(value);
  }

  const finalValue = isControlled ? value : state;

  return (
    <Grid container height='3.5rem' sx={sx}>
      <Grid item xs={12} display='flex'>
        <Box
          bgcolor={'lightGray.main'}
          sx={{
            width: '100%',
            borderRadius: '100px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 1rem',
            flexShrink: 0,
            gap: '1rem',
          }}
          component='form'
          onSubmit={handleSubmit}
        >
          <SearchIcon />
          <InputBase
            placeholder={placeholder}
            sx={{
              flex: '1 1 auto',
              fontWeight: 400,
              '>::placeholder': {
                color: 'black',
                opacity: 0.8,
              },
            }}
            value={finalValue}
            onChange={handleChange}
          />
        </Box>
      </Grid>
    </Grid>
  );
}
