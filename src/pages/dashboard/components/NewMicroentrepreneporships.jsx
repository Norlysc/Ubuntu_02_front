import useFetch from '@/hooks/useFetch';
import { MicroEntrepreneurshipService } from '@/services/micro-entrepreneurship.service';
import { Grid, Box, Typography, useTheme, Skeleton } from '@mui/material';

const NewMicroentrepreneporships = () => {
  const { palette } = useTheme();
  const service = new MicroEntrepreneurshipService();
  const jwt = localStorage.getItem('token');
  const { data, loading } = useFetch({
    queryFn: ({ abortController }) => service.findLatest({ abortController, jwt }),
  });

  if (loading === true) {
    return <Skeleton sx={{ height: '66px', borderRadius: '0.5rem', transform: 'none' }} />;
  }
  return (
    <Box
      sx={{
        backgroundColor: palette.primary.main,

        borderRadius: '8px',
        justifyContent: 'space-between',
        padding: '8px 16px',
        width: '100%',
      }}
    >
      <Grid container alignItems='center'>
        <Grid item xs={10}>
          <Typography
            variant='h1'
            sx={{
              fontFamily: 'Lato',
              fontWeight: 700,
              fontSize: '1.25rem',
              lineHeight: '1.5625rem',
              color: 'background.paper',
            }}
          >
            Nuevos Microemprendimientos
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography
            variant='h1'
            sx={{
              fontWeight: 700,
              fontSize: '22px',
              lineHeight: '25px',
              textAlign: 'right',
              color: '#FDFDFE',
            }}
          >
            {data}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NewMicroentrepreneporships;
