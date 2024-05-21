import { Box } from '@mui/material';

const MainHeroImage = () => {
  return (
    <Box sx={{ textAlign: 'center', mt: 5 }}>
      <img
        src="https://hangouthabit.sirv.com/polling_app/images/happyTeam.jpeg"
        alt="Happy team"
        style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }}
      />
    </Box>
  );
};

export default MainHeroImage;
