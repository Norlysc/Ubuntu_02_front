import useContactRequest from '@/hooks/useContactRequest';
import Card from '@/pages/admin-request/components/Card';
import { Grid, Skeleton } from '@mui/material';

export default function Managed() {
  const { managed, loading } = useContactRequest();

  return (
    <Grid container mt={'2rem'} spacing={2}>
      {loading &&
        Array.from({ length: 4 }).map((_, index) => (
          <Grid item xs={12} sm={6} md={6} key={index}>
            <Skeleton
              variant='rounded'
              sx={{
                height: '88px',
                borderRadius: '1rem',
              }}
            />
          </Grid>
        ))}
      {managed &&
        managed.map((e, index) => (
          <Card
            date={e.sentDate}
            title={e.microentrepreneurship.name}
            id={e.messageId}
            key={index}
            managed
          />
        ))}
      {/* <Card date={'20/08/2023'} title={'Nombre Microemprendimiento'} managed />
      <Card date={'20/08/2023'} title={'Nombre Microemprendimiento'} managed />
      <Card date={'20/08/2023'} title={'Nombre Microemprendimiento'} managed />
      <Card date={'20/08/2023'} title={'Nombre Microemprendimiento'} managed />
      <Card date={'20/08/2023'} title={'Nombre Microemprendimiento'} managed /> */}
    </Grid>
  );
}
