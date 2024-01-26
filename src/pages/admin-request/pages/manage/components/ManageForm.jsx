import { Box, TextField } from '@mui/material';

export default function ManageForm({ fullName, email, phone, message }) {
  return (
    <Box mb={'2.5rem'} mt={'0.5rem'}>
      <TextField
        sx={{ mt: '1rem' }}
        id='outlined-basic'
        label='Apellido y Nombre'
        variant='outlined'
        fullWidth
        value={fullName}
      />
      <TextField
        sx={{ mt: '1rem' }}
        id='outlined-basic'
        label='Correo electrónico'
        variant='outlined'
        fullWidth
        value={email}
      />
      <TextField
        sx={{ mt: '1rem' }}
        id='outlined-basic'
        label='Telefono'
        variant='outlined'
        fullWidth
        value={phone}
      />
      <TextField
        sx={{ mt: '1rem' }}
        id='outlined-basic'
        label='Mensaje'
        rows={8}
        multiline
        variant='outlined'
        fullWidth
        value={message}
      />
    </Box>
  );
}
