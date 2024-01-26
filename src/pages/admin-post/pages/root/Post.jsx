import { Link } from 'react-router-dom';
import { Box, Button, Container, Grid, Typography, CircularProgress } from '@mui/material';

import PostCard from '@/pages/admin-post/pages/root/components/PostCard';
import { ADMIN_ROUTES } from '@/constants/routes';
import { PublicationService } from '@/services/publication.service';
import useFetch from '@/hooks/useFetch';

export default function Post() {
  const jwt = localStorage.getItem('token');

  const publicationService = new PublicationService();

  const { data, loading, error } = useFetch({
    queryFn: ({ abortController }) => publicationService.find({ abortController, jwt }),
  });

  return (
    <Container>
      <Box mt={'2.5rem'}>
        <Typography variant='h1' textAlign={'center'}>
          Publicaciones
        </Typography>
        <Button
          component={Link}
          to={ADMIN_ROUTES.POSTS.LOAD}
          variant='contained'
          sx={{ textTransform: 'none', mt: '1.5rem' }}
          fullWidth
        >
          Crear Publicación
        </Button>
      </Box>
      <Box mt={'3rem'}>
        <Typography variant='h2' textAlign={'center'}>
          Publicaciones cargadas
        </Typography>
        <Grid container spacing={'1rem'} mt={'2rem'}>
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
            data?.map((item) => <PostCard post={item} key={item.title} />)
          )}
        </Grid>
      </Box>
    </Container>
  );
}
