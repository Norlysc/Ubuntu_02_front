import { Box, Container, Grid, Typography, useTheme } from '@mui/material';
import NewMicroentrepreneporships from '@/pages/dashboard/components/NewMicroentrepreneporships';
import EstatisticsCard from '@/pages/dashboard/components/EstatisticsCard';
import CategoryWrapper from '@/pages/dashboard/components/CategoryWrapper';
import { MicroEntrepreneurshipService } from '@/services/micro-entrepreneurship.service';
import PublicationWrapper from '@/pages/dashboard/components/PublicationWrapper';
import { PublicationService } from '@/services/publication.service';

function Dashboard() {
  const { palette } = useTheme();
  const service = new MicroEntrepreneurshipService();
  const publicationService = new PublicationService();
  return (
    <Container>
      <Box mt={'2.5rem'}>
        <Typography variant='h1' textAlign='center'>
          Dashboard Administrador
        </Typography>
        <Typography variant='h2' textAlign='center' mt='1.5rem' mb='2rem'>
          Estadisticas Mensuales
        </Typography>
      </Box>
      <NewMicroentrepreneporships />
      <Grid container mt={'1rem'} spacing={'1.5rem'}>
        <Grid item xs={6}>
          <EstatisticsCard
            borderColor={palette.success.main}
            text={'Gestionados'}
            method={(context) => service.findManaged(context)}
          />
        </Grid>
        <Grid item xs={6}>
          <EstatisticsCard
            borderColor={palette.warning.main}
            text={'No gestionados'}
            method={(context) => service.findUnmanaged(context)}
          />
        </Grid>
      </Grid>
      <CategoryWrapper method={(context) => service.findCountByCategory(context)} />
      <PublicationWrapper method={(context) => publicationService.find(context)} />
    </Container>
  );
}

export default Dashboard;
