import { useEffect, useState } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { Box, Typography, styled, Container, Grid, CircularProgress, Button } from '@mui/material';

import SearchBarContainer from '@/components/searchbar/SearchBarContainer';
import MicroenterpriseCard from '@/pages/microemprendimientos/components/visitor-entrepreneurships/MicroenterpriseCard';
import { searchBarProps } from '@/pages/microemprendimientos/VisitorMicroentrepreneurship';

import { MicroEntrepreneurshipService } from '@/services/micro-entrepreneurship.service';
import useFetch from '@/hooks/useFetch';

const StyledContainerCategories = styled(Container)(({ theme }) => ({
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
  top: '-290%',
  right: '-440%',
  width: '3500px',
  height: '3500px',
  borderRadius: '50%',
  backgroundColor: 'white',
  transform: 'rotate(45deg)',
  zIndex: -1,
}));

const NoMicroenterprisesBox = styled(Box)({
  border: '1px solid #ccc',
  borderRadius: '8px',
  backgroundColor: '#d2d2d2',
  padding: '20px',
  textAlign: 'center',
});

const CategoryDetails = ({ category, description, id }) => {
  const { categoryId } = useParams();
  const location = useLocation();
  const [categoryData, setCategoryData] = useState({});
  const [microenterprises, setMicroenterprises] = useState([]);

  const categoryDataId = location.state?.categoryId;

  const microEntrepreneurshipService = new MicroEntrepreneurshipService();

  const { data, loading, error } = useFetch({
    queryFn: ({ abortController }) =>
      microEntrepreneurshipService.findByCategory({ categoryDataId, abortController }),
  });

  //solo usamos la description aca./
  const loadCategoryHandler = () => {
    const categoryDummyData = {
      name: 'Agroecología-Orgánicos-Alimentación saludable',
      description:
        'Conectate con Microemprendimientos que respetan la tierra y priorizan la salud, a través de prácticas agrícolas limpias y alimentos nutritivos.',
    };
    setCategoryData(categoryDummyData);
  };

  useEffect(() => {
    loadCategoryHandler();
    if (data && data.microentrepreneurships && data.microentrepreneurships.length > 0) {
      setMicroenterprises(data.microentrepreneurships);
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
      <StyledContainerCategories sx={{ py: '2.5rem' }}>
        <Background />
        <CircleCut />
        <Box
          sx={{
            justifyContent: 'center',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            padding: '25px 0px 35px 0px',
          }}
        >
          <Typography
            align='center'
            sx={{
              fontSize: '24px',
              fontStyle: 'normal',
              fontWeight: 600,
              lineHeight: '25px',
            }}
          >
            Categorías
          </Typography>
        </Box>
        <Typography variant='h2' align='center' color='#093C59' sx={{ pb: '20px' }}>
          {categoryId}
        </Typography>
        <Typography align='center' sx={{ pb: '20px' }}>
          {categoryData.description}
        </Typography>

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
          <Grid container spacing={2}>
            {microenterprises?.map((microenterprise, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <MicroenterpriseCard
                  key={microenterprise.id}
                  id={microenterprise.id}
                  title={microenterprise.name}
                  establishmentType={microenterprise.subCategory}
                  category={microenterprise.category.name}
                  location={`${microenterprise.city}, ${microenterprise.province}, ${microenterprise.country}`}
                  description={microenterprise.description}
                  additionalInfo={microenterprise.moreInfo}
                  images={microenterprise.images}
                />
              </Grid>
            ))}
          </Grid>
        )}
        {error && (
          <NoMicroenterprisesBox sx={{ marginTop: '1rem' }}>
            <Typography variant='h3' color='textPrimary'>
              {`${error}. Intenta en la demás categorías.`}
            </Typography>
            <Link to='/microemprendimientos' style={{ textDecoration: 'none', cursor: 'pointer' }}>
              <Button variant='contained' sx={{ marginTop: '10px' }}>
                Volver a categorías
              </Button>
            </Link>
          </NoMicroenterprisesBox>
        )}
      </StyledContainerCategories>
    </>
  );
};

export default CategoryDetails;
