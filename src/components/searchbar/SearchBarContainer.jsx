import SearchBar from '@/components/searchbar/SearchBar';
import { Box, Container, Typography } from '@mui/material';
import { useTheme } from '@mui/system';

export default function SearchBarContainer({ imageRoute, title, subtitle, text }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'relative',
        height: '600px',
        minHeight: '600px',
        backgroundImage: imageRoute,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      {!imageRoute.includes('imagen_hero.png') && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          }}
        />
      )}
      <Container sx={{ py: '1.5rem', position: 'relative', zIndex: 1 }}>
        <SearchBar />
        <Typography
          variant='h3'
          component='h2'
          color={theme.palette.text.primary}
          sx={{
            color: '#FDFDFE',
            padding: '2.5rem 0 0.5rem 0',
          }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            width: '65%',
            minWidth: '235px',
            float: 'left',
            clear: 'both',
          }}
        >
          {subtitle && (
            <Typography
              variant='h4'
              color={theme.palette.text.primary}
              sx={{
                color: '#FDFDFE',
                paddingBottom: '0.5rem',
              }}
            >
              {subtitle}
            </Typography>
          )}
          <Typography
            variant='h1'
            sx={{
              color: '#FDFDFE',
            }}
          >
            {text}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
