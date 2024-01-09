import React, { useEffect, useState } from 'react';
import axios from 'axios';

var apikey = '';
const ApiComponent = ({ API_KEY }) => {
  const [authStatus, setAuthStatus] = useState('');
  apikey = API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/redirect_APIkey?Key=${apikey}`, {
        });

        if (response.data === 'Success') {
          setAuthStatus('Success');
        } else {
          setAuthStatus('Fail');
        }
      } catch (error) {
        console.error(error);
        setAuthStatus('Fail');
      }
    };

    fetchData();
  }, [API_KEY]);

  return (
    <div>
      <h1>Estado de la Autenticación: {authStatus}</h1>
    </div>
  );
};

export default ApiComponent;