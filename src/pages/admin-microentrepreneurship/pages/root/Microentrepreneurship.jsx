import { ADMIN_ROUTES } from '@/constants/routes';
import { Link } from 'react-router-dom';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import CardContainer from '@/pages/admin-microentrepreneurship/pages/root/components/CardContainer';

export default function Microentrepreneurship() {
  return (
    <Container sx={{ py: '2.5rem' }}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant='h1' align='center'>
            Microemprendimientos
          </Typography>
          <Box display='flex' justifyContent='center' mt='1.5rem'>
            <Link to={ADMIN_ROUTES.MICROENTREPRENEURSHIPS.LOAD} style={{ width: '100%' }}>
              <Button
                variant='contained'
                fullWidth
                sx={{
                  lineHeight: '1.25rem',
                  padding: '0.625rem 1.89rem',
                  textTransform: 'none',
                }}
                disableElevation
              >
                Cargar Microemprendimientos
              </Button>
            </Link>
          </Box>
          <CardContainer />
        </Grid>
      </Grid>
    </Container>
  );
}
