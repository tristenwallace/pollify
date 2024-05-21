import { Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { styled } from '@mui/system';

const PhaseTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.primary.main,
  textAlign: 'center',
  marginBottom: theme.spacing(2),
}));

const PhaseDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textAlign: 'center',
  marginBottom: theme.spacing(3),
}));

const FeatureList = styled('ul')(({ theme }) => ({
  listStyleType: 'none',
  paddingLeft: 0,
  color: theme.palette.text.primary,
}));

const Roadmap = () => {
  return (
    <Container id="roadmap">
      <Typography variant="h4" component="h2" gutterBottom align="center">
        Pollify Roadmap
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Empowering HR managers to build happier, more effective teams.
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {/* Phase 1 */}
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={3}>
            <CardContent>
              <PhaseTitle variant="h5">Phase 1: Core Features</PhaseTitle>
              <PhaseDescription variant="body2">
                Get started with the basics
              </PhaseDescription>
              <FeatureList>
                <li>✅ User Authentication & Profile Management</li>
                <li>✅ Poll Creation and Management</li>
                <li>✅ Real-Time Poll Participation</li>
                <li>✅ Basic Dashboard & Analytics</li>
              </FeatureList>
            </CardContent>
          </Card>
        </Grid>
        {/* Phase 2 */}
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={3}>
            <CardContent>
              <PhaseTitle variant="h5">
                Phase 2: Advanced Analytics & AI
              </PhaseTitle>
              <PhaseDescription variant="body2">
                Dive deeper with AI and analytics
              </PhaseDescription>
              <FeatureList>
                <li>✅ Enhanced Analytics</li>
                <li>✅ AI-Powered Employee Profiles</li>
                <li>✅ Predictive Insights for Employee Churn</li>
                <li>✅ Personalized Feedback & Recognition</li>
              </FeatureList>
            </CardContent>
          </Card>
        </Grid>
        {/* Phase 3 */}
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={3}>
            <CardContent>
              <PhaseTitle variant="h5">
                Phase 3: Expansion & Scalability
              </PhaseTitle>
              <PhaseDescription variant="body2">
                Scale and customize
              </PhaseDescription>
              <FeatureList>
                <li>✅ Mobile Application</li>
                <li>✅ White-Label Branding & API Access</li>
                <li>✅ Enhanced Security & Compliance</li>
                <li>✅ Cloud-Native Architecture</li>
              </FeatureList>
            </CardContent>
          </Card>
        </Grid>
        {/* Phase 4 */}
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={3}>
            <CardContent>
              <PhaseTitle variant="h5">
                Phase 4: Continuous Improvement
              </PhaseTitle>
              <PhaseDescription variant="body2">
                Stay ahead of the curve
              </PhaseDescription>
              <FeatureList>
                <li>✅ Regular Updates & New Features</li>
                <li>✅ Community Building & Support</li>
                <li>✅ Advanced AI Models & Innovation</li>
                <li>✅ 24/7 Customer Support</li>
              </FeatureList>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Roadmap;
