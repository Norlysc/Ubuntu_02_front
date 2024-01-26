import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { Grid, styled, Container, Box, Typography, Button, CircularProgress } from '@mui/material';
import { Formik, Form } from 'formik';

import SearchBarContainer from '@/components/searchbar/SearchBarContainer';
import FormikController from '@/components/form/FormikController';
import { contactSchema } from '@/schemas/formsSchema';
import NoticeCard from '@/components/common/NoticeCard';
import { MessageService } from '@/services/message.service';

const StyledContainer = styled(Container)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
}));

const MicroenterpriseContact = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const messageService = new MessageService();

  const searchBarProps = {
    imageRoute: `url("../../../src/assets/images/microemprendimientos/contact/projectsContact.jpg")`,
    title: 'CONTACTO',
    text: 'Contactanos para obtener información detallada sobre como podés invertir en un futuro más sostenible',
  };

  const initialValues = {
    fullName: '',
    email: '',
    phone: '',
    message: '',
  };

  const microenterpriseId = location.state?.enterpriseId;

  const formSubmitHandler = async (values) => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();
    const payload = {
      ...values,
      sentDate: formattedDate,
    };
    setSubmitting(true);
    try {
      const response = await messageService.create({
        payload: payload,
        microentrepreneurshipId: microenterpriseId,
        abortController: new AbortController(),
      });

      if (response.created) {
        setIsSubmitted(true);
      } else {
        setError('Error al enviar el formulario. Inténtalo nuevamente.');
      }
    } catch (error) {
      setError('Error al enviar el formulario. Inténtalo nuevamente.');
    } finally {
      setSubmitting(false);
    }
  };

  const closeNoticeHandler = (event) => {
    event.preventDefault();
    if (isSubmitted) {
      navigate('/');
    } else {
      setError(null);
    }
  };

  return (
    <>
      <SearchBarContainer
        imageRoute={searchBarProps.imageRoute}
        title={searchBarProps.title}
        text={searchBarProps.text}
      />
      <StyledContainer sx={{ paddingTop: '4.5rem', py: '2.5rem' }}>
        <Grid
          container
          spacing={2}
          sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}
        >
          <Typography
            align='center'
            sx={{
              fontSize: '24px',
              fontStyle: 'normal',
              fontWeight: 600,
              lineHeight: '25px',
              marginBottom: '25px',
            }}
          >
            Por favor, completá el formulario.
          </Typography>
          <Typography
            align='center'
            sx={{
              fontSize: '24px',
              fontStyle: 'normal',
              fontWeight: 600,
              lineHeight: '25px',
              marginBottom: '25px',
            }}
          >
            Nos comunicaremos en breve.
          </Typography>
          <Typography variant='h5' sx={{ color: '#093C59', padding: '1.5rem', fontWeight: 600 }}>
            {id}
          </Typography>
          {submitting && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#093c59',
                paddingBottom: '15px',
              }}
            >
              <CircularProgress color='inherit' />
            </Box>
          )}
          <Typography variant='h2'>
            Vas a contactar a Ubuntu para recibir mas información acerca del Microemprendimiento
            seleccionado.
          </Typography>
          <Box sx={{ paddingLeft: '1rem', paddingRight: '0.5rem' }}>
            <Formik
              initialValues={initialValues}
              validationSchema={contactSchema}
              onSubmit={formSubmitHandler}
              isInitialValid={false}
            >
              {({ errors, touched, values, isSubmitting, isValid }) => (
                <Form>
                  <FormikController
                    id='fullName'
                    control='text'
                    label='Apellido y Nombre*'
                    name='fullName'
                    error={touched.fullName && Boolean(errors.fullName)}
                  />
                  <FormikController
                    id='email'
                    control='text'
                    label='Correo Electrónico*'
                    name='email'
                    error={touched.email && Boolean(errors.email)}
                  />
                  <FormikController
                    id='phone'
                    control='text'
                    label='Teléfono*'
                    name='phone'
                    error={touched.phone && Boolean(errors.phone)}
                    helperText={'Con el siguiente formato +54 9 261 002 002'}
                  />
                  <FormikController
                    value={values.message}
                    id='message'
                    control='textarea'
                    label='Mensaje*'
                    name='message'
                    error={touched.message && Boolean(errors.message)}
                    helperText={'Máximo 300 caracteres'}
                    maxLength={300}
                  />

                  <Button
                    type='submit'
                    variant='contained'
                    sx={{ textTransform: 'none' }}
                    fullWidth
                    disableElevation
                    disabled={isSubmitting || !isValid}
                  >
                    Enviar
                  </Button>
                </Form>
              )}
            </Formik>
            {isSubmitted && (
              <NoticeCard
                isOpen={true}
                success={true}
                mainMessage='Formulario enviado con éxito'
                secondaryMessage='Gracias por contactarnos, nos comunicaremos en breve'
                handleClose={() => {
                  navigate('/');
                }}
              />
            )}
            {error && (
              <NoticeCard
                isOpen={true}
                success={false}
                mainMessage='Error al enviar el formulario'
                secondaryMessage={error}
                handleClose={() => {
                  navigate('/');
                }}
                cancelFunction={() => {
                  navigate('/');
                }}
              />
            )}
          </Box>
        </Grid>
      </StyledContainer>
    </>
  );
};

export default MicroenterpriseContact;
