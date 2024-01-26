import NoticeCard from '@/components/common/NoticeCard';
import { ADMIN_ROUTES } from '@/constants/routes';
import { useBoolean } from '@/hooks/useBoolean';
import LoadForm from '@/pages/admin-microentrepreneurship/pages/load/components/LoadForm';
import { MicroEntrepreneurshipService } from '@/services/micro-entrepreneurship.service';
import { Box, Container, Grid, Typography, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export default function EditMicroentrepreneurship() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const jwt = localStorage.getItem('token');
  const [success, setSuccess] = useState(true);
  const [message, setMessage] = useState('');
  const { value, setFalse, toggle } = useBoolean(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  async function handleSubmit(values, { setSubmitting }) {
    const {
      images,
      state: province,
      name,
      category,
      subcategory,
      country,
      city,
      description,
      moreInfo,
    } = values;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('country', country);
    formData.append('province', province);
    formData.append('category', category);
    formData.append('subcategory', subcategory);
    formData.append('description', description);
    formData.append('moreInfo', moreInfo);
    formData.append('city', city);
    images.forEach((file) => {
      formData.append('multipartImages', file, file.name);
    });

    setLoading(true);

    try {
      const service = new MicroEntrepreneurshipService();
      await service.update({
        id,
        abortController: new AbortController(),
        formData,
        jwt,
      });
      setSuccess(true);
      setMessage('Microemprendimiento editado con éxito');
    } catch (error) {
      setSuccess(false);
      setMessage('Lo sentimos, el Microemprendimiento no pudo ser editado.');
      console.log(error);
    } finally {
      setSubmitting(false);
      toggle((preValue) => !preValue);
      setLoading(false);
    }
  }

  if (!state?.storedState)
    return navigate(ADMIN_ROUTES.MICROENTREPRENEURSHIPS.ROUTER_ROUTE, { replace: true });

  return (
    <Container sx={{ py: '2.5rem' }}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant='h1' align='center'>
            Edición de Microemprendimiento
          </Typography>
          <Typography variant='h1' align='center' sx={{ color: '#093c59', marginTop: '2%' }}>
            {state?.storedState?.name}
          </Typography>
          <Box>
            <Typography
              variant='h2'
              sx={{ fontSize: '1.25rem', fontWeight: '400' }}
              align='center'
              mt={'2rem'}
            >
              Completá el formulario para editar un Microemprendimiento
            </Typography>
            {loading && (
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
            <LoadForm
              initialValues={{
                ...state?.storedState,
                category: state?.storedState?.category.id,
                state: state?.storedState?.province,
                subcategory: state?.storedState?.subCategory,
              }}
              onSubmit={handleSubmit}
            />
          </Box>
        </Grid>
      </Grid>
      <NoticeCard
        isOpen={value}
        success={success}
        handleClose={setFalse}
        mainMessage={message}
        cancelFunction={setFalse}
        goBack
      />
    </Container>
  );
}
