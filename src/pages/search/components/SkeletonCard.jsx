import { Box, Grid, Skeleton, Stack } from '@mui/material';

export default function SkeletonCard() {
  return (
    <Grid item xs={12} sm={6} lg={4}>
      <Box
        border={'1px solid #eeeeee'}
        sx={{
          p: '1rem 1rem 0.5rem',
          borderRadius: '1rem',
        }}
      >
        <Box mb='1.5rem'>
          <Skeleton variant='rounded' height={128} sx={{ borderRadius: '1rem' }} />
        </Box>
        <Stack alignItems='flex-start'>
          <Skeleton
            variant='text'
            sx={{ fontSize: '1.125rem', fontWeight: 600, lineHeight: '2rem' }}
            width={150}
          />
          <Skeleton
            variant='text'
            sx={{ fontSize: '0.875rem', fontWeight: 700, lineHeight: '1.5rem' }}
            width={200}
          />
          <Skeleton
            variant='text'
            sx={{ fontSize: '0.875rem', lineHeight: '1.5rem' }}
            width={'100%'}
          />
        </Stack>
        <Stack direction='row' spacing='0.25rem' alignItems='center' mt='1rem'>
          <Skeleton variant='circular' width={20} height={20} />
          <Skeleton
            variant='text'
            sx={{ fontSize: '0.875rem', lineHeight: '1.25rem' }}
            width={'80%'}
          />
        </Stack>
        <Box mt='1rem' justifyContent='center' display='flex'>
          <Skeleton variant='rounded' width={30} />
        </Box>
      </Box>
    </Grid>
  );
}
