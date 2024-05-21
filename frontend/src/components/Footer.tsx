import { Container, Box, Typography, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <Container component="footer" sx={{ py: 2, mt: 8 }}>
      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <img
          src="https://hangouthabit.sirv.com/polling_app/images/logo.png"
          alt="Pollify Enterprise Logo"
          style={{ height: '50px' }} // Adjust the logo size here
        />
      </Box>
      <Typography variant="body1" gutterBottom align="center">
        Helping companies understand their employees better and create an
        engaging workplace.
      </Typography>
      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <IconButton
          href="https://github.com/tristenwallace"
          target="_blank"
          aria-label="GitHub"
        >
          <GitHubIcon />
        </IconButton>
        <IconButton
          href="https://www.linkedin.com/in/tristenwallace/"
          target="_blank"
          aria-label="LinkedIn"
        >
          <LinkedInIcon />
        </IconButton>
      </Box>
      <Typography
        variant="body2"
        color="textSecondary"
        align="center"
        sx={{ mt: 2 }}
      >
        &copy; 2024 designed by Tristen Wallace
      </Typography>
    </Container>
  );
};

export default Footer;
