import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const MainHero = () => {
  return (
    <Box sx={{ pt: 17, textAlign: 'center' }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to Pollify
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        Empower your team with the insights they need!
      </Typography>
      <Typography
        variant="body1"
        sx={{ mt: 3, mb: 5, maxWidth: '600px', mx: 'auto' }}
      >
        Pollify helps companies build a strong community and create an
        environment employees love. Whether it's HR gathering feedback, team
        leads planning events, or managers understanding team sentiment, Pollify
        is here to help.
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          component={RouterLink}
          to="/signup"
        >
          Get Started
        </Button>
        <Button
          variant="outlined"
          color="primary"
          component={RouterLink}
          to="/login"
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default MainHero;
