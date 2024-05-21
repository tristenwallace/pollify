import { Container, Typography, Grid, Box } from '@mui/material';
import FeedbackIcon from '@mui/icons-material/Feedback';
import EventIcon from '@mui/icons-material/Event';
import GroupIcon from '@mui/icons-material/Group';

const Features = () => {
  return (
    <Container id="features">
      <Typography variant="h4" component="h2" gutterBottom align="center">
        Why Choose Pollify?
      </Typography>
      <Typography variant="body1" gutterBottom align="center">
        Pollify is designed to help companies understand their employees better
        and create an engaging workplace.
      </Typography>
      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} md={4}>
          <Box textAlign="center">
            <FeedbackIcon sx={{ fontSize: 40, color: 'primary.main' }} />
            <Typography variant="h6" component="h3" sx={{ mt: 2 }}>
              Gather Feedback
            </Typography>
            <Typography variant="body1">
              Easily create polls to gather valuable feedback from employees on
              various topics.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box textAlign="center">
            <EventIcon sx={{ fontSize: 40, color: 'primary.main' }} />
            <Typography variant="h6" component="h3" sx={{ mt: 2 }}>
              Plan Events
            </Typography>
            <Typography variant="body1">
              Organize team retreats and events based on what your employees
              actually want.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box textAlign="center">
            <GroupIcon sx={{ fontSize: 40, color: 'primary.main' }} />
            <Typography variant="h6" component="h3" sx={{ mt: 2 }}>
              Build Community
            </Typography>
            <Typography variant="body1">
              Foster a sense of community by engaging employees in
              decision-making processes.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Features;
