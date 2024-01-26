import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { Container, Typography, Box, styled, CircularProgress } from '@mui/material';

import SearchBarContainer from '@/components/searchbar/SearchBarContainer';
import CategoryCard from '@/pages/microemprendimientos/components/categories/CategoryCard';
import NoticeCard from '@/components/common/NoticeCard';
import useFetch from '@/hooks/useFetch';

import socialEconomyIcon from '@/assets/images/social-economy.png';
import agroecologyIcon from '@/assets/images/agroecology.png';
import conservationIcon from '@/assets/images/conservation.png';
import circularEconomyIcon from '@/assets/images/circular-economy.png';
import instance from '@/helpers/axiosConfig';

const StyledContainer = styled(Container)(({ theme }) => ({
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
  top: '-1080px',
  right: '-700px',
  width: '300%',
  height: '300%',
  borderRadius: '50%',
  backgroundColor: 'white',
  transform: 'rotate(45deg)',
  zIndex: -1,
}));

export const searchBarProps = {
  imageRoute: `url("../src/assets/images/microemprendimientos/imagen_microemprendimientos.jpg")`,
  title: 'MICROEMPRENDIMIENTOS',
  subtitle: 'Invertí sostenible',
  text: 'Explorá las categorías y encontrá la inversión sostenible que mejor se ajuste a tus metas financieras',
};

const VisitorMicroentrepreneurship = () => {
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState({});

  const assignCategoryImages = (categoriesData) => {
    const categoriesWithImages = categoriesData?.map((category) => {
      let image;
      const defaultImage = 'no image assigned';

      switch (true) {
        case category.name.includes('Economía'):
          image = socialEconomyIcon;
          break;
        case category.name.includes('Agroecología'):
          image = agroecologyIcon;
          break;
        case category.name.includes('Conservación'):
          image = conservationIcon;
          break;
        case category.name.includes('Empresas'):
          image = circularEconomyIcon;
          break;
        default:
          image = defaultImage;
          break;
      }

      return {
        id: category.id,
        name: category.name,
        image,
      };
    });

    return categoriesWithImages;
  };

  const {
    data: categories,
    loading,
    error,
  } = useFetch({
    queryFn: async (abortController) =>
      await instance.get('/category/all', { signal: abortController.signal }),
  });

  const filteredCategories = categories?.data.filter((category) => category.name.length > 5);

  const categoriesWithImages = assignCategoryImages(filteredCategories);

  return (
    <>
      <SearchBarContainer
        imageRoute={searchBarProps.imageRoute}
        title={searchBarProps.title}
        subtitle={searchBarProps.subtitle}
        text={searchBarProps.text}
      />
      <StyledContainer sx={{ py: '2.5rem' }}>
        <Background />
        <CircleCut />
        <Box
          sx={{
            height: '24px',
            justifyContent: 'center',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
          }}
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
            Categorías
          </Typography>
        </Box>
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
          categoriesWithImages?.map((category) => (
            <Link
              to={`${encodeURIComponent(category.name)}`}
              state={{ categoryId: category.id, categoryName: category.name }}
              key={category.id}
              style={{ textDecoration: 'none', cursor: 'pointer' }}
            >
              <CategoryCard
                icon={category.image}
                category={category.name}
                isSelected={selectedCategories[category.name]}
                id={category.id}
              />
            </Link>
          ))
        )}
        {error && (
          <NoticeCard
            isOpen={true}
            success={false}
            mainMessage={
              'Estamos experimentando problemas para mostrar las categorías, inténtalo más tarde'
            }
            handleClose={() => {
              navigate('/');
            }}
            cancelFunction={() => {
              navigate('/');
            }}
            secondaryMessage={error}
          />
        )}
      </StyledContainer>
    </>
  );
};

export default VisitorMicroentrepreneurship;
