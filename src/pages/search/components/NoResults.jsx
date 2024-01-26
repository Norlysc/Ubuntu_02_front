import { NoResultsIcon } from '@/components/icons';
import { Box, Grid, Typography } from '@mui/material';

export default function NoResults() {
  return (
    <Grid item xs={12} mt='3rem'>
      <Box bgcolor={'lightGray.main'} p='1.5rem' borderRadius='0.5rem'>
        <Box>
          <NoResultsIcon />
        </Box>
        <Box mt='1rem'>
          <Typography variant='h3' color={'primary.main'}>
            No se encontraron resultados para tu búsqueda
          </Typography>
        </Box>
        <Box mt='1rem'>
          <Typography>Intentá nuevamente con otra consulta</Typography>
        </Box>
      </Box>
    </Grid>
  );
}
