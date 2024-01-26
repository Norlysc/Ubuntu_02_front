import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Container, Grid, Typography } from '@mui/material';
import SearchBar from '@/components/searchbar/SearchBar';
import ResultsContainer from '@/pages/search/components/ResultsContainer';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState();

  useEffect(() => {
    setQuery(searchParams.get('query'));
  }, [searchParams]);

  return (
    <Container component='main' sx={{ pb: '2.5rem' }}>
      <Grid container component='section' mt='1.5rem'>
        <Grid item xs={12}>
          <SearchBar />
        </Grid>
      </Grid>
      <Grid container component='section' mt='3.5rem'>
        <Grid item xs={12} textAlign='center'>
          <Box>
            <Typography
              component='h1'
              sx={{
                fontSize: '1.5rem',
                fontWeight: 700,
                lineHeight: '1.875rem',
              }}
            >
              Resultados de tu búsqueda
            </Typography>
          </Box>
          <Box mt='2rem'>
            <ResultsContainer query={query} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
