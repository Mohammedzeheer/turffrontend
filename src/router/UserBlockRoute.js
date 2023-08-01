import React, { useEffect, useState } from 'react';
import { Route, useNavigate } from 'react-router-dom';
import { AxiosUser } from '../api/AxiosInstance';
import { toast } from 'react-toastify';

const UserBlockedRoute = ({ path, element }) => {
  const navigate = useNavigate();
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    const checkUserBlock = async () => {
      try {
        const response = await AxiosUser.get('/checkUserBlock'); // Replace with the correct API endpoint to check user block status
        const data = response.data;
        if (data.isBlocked) {
          setIsBlocked(true);
        }
      } catch (error) {
        // Handle errors as needed
      }
    };

    checkUserBlock();
  }, []);

  if (isBlocked) {
    return <div>User is blocked. Please contact support.</div>;
  }

  // If not blocked, return the provided element
  return <Route path={path} element={element} />;
};

export default UserBlockedRoute;
