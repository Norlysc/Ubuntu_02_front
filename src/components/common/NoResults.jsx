import { Box, Typography } from '@mui/material';

export default function NoResults() {
  return (
    <Box mt='5rem' py='2.5rem'>
      <Typography variant='h2' textAlign='center'>
        No hay resultados
      </Typography>
    </Box>
  );
}
