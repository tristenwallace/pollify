import { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

interface TabChangeEvent {
  event: React.ChangeEvent<{}>; // Generic React Event Type, adjust as needed
  newValue: number; // Assuming newValue is an index number for tabs
}

const LoginSignup = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = ({ event, newValue }: TabChangeEvent) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={tabIndex}
        onChange={(event, newValue) => handleTabChange({ event, newValue })}
        centered
      >
        <Tab label="Login" />
        <Tab label="Signup" />
      </Tabs>
      {tabIndex === 0 && <LoginForm />}
      {tabIndex === 1 && <SignupForm />}
    </Box>
  );
};

export default LoginSignup;
