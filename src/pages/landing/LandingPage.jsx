import { Container } from '@mui/material';
import Goals from '@/pages/landing/components/Goals';
import Posts from '@/pages/landing/components/Posts';
import SearchBarContainer from '@/components/searchbar/SearchBarContainer';
import Categories from '@/pages/landing/components/Categories';


function LandingPage() {
  const searchBarProps = {
    imageRoute: `url("../src/assets/images/landing/imagen_hero.png")`,
    title: 'FINANCIAMIENTO SOSTENIBLE',
    text: 'Impulsamos el desarrollo de finanzas de impacto, liderando la transición hacia un modelo financiero sostenible',
  };


  return (
    <>
      <SearchBarContainer
        imageRoute={searchBarProps.imageRoute}
        title={searchBarProps.title}
        text={searchBarProps.text}
      />
      <Container sx={{ py: '2.5rem' }}>
        <Goals />
        <Categories />
        <Posts />
      </Container>
    </>
  );
}

export default LandingPage;
