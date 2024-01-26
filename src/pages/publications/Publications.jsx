import { useEffect, useState } from 'react';
import { styled, Box, Grid, Container, CircularProgress } from '@mui/material';

import SearchBarContainer from '@/components/searchbar/SearchBarContainer';
import PostCard from '@/pages/landing/components/PostCard';
import { PublicationService } from '@/services/publication.service';
import useFetch from '@/hooks/useFetch';

const StyledContainer = styled(Container)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
}));

const Background = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  backgroundColor: '#226516',
  zIndex: -1,
}));

const CircleCut = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '-120%',
  right: '-580%',
  width: '3500px',
  height: '3500px',
  borderRadius: '50%',
  backgroundColor: 'white',
  transform: 'rotate(45deg)',
  zIndex: -1,
}));

const Publications = () => {
  const [publications, setPublications] = useState([]);

  const searchBarProps = {
    imageRoute: `url("../src/assets/images/publications/publications background compressed.jpg")`,
    title: 'PUBLICACIONES',
    subtitle: 'Explorando finanzas de impacto',
    text: 'Conocé cómo decisiones financieras pueden impactar positivamente en la sociedad y el medio ambiente',
  };

  const publicationService = new PublicationService();

  const jwt = localStorage.getItem('token');

  const { data, loading, error } = useFetch({
    queryFn: ({ abortController }) => publicationService.findActive({ abortController, jwt }),
  });

  useEffect(() => {
    if (data && data.length > 0) {
      setPublications(data);
    }
  }, [data]);

  return (
    <>
      <SearchBarContainer
        imageRoute={searchBarProps.imageRoute}
        title={searchBarProps.title}
        subtitle={searchBarProps.subtitle}
        text={searchBarProps.text}
      />
      <StyledContainer sx={{ py: '2.5rem' }}>
        <Background />
        <CircleCut />
        <Grid item xs={12} mt='2rem'>
          <Grid container spacing={'1rem'}>
            {loading ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'white',
                }}
              >
                <CircularProgress color='inherit' />
              </Box>
            ) : (
              publications.map((publication, index) => <PostCard key={index} post={publication} />)
            )}
          </Grid>
        </Grid>
      </StyledContainer>
    </>
  );
};

export default Publications;
