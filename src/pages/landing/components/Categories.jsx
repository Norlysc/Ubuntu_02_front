import socialEconomyIcon from '@/assets/images/social-economy.png';
import agroecologyIcon from '@/assets/images/agroecology.png';
import conservationIcon from '@/assets/images/conservation.png';
import circularEconomyIcon from '@/assets/images/circular-economy.png';
import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
  CircularProgress,
} from '@mui/material';

import CategoryCard from '@/pages/microemprendimientos/components/categories/CategoryCard';
import useFetch from '@/hooks/useFetch';
import instance from '@/helpers/axiosConfig';
import { Link } from 'react-router-dom';

const limitCategories = 4;

export default function Categories() {
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

  const limitedCategories = categoriesWithImages?.slice(0, limitCategories);

  return (
    <Grid container component='section' mt='2rem'>
      <Grid item xs={12}>
        <Box textAlign='center'>
          <Typography variant='h2' component='span' sx={{ fontSize: '1rem' }}>
            Microemprendimientos Ubuntu
          </Typography>
          <Typography variant='h2' component='h2'>
            Categorías
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
            limitedCategories?.map((category) => (
              <CategoryCard
                icon={category.image}
                category={category.name}
                id={category.id}
                key={category.id}
              />
            ))
          )}
          <Box mt='1rem'>
            <Link to='/microemprendimientos' style={{ textDecoration: 'none', cursor: 'pointer' }}>
              <Button
                variant='contained'
                sx={{
                  lineHeight: '1.25rem',
                  padding: '0.625rem 1.89rem',
                  textTransform: 'none',
                }}
                disableElevation
              >
                Ver más categorías
              </Button>
            </Link>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
