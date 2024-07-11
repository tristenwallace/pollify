import { Container, Box } from '@mui/material';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scroller } from 'react-scroll';
import Features from './Features';
import MainHero from './MainHero';
import MainHeroImage from './MainHeroImage';
import Pricing from './Pricing';
import Product from './Product';
import Roadmap from './Roadmap';
import Canvas from '../Wave/Canvas';

const LandingPage: React.FC = () => {
  const location = useLocation();

  // Scroll to the section specified in the location state, if any
  useEffect(() => {
    if (location.state?.targetSection) {
      scroller.scrollTo(location.state.targetSection, {
        duration: 1000,
        delay: 0,
        smooth: 'easeInOutQuart',
      });
    }
  }, [location.state]);

  return (
    <Container disableGutters maxWidth={false}>
      <MainHero />
      <Box position="relative">
        <Canvas />
        <MainHeroImage />
      </Box>
      <Box py={8}>
        <Product />
      </Box>
      <Box py={8} bgcolor="background.paper">
        <Features />
      </Box>
      <Box py={8}>
        <Roadmap />
      </Box>
      <Box py={8}>
        <Pricing />
      </Box>
    </Container>
  );
};

export default LandingPage;
