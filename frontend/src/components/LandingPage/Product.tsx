import { Container, Typography, Grid, Divider } from '@mui/material';
import { styled } from '@mui/system';

// Define custom styles using @emotion/styled
const Section = styled('section')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.primary.main,
  textAlign: 'center',
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    fontSize: '4rem', // Adjust font size for small screens
  },
}));

const Subheading = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(1),
}));

const Text = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const Image = styled('img')({
  width: '100%',
  borderRadius: '8px',
});

const Product = () => {
  return (
    <Section id="product">
      <Container maxWidth="md">
        <Title variant="h1">
          Gather Feedback <br />
          <span style={{ color: '#1a2e35' }}>Plan Events</span>
        </Title>
        <Divider sx={{ mb: 8 }} />
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Subheading variant="h3">
              Easily create polls to gather valuable feedback
            </Subheading>
            <Text variant="body1">
              Pollify helps companies build a strong community and create an
              environment employees love. Whether it's HR gathering feedback,
              team leads planning events, or managers understanding team
              sentiment, Pollify is here to help.
            </Text>
          </Grid>
          <Grid item xs={12} md={6}>
            <Image
              src="https://hangouthabit.sirv.com/polling_app/images/poll_creation.png"
              alt="Gather Feedback"
            />
          </Grid>
        </Grid>
        <Grid container spacing={4} direction="row-reverse" sx={{ mt: 4 }}>
          <Grid item xs={12} md={6}>
            <Subheading variant="h3">Foster a sense of community</Subheading>
            <Text variant="body1">
              By involving employees in the decision-making processes, you can
              create a sense of ownership and belonging among team members.
            </Text>
          </Grid>
          <Grid item xs={12} md={6}>
            <Image
              src="https://hangouthabit.sirv.com/polling_app/images/gather_feedback.png"
              alt="Foster Community"
            />
          </Grid>
        </Grid>
      </Container>
    </Section>
  );
};

export default Product;
