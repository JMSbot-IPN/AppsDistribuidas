import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ApiComponent = ({ API_KEY }) => {
  const [authStatus, setAuthStatus] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/recurso_protegido', {
          headers: {
            'API-Key': API_KEY
          }
        });

        if (response.data.Auth === 'Success') {
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