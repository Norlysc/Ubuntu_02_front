import { useState, useEffect } from 'react';

import { Box, Button, Grid, Typography, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';

import PostCard from '@/pages/landing/components/PostCard';
import { USER_ROUTES } from '@/constants/routes';
import { PublicationService } from '@/services/publication.service';
import useFetch from '@/hooks/useFetch';

const limitPosts = 4;

export default function Posts() {
  const [publications, setPublications] = useState([]);

  const publicationService = new PublicationService();

  const { data, loading, error } = useFetch({
    queryFn: ({ abortController }) => publicationService.findActive({ abortController }),
  });

  useEffect(() => {
    if (data && data.length > 0) {
      const limitedData = data.slice(0, limitPosts);
      setPublications(limitedData);
    }
  }, [data]);

  return (
    <Grid container component='section' mt='3rem'>
      <Grid item xs={12}>
        <Box textAlign='center'>
          <Typography variant='h2' component='span' sx={{ fontSize: '1rem' }}>
            Publicaciones
          </Typography>
          <Typography variant='h2' component='h2'>
            Finanzas con impacto
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} mt='2rem' sx={{ display: 'flex', justifyContent: 'center' }}>
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
          <Grid container spacing={2} justifyContent='center'>
            {publications?.map((publication) => (
              <PostCard post={publication} key={publication.id} />
            ))}
          </Grid>
        )}
      </Grid>
      <Grid item xs={12} mt='1.5rem'>
        <Box display='flex' justifyContent='center'>
          <Link to={USER_ROUTES.POSTS}>
            <Button
              variant='contained'
              sx={{
                lineHeight: '1.25rem',
                padding: '0.625rem 1.89rem',
                textTransform: 'none',
              }}
              disableElevation
            >
              Ir a Publicaciones
            </Button>
          </Link>
        </Box>
      </Grid>
    </Grid>
  );
}
