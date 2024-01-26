import { useState } from 'react';

import { Link } from 'react-router-dom';
import { Typography, Button, IconButton, Divider, Box, styled } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ExpandLess } from '@mui/icons-material';
import { useTheme } from '@emotion/react';

import CardImageSlider from '@/components/card/CardImageSlider';

const MainContainer = styled('div')(({ theme }) => ({
  p: '16px 0.75rem 0.5rem',
  gap: '1rem',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#EAEAEA',
  borderRadius: '16px',
  transition: 'max-height 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  overflow: 'hidden',
  maxHeight: '400px',
  '&:hover': {
    boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.2)',
  },
}));

const MicroenterpriseCard = ({
  id,
  title,
  establishmentType,
  category,
  location,
  description,
  additionalInfo,
  images,
}) => {
  const [expand, setExpand] = useState(false);
  const { palette } = useTheme();

  const expandHandler = () => {
    setExpand(!expand);
  };

  return (
    <MainContainer style={{ maxHeight: expand ? '1090px' : '500px' }}>
      <Box sx={{ padding: '16px 15px 0px 15px', borderRadius: '16px' }}>
        <CardImageSlider images={images} />
      </Box>
      <Box px={2} py={2} sx={{ mt: '-30px' }}>
        <Typography variant='h5' align='left' color='black'>
          {title}
        </Typography>
        <Typography variant='h3' align='left' color={palette.primary.main} sx={{ mt: '8px' }}>
          {establishmentType}
        </Typography>
        <Typography variant='body1' sx={{ mt: '8px', color: 'black' }}>
          {category}
        </Typography>
        <Box display='flex' alignItems='center' color={palette.primary.main} sx={{ mt: '8px' }}>
          <LocationOnIcon />
          <Typography variant='body1' ml={1} color='black'>
            {location}
          </Typography>
        </Box>
        {expand ? (
          <>
            <Typography variant='h3' mt={5}>
              Descripción del Microemprendimiento
            </Typography>
            <Typography variant='body1' mt={2} color='black'>
              {description}
            </Typography>
            <Divider
              my={2}
              sx={{ margin: '40px 5px 10px 5px', backgroundColor: 'black', height: '1px' }}
            />
            <Typography variant='h3' mt={5}>
              Más información de interés
            </Typography>
            <Typography variant='body1' mt={2} color='black'>
              {additionalInfo}
            </Typography>
            <Box textAlign='center' sx={{ mt: '40px' }}>
              <Link to={`${title}/contacto`} state={{ enterpriseId: id }}>
                <Button variant='contained' color='primary' sx={{ width: '40%' }}>
                  Contactar
                </Button>
              </Link>
            </Box>
            <Box textAlign='center' sx={{ mt: '8px' }}>
              <IconButton
                onClick={expandHandler}
                sx={{ fontSize: '50px', color: '#093C59', marginbottom: '8px' }}
              >
                <ExpandLess fontSize='inherit' />
              </IconButton>
            </Box>
          </>
        ) : (
          <Box textAlign='center' sx={{ mt: '8px' }}>
            <IconButton onClick={expandHandler} sx={{ fontSize: '50px', color: '#093C59' }}>
              <ExpandMoreIcon fontSize='inherit' />
            </IconButton>
          </Box>
        )}
      </Box>
    </MainContainer>
  );
};

export default MicroenterpriseCard;
