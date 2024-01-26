import { ADMIN_ROUTES } from '@/constants/routes';
import ContactRequestProvider from '@/contexts/ContactRequestContext';
import LinkTab from '@/pages/admin-request/components/LinkTab';
import Manage from '@/pages/admin-request/pages/manage/Manage';
import Managed from '@/pages/admin-request/pages/managed/Managed';
import Unmanaged from '@/pages/admin-request/pages/unmanaged/Unmanaged';
import { Box, Container, Grid, Tabs, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

export default function RequestRouter() {
  const [value, setValue] = useState(0);
  const { pathname } = useLocation();

  function handleChange(_, newValue) {
    setValue(newValue);
  }

  useEffect(() => {
    if (pathname === '/admin/solicitudes-de-contacto/gestionadas') setValue(1);
  }, [pathname]);

  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <Typography mt={'2.5rem'} textAlign={'center'} variant='h1'>
            Solicitudes de Contacto
          </Typography>
          <Box width={'100%'} display='flex' justifyContent={'center'}>
            <Tabs
              sx={{ mt: '1.5rem', borderBottom: '1px solid black' }}
              value={value}
              onChange={handleChange}
            >
              <LinkTab label='No Gestionadas' to={ADMIN_ROUTES.CONTACT_REQUESTS.UNMANAGED} />
              <LinkTab label='Gestionadas' to={ADMIN_ROUTES.CONTACT_REQUESTS.MANAGED} />
            </Tabs>
          </Box>
        </Grid>
      </Grid>
      <ContactRequestProvider>
        <Routes>
          <Route path={'/'} element={<Navigate to={ADMIN_ROUTES.CONTACT_REQUESTS.UNMANAGED} />} />
          <Route path={ADMIN_ROUTES.CONTACT_REQUESTS.UNMANAGED} element={<Unmanaged />} />
          <Route path={ADMIN_ROUTES.CONTACT_REQUESTS.MANAGED} element={<Managed />} />
          <Route path={ADMIN_ROUTES.CONTACT_REQUESTS.BY_ID} element={<Manage />} />
        </Routes>
      </ContactRequestProvider>
    </Container>
  );
}
