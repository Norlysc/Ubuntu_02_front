import { Box, Typography, List, ListItem, ListItemText, useTheme } from '@mui/material';

export default function Goals() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        borderTop: '1px solid',
        borderBottom: '1px solid',
        borderColor: theme.palette.secondary.main, // Usando el color del tema
        paddingTop: '8px',
        gap: '8px',
      }}
    >
      <Typography
        variant='h2'
        component='h2'
        align='center'
        gutterBottom
        sx={{
          // Estilos específicos para el título "Objetivos de Ubuntu"
          color: '#093C59',
          marginTop: '1rem',
        }}
      >
        Objetivos de Ubuntu
      </Typography>
      <List
        sx={{
          ...theme.typography.body1,
          color: theme.palette.text.primary,
          pt: 0,
          listStyleType: 'disc',
          pl: 3,
        }}
      >
        <ListItem sx={{ paddingX: 0, display: 'list-item' }}>
          <ListItemText primary='Facilitar a productores o microemprendedores el acceso a microcréditos que les permitan desarrollar sus iniciativas empresariales.' />
        </ListItem>
        <ListItem sx={{ paddingX: 0, display: 'list-item' }}>
          <ListItemText primary='Proporcionar financiación a empresas y organizaciones que ejecutan proyectos con objetivos sociales, ambientales y culturales.' />
        </ListItem>
        <ListItem sx={{ paddingX: 0, display: 'list-item' }}>
          <ListItemText primary='Ofrecer a potenciales inversores la oportunidad de participar en proyectos con impacto significativo.' />
        </ListItem>
      </List>
    </Box>
  );
}
