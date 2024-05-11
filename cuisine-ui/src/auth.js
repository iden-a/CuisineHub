import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const useAuth = () => {
  const { isAuthenticated, user, getAccessTokenSilently, isLoading } = useAuth0();

  useEffect(() => {
    const sendUserDataToBackend = async (userData) => {
      try {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch('/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(userData),
        });
        if (!response.ok) {
          throw new Error('Failed to create user');
        }
        console.log('User successfully added')
      } catch (error) {
        console.error('Error sending user data to backend:', error);
      }
    };

    if (isAuthenticated && user) {
      sendUserDataToBackend(user);
    }
  }, [isAuthenticated, user, getAccessTokenSilently]);

  return { isAuthenticated, user, isLoading };
};

export default useAuth;


