import useFetch from '@/hooks/useFetch';
import CategoriesCard from '@/pages/dashboard/components/CategoriesCard';
import { Box, Divider, Skeleton, Typography, useTheme } from '@mui/material';

export default function CategoryWrapper({ method }) {
  const { palette } = useTheme();
  const jwt = localStorage.getItem('token');
  const { data, loading } = useFetch({
    queryFn: ({ abortController }) => method({ abortController, jwt }),
  });

  if (loading === true) {
    return (
      <Skeleton sx={{ height: '259px', borderRadius: '0.5rem', mt: '2rem', transform: 'none' }} />
    );
  }
  return (
    <Box bgcolor='lightGray.main' mt='2rem' borderRadius={'0.5rem'}>
      <Box padding={'1rem'}>
        <Typography
          textAlign={'center'}
          variant='h2'
          color={palette.primary.main}
          sx={{ fontSize: '1.25rem' }}
        >
          Microemprendimientos por categoría
        </Typography>
      </Box>
      <Divider sx={{ backgroundColor: 'success.main', height: '2px' }} />
      <Box padding={' 1rem 1.25rem'}>
        {data?.map((value, index) => (
          <CategoriesCard text={value[0]} value={value[1]} key={index} />
        ))}
      </Box>
    </Box>
  );
}
