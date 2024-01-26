import { Card, Typography, Box, useTheme } from '@mui/material';
import CategoryDetails from '@/pages/microemprendimientos/components/categories/CategoryDetails';
import { CategoryRounded } from '@mui/icons-material';

const CategoryCard = ({ icon, category, isSelected, id }) => {
  const { palette } = useTheme();

  const categoryDescription =
    'Conectate con Microemprendimientos que respetan la tierra y priorizan la salud, a través de prácticas agrícolas limpias y alimentos nutritivos.';

  const iconHandler = (image) => {
    if (image === 'no image assigned') {
      return <CategoryRounded />;
    } else {
      return (
        <img
          src={image}
          alt='Icono de la categoría'
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '50%',
          }}
        />
      );
    }
  };

  return (
    <>
      <Box>
        {!isSelected && (
          <Card
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px',
              marginBottom: '12px',
              borderRadius: '16px',
              height: '72px',
              paddingLeft: '20px',
              gap: '6px',
              flexShrink: '0',
            }}
          >
            <Box
              sx={{
                marginRight: '12px',
                flex: '0 0 auto',
                borderRadius: '50%',
                overflow: 'hidden',
                width: '40px',
                height: '40px',
                border: `2px solid ${palette.success.main}`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxSizing: 'border-box',
                padding: '4px',
              }}
            >
              {iconHandler(icon)}
            </Box>
            <Typography variant='body1' color={palette.primary.main}>
              {category}
            </Typography>
          </Card>
        )}
        {isSelected && (
          <CategoryDetails category={category} description={categoryDescription} categoryId={id} />
        )}
      </Box>
    </>
  );
};
export default CategoryCard;
