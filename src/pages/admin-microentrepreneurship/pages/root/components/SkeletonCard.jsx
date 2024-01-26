import { Box, Grid, Skeleton } from '@mui/material';

export default function SkeletonCard() {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Box padding='1rem 1.75rem' bgcolor='lightGray.main' borderRadius='1rem'>
        <Box display='flex' justifyContent='space-between' mb='0.5rem'>
          <Skeleton
            variant='text'
            width={100}
            sx={{ fontSize: '1.125rem', lineHeight: '1.5rem' }}
          />
          <Box p='0 0.9rem'>
            <Skeleton variant='rounded' width={'0.5rem'} height={'1.3rem'} />
          </Box>
        </Box>
        <Skeleton height={3} width={'70%'} sx={{ mt: '0.9rem' }} />
        <Box display='flex' flexDirection='row' alignItems='center' justifyContent='space-between'>
          <Box display='flex' flexDirection='column' mt='1rem'>
            <Skeleton
              variant='text'
              width={250}
              sx={{ fontSize: '1.125rem', lineHeight: '1.5rem' }}
            />
            <Skeleton
              variant='text'
              width={150}
              sx={{ fontSize: '1.125rem', lineHeight: '1.5rem' }}
            />
          </Box>
          <Box p='0 1rem'>
            <Skeleton variant='rounded' width={'0.5rem'} height={'1.3rem'} />
          </Box>
        </Box>
      </Box>
    </Grid>
  );
}
