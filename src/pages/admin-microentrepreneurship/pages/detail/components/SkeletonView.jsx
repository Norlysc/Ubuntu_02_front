import { Box, Container, Skeleton, Typography } from '@mui/material';

export default function SkeletonView() {
  return (
    <Container sx={{ py: '2.5rem' }}>
      <Typography variant='h1' align='center'>
        Microemprendimientos
      </Typography>
      <Box mt={'2.5rem'}>
        <Skeleton variant='text' width={150} height={35} sx={{ margin: 'auto' }} />
        <Skeleton variant='text' width={350} height={25} sx={{ margin: 'auto' }} />
        <Box display='flex' flexDirection='column' gap='1.5rem' my='1.5rem'>
          <Skeleton variant='rounded' width={'100%'} height={56} />
          <Skeleton variant='rounded' width={'100%'} height={56} />
          <Skeleton variant='rounded' width={'100%'} height={56} />
          <Skeleton variant='rounded' width={'100%'} height={56} />
          <Skeleton variant='rounded' width={'100%'} height={150} />
          <Skeleton variant='rounded' width={'100%'} height={150} />
        </Box>
        <Box display={'flex'} gap={'0.5rem'}>
          <Skeleton variant='rounded' height={80} sx={{ flex: ' 1 1 auto' }} />
          <Skeleton variant='rounded' height={80} sx={{ flex: ' 1 1 auto' }} />
          <Skeleton variant='rounded' height={80} sx={{ flex: ' 1 1 auto' }} />
        </Box>
      </Box>
    </Container>
  );
}
