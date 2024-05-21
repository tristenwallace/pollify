import { Box } from '@mui/material';

const MainHeroImage = () => {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <img
        src="https://hangouthabit.sirv.com/polling_app/images/happyTeam.jpg"
        alt="Happy team"
        style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }}
      />
    </Box>
  );
};

export default MainHeroImage;
