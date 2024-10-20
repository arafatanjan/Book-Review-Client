'use client';

import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { getUserInfo, removeUser } from '@/services/auth.services';
import { useRouter } from 'next/navigation';

const AuthButton = () => {
  const userInfo = getUserInfo();
  const router = useRouter();
  
  const handleLogOut = () => {
    removeUser();
    router.push('/'); 
    router.refresh();
  };

  return (
    <Box sx={{ display: { xs: 'none', md: 'block' } }}>
      {userInfo?.id ? (
        <>
          <Button component="a" href="/dashboard" color="inherit">
            Dashboard
          </Button>
          <Button color="error" onClick={handleLogOut} sx={{ ml: 2 }}>
            Logout
          </Button>
        </>
      ) : (
        <>
          <Button component="a" href="/login" color="inherit">
            Login
          </Button>
          <Button component="a" href="/register" color="inherit">
            Register
          </Button>
        </>
      )}
    </Box>
  );
};

export default AuthButton;
