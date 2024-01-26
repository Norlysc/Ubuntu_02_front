import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useBoolean } from '@/hooks/useBoolean';
import { Box, Container, ImageList, TextField, Typography } from '@mui/material';
import ImageBackdrop from '@/pages/admin-microentrepreneurship/pages/detail/components/ImageBackdrop';
import ImageItem from '@/pages/admin-microentrepreneurship/pages/detail/components/ImageItem';
import { ADMIN_ROUTES } from '@/constants/routes';

export default function MicroentrepreneurshipDetail() {
  // const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [initialSlide, setInitialSlide] = useState(1);
  const { value: open, setTrue: handleOpen, setFalse: handleClose } = useBoolean();
  // const microentrepreneurshipService = new MicroEntrepreneurshipService();
  // const { data, loading, error } = useFetch({
  //   queryFn: ({ abortController }) => microentrepreneurshipService.findOne({ id, abortController }),
  // });

  function initializeSlider(index) {
    setInitialSlide(index);
    handleOpen();
  }

  // if (loading) return <SkeletonView />;

  if (!state?.storedState)
    return navigate(ADMIN_ROUTES.MICROENTREPRENEURSHIPS.ROUTER_ROUTE, { replace: true });

  // if (error)
  //   return (
  //     <Container
  //       sx={{
  //         py: '2.5rem',
  //         minHeight: 'calc(100dvh - 56px)',
  //         display: 'flex',
  //         alignItems: 'center',
  //         justifyContent: 'center',
  //       }}
  //     >
  //       <Box>
  //         <Typography align='center' fontWeight={800} fontSize={'2rem'}>
  //           500 - Error interno
  //         </Typography>
  //       </Box>
  //     </Container>
  //   );

  return (
    <Container sx={{ py: '2.5rem' }}>
      <Typography variant='h1' align='center'>
        Microemprendimientos
      </Typography>
      <Box mt={'2.5rem'}>
        <Typography variant='h2' textAlign={'center'} color={'primary.main'}>
          {state.storedState.name}
        </Typography>
        <Typography variant='body1' textAlign={'center'} mt={'0.5rem'}>
          {state.storedState.category.name}
        </Typography>
        <Box display='flex' flexDirection='column' gap='1.5rem' my='1.5rem'>
          <TextField
            label={'Subcategoría'}
            value={state.storedState.subCategory}
            fullWidth
            InputLabelProps={{ sx: { color: 'primary.main' } }}
          />
          <TextField
            label={'País'}
            value={state.storedState.country}
            fullWidth
            InputLabelProps={{ sx: { color: 'primary.main' } }}
          />
          <TextField
            label={'Provincia/Estado'}
            value={state.storedState.province}
            fullWidth
            InputLabelProps={{ sx: { color: 'primary.main' } }}
          />
          <TextField
            label={'Ciudad'}
            value={state.storedState.city}
            fullWidth
            InputLabelProps={{ sx: { color: 'primary.main' } }}
          />
          <TextField
            label={'Descripción del Microemprendimiento'}
            value={state.storedState.description}
            fullWidth
            multiline
            InputLabelProps={{ sx: { color: 'primary.main' } }}
          />
          <TextField
            label={'Más información del Microemprendimiento'}
            value={state.storedState.moreInfo}
            fullWidth
            multiline
            InputLabelProps={{ sx: { color: 'primary.main' } }}
          />
        </Box>
        <Box>
          <ImageList cols={3} sx={{ height: '5rem' }} gap={8}>
            {state.storedState.images?.map((image, index) => (
              <ImageItem key={image} src={image} handleOpen={() => initializeSlider(index)} />
            )) || <></>}
          </ImageList>
        </Box>
      </Box>
      <ImageBackdrop
        open={open}
        images={state.storedState.images}
        initialSlide={initialSlide}
        handleClose={handleClose}
      />
    </Container>
  );
}
