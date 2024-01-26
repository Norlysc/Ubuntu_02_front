import { Card, Typography, Box, CardMedia, Modal, Fade } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import NoticeCard from '@/components/common/NoticeCard';
import { ADMIN_ROUTES } from '@/constants/routes';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, authError } = useAuth();
  const [open, setOpen] = useState(true);
  const [openError, setOpenError] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleGoogleSuccess = async (credentialResponse) => {
    if (credentialResponse && credentialResponse.credential) {
      const successResponse = await login(credentialResponse);
      if (successResponse) {
        const origin = location.state?.from?.pathname || ADMIN_ROUTES.DASHBOARD;
        navigate(origin);
      }
      handleClose();
      setOpenError(true);
    } else {
      console.error('Fallo en la autenticación de Google:', credentialResponse);
    }
  };

  return (
    <>
      <NoticeCard
        isOpen={openError}
        success={false}
        mainMessage={authError}
        handleClose={() => setOpenError(false)}
        cancelFunction={() => {
          setOpenError(false);
          setOpen(true);
        }}
      />
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              outline: 'none',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Card sx={{ width: '360px', borderRadius: '8px' }}>
              <Box display='flex' flexDirection='column' alignItems='center' padding='20px'>
                <Typography
                  variant='h1'
                  align='center'
                  paddingBottom='5px'
                  sx={{ fontWeight: 800 }}
                >
                  Ingreso
                </Typography>
                <Typography
                  variant='h1'
                  align='center'
                  paddingBottom='20px'
                  sx={{ fontWeight: 800 }}
                >
                  Administrador
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    sx={{
                      height: '20%',
                      width: '20%',
                      margin: '30px',
                      padding: '5px',
                      alignSelf: 'center',
                    }}
                    component='img'
                    image={'/src/assets/images/logo_card_ingreso_registro.png'}
                    alt={'Logo Ubuntu en tarjeta de inicio de sesion'}
                  />
                </Box>
                <Box display='flex' justifyContent='center' mt={2}>
                  <GoogleOAuthProvider clientId='812742210015-teti3ojikbl41vlpmjc2osgmc1clj2hv.apps.googleusercontent.com'>
                    <GoogleLogin
                      onSuccess={handleGoogleSuccess}
                      onError={() => {
                        console.log('Login Failed');
                      }}
                      cookiePolicy={'single_host_origin'}
                      size='large'
                      theme='filled_blue'
                      shape='pill'
                    />
                  </GoogleOAuthProvider>
                </Box>
              </Box>
            </Card>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};
export default Login;
