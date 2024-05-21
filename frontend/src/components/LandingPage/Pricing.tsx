import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Pricing = () => {
  return (
    <Container id="pricing">
      <Typography variant="h4" component="h2" gutterBottom align="center">
        Pricing
      </Typography>
      <Typography variant="body1" gutterBottom align="center">
        Pollify is currently in beta and available for testing. Early users will
        be offered steep discount access when the full application goes live.
      </Typography>
      <Grid container spacing={4} sx={{ mt: 4 }} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Free Beta Access
              </Typography>
              <Typography variant="h6" color="text.secondary">
                $0/month
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Available for testing during beta period
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                Unlimited Users <br />
                Basic Support <br />1 GB Storage
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                variant="contained"
                color="primary"
                component={RouterLink}
                to="/signup"
              >
                Sign Up
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Pricing;
