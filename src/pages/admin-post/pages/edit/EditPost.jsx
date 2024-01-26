import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import NoticeCard from '@/components/common/NoticeCard';
import LoadForm from '@/pages/admin-post/pages/load/components/LoadForm';
import { Box, Container, Grid, Typography, CircularProgress } from '@mui/material';
import instance from '@/helpers/axiosConfig';

export default function EditPost() {
  const navigate = useNavigate();
  const location = useLocation();
  const [success, setSuccess] = useState(false);
  const [loadingComp, setLoadingComp] = useState(false);
  const [errorComp, setErrorComp] = useState(false);

  const jwt = localStorage.getItem('token');
  const publicationId = location?.state.id;

  function handleSubmit(values) {
    if (values) {
      const formData = new FormData();
      formData.append('title', values?.title);
      formData.append('description', values?.description);

      for (let i = 0; i < values?.multipartImages.length; i++) {
        formData.append('multipartImages', values?.multipartImages[i]);
      }

      setLoadingComp(true);

      const url = `/publication/update/${publicationId}`;

      instance
        .put(url, formData, {
          headers: { Authorization: `Bearer ${jwt}`, 'Content-Type': 'multipart/form-data' },
        })
        .then(() => {
          setSuccess(true);
          setLoadingComp(false);
        })
        .catch(() => {
          setErrorComp(true);
          setLoadingComp(false);
        });
    }
  }

  return (
    <Container sx={{ py: '2.5rem' }}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant='h1' align='center'>
            Edición de publicación
          </Typography>
          <Typography variant='h5' align='center' sx={{ color: '#093c59', marginTop: '2%' }}>
            {location?.state.title}
          </Typography>
          <Box>
            <Typography
              variant='h2'
              sx={{ fontSize: '1.25rem', fontWeight: '400' }}
              align='center'
              mt={'2rem'}
            >
              Modificá los datos de la publicación
            </Typography>
            {loadingComp && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: '#093c59',
                  paddingTop: '15px',
                }}
              >
                <CircularProgress color='inherit' />
              </Box>
            )}
            <LoadForm handleChange={handleSubmit} />
          </Box>
        </Grid>
        {success && (
          <NoticeCard
            isOpen={true}
            success={true}
            handleClose={() => navigate('/admin/publicaciones')}
            mainMessage={'Publicación modificada con éxito'}
          />
        )}
        {errorComp && (
          <NoticeCard
            isOpen={true}
            success={false}
            handleClose={() => navigate('/admin/publicaciones')}
            cancelFunction={() => navigate('/admin/publicaciones')}
            mainMessage={'Error en la modificación de publicación, inténtalo nuevamente'}
          />
        )}
      </Grid>
    </Container>
  );
}
