import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const RouteTitle = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      document.title = 'Home-HMS-University of Kelaniya';
    } else if (location.pathname === '/login') {
      document.title = 'Login-HMS-University of Kelaniya';
    } else if (location.pathname === '/useraccount') {
      document.title = 'UserAccount-HMS-University of Kelaniya';
    } else {
      document.title = 'HMS-University of Kelaniya'; // Default title
    }
  }, [location]);

  return null; 
};

export default RouteTitle;
