import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const useAuth = () => {
  const { isAuthenticated, user, getAccessTokenSilently, isLoading } = useAuth0();
  const [userId, setUserId] = useState(null); // State to store the userId


  useEffect(() => {
    const sendUserDataToBackend = async (userData) => {
      try {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch('https://b658votv24.execute-api.us-east-1.amazonaws.com/Prod/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(userData),
        });
        const responseData = await response.json(); // Parse response data
        console.log("Response Data: ", responseData)
        console.log("Access Token: ", accessToken)
        if (!response.ok) {
          if (response.status === 400 && responseData.id) {
            // If user already exists, set userId with existing ID
            console.log('User already exists with ID:', responseData.id);
            setUserId(responseData.id);
          } else {
            throw new Error('Failed to create user');
          }
        } else {
          console.log('User successfully added with ID:', responseData.id);
          setUserId(responseData.id); // Set userId in state
        }
      } catch (error) {
        console.error('Error sending user data to backend:', error);
      }
    };

    if (isAuthenticated && user) {
      sendUserDataToBackend(user);
    }
  }, [isAuthenticated, user, getAccessTokenSilently]);

  return { isAuthenticated, user, isLoading, userId };
};

export default useAuth;



